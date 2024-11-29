"use server";
import he from "he";
import { revalidateTag } from "next/cache";

// Utility: Validate environment variables
const validateEnv = () => {
    const requiredEnv = ["WP_USERNAME", "WP_APP_PASSWORD", "API_BASE_URL"];
    requiredEnv.forEach((envVar) => {
        if (!process.env[envVar]) {
            throw new Error(`Environment variable ${envVar} is not set.`);
        }
    });
};

// Utility: Fetch wrapper
const fetchWithAuth = async (url, options = {}) => {
    validateEnv();

    const credentials = `${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`;
    const encodedCredentials = Buffer.from(credentials).toString("base64");

    const headers = {
        "Authorization": `Basic ${encodedCredentials}`,
        "Content-Type": "application/json",
        ...options.headers,
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Error fetching ${url}. Status: ${response.status}. Details: ${errorDetails}`);
    }

    return response.json();
};

// Utility: Fetch with caching tags
const fetchWithCache = async (endpoint, tag, options = {}) => {
    return fetchWithAuth(`${process.env.API_BASE_URL}${endpoint}`, {
        next: { tags: [tag] },
        ...options,
    });
};

// Fetch site data
export const fetchSiteData = async () => {
    try {
        const data = await fetchWithCache("/settings", "siteData");

        return {
            title: he.decode(data?.title || "Default Title"),
            description: data?.description || "Default Description",
            site_logo: data?.site_logo ? await fetchImageUrl(data.site_logo) : "/assets/author.jpg",
            site_icon: data?.site_icon ? await fetchImageUrl(data.site_icon) : "/assets/author.jpg",
        };
    } catch (err) {
        console.error("Error fetching site data:", err);
        return {
            title: "Default Title",
            description: "Default Description",
            site_logo: "/assets/author.jpg",
            site_icon: "/assets/author.jpg",
        };
    }
};

// Fetch image URL
export const fetchImageUrl = async (id) => {
    try {
        if (!id) throw new Error("Image ID is required.");
        const media = await fetchWithCache(`/media/${id}`, "media");
        return media?.source_url || "/assets/default.png";
    } catch (err) {
        console.error("Error fetching image URL:", err);
        return "/assets/default.png";
    }
};

// Fetch posts
export const fetchPosts = async () => {
    try {
        return await fetchWithCache("/posts", "posts");
    } catch (err) {
        console.error("Error fetching posts:", err);
        return [];
    }
};

// Fetch categories
export const fetchCategories = async () => {
    try {
        return await fetchWithCache("/categories", "categories");
    } catch (err) {
        console.error("Error fetching categories:", err);
        return [];
    }
};

// Fetch post by slug
export const fetchPost = async (slug) => {
    try {
        const posts = await fetchWithCache(`/posts?slug=${slug}`, "post");
        return posts[0] || null;
    } catch (err) {
        console.error("Error fetching post:", err);
        return null;
    }
};

// Fetch author details
export const fetchAuthor = async (id) => {
    try {
        const authorData = await fetchWithCache(`/users/${id}`, "author");
        return {
            name: authorData.name,
            avatar: authorData.avatar_urls[96],
        };
    } catch (err) {
        console.error("Error fetching author details:", err);
        return {
            name: process.env.NEXT_PUBLIC_AUTHOR_NAME || "Unknown Author",
            avatar: "/assets/dummy.webp",
        };
    }
};

// Fetch category by slug
export const fetchCategory = async (slug) => {
    try {
        const categories = await fetchWithCache(`/categories?slug=${slug}`, "category");
        return categories[0] || null;
    } catch (err) {
        console.error("Error fetching category:", err);
        return null;
    }
};

// Fetch posts by category
export const fetchCategoryPosts = async (id) => {
    try {
        return await fetchWithCache(`/posts?categories=${id}`, "categoryPosts");
    } catch (err) {
        console.error("Error fetching category posts:", err);
        return [];
    }
};

// Fetch comments for a post
export const fetchPostComments = async (id) => {
    try {
        return await fetchWithCache(`/comments?post=${id}`, "comments");
    } catch (err) {
        console.error("Error fetching post comments:", err);
        return [];
    }
};

// Create a new comment
export const createComment = async (data) => {
    try {
        const comment = await fetchWithAuth(`${process.env.API_BASE_URL}/comments`, {
            method: "POST",
            body: JSON.stringify(data),
        });

        revalidateTag("comments");
        return comment;
    } catch (err) {
        console.error("Error creating comment:", err);
        return null;
    }
};