"use server";
import he from "he";
import { revalidateTag } from "next/cache";

// Utility: Validate environment variables once during initialization
const validateEnv = () => {
    const requiredEnv = ["WP_USERNAME", "WP_APP_PASSWORD", "API_BASE_URL"];
    const missingVars = requiredEnv.filter((envVar) => !process.env[envVar]);

    if (missingVars.length) {
        throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`);
    }
};

validateEnv();

// Utility: Fetch wrapper
const fetchWrapper = async (url, { headers = {}, auth = false, ...options } = {}) => {
    const baseHeaders = { "Content-Type": "application/json" };

    if (auth) {
        const credentials = `${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`;
        const encodedCredentials = Buffer.from(credentials).toString("base64");
        headers["Authorization"] = `Basic ${encodedCredentials}`;
    }

    const response = await fetch(url, {
        headers: { ...baseHeaders, ...headers },
        ...options,
    });

    if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(
            `Error fetching ${url}. Status: ${response.status}. Details: ${errorDetails}`
        );
    }

    return response.json();
};

// Utility: Fetch with caching tags
const fetchWithCache = async (endpoint, tag, auth = false, options = {}) => {
    const url = `${process.env.API_BASE_URL}${endpoint}`;
    return fetchWrapper(url, { ...options, auth, next: { tags: [tag] } });
};

// Fetch site data
export const fetchSiteData = async () => {
    try {
        const data = await fetchWithCache("/settings", "siteData", true);

        return {
            title: he.decode(data?.title || process.env.NEXT_PUBLIC_APP_NAME),
            description: data?.description || "",
            site_logo: data?.site_logo ? await fetchImageUrl(data.site_logo) : "/assets/author.jpg",
            site_icon: data?.site_icon ? await fetchImageUrl(data.site_icon) : "/assets/author.jpg",
        };
    } catch (err) {
        console.error("Error fetching site data:", err);

        return {
            title: process.env.NEXT_PUBLIC_APP_NAME,
            description: "",
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
export const fetchPosts = async (page = 1, perPage = 10) => {
    try {
        return await fetchWithCache(`/posts?page=${page}&per_page=${perPage}`, "posts", false);
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
        const params = `author_name=${data.author_name}&author_email=${data.author_email}&content=${data.content}&post=${data.post}`;
        const comment = await fetchWithCache(`/comments?${params}`, 'comments', true, {
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