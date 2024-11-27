import he from 'he';

export const fetchSiteData = async () => {
    try {
        // Ensure environment variables are defined
        if (!process.env.WP_USERNAME || !process.env.WP_APP_PASSWORD || !process.env.API_BASE_URL) {
            throw new Error("Environment variables are not set correctly.");
        }

        const credentials = `${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`;
        const encodedCredentials = Buffer.from(credentials).toString("base64");

        const res = await fetch(`${process.env.API_BASE_URL}/settings`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${encodedCredentials}`,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch site data. Status: ${res.status}`);
        }

        const data = await res.json();

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

export const fetchImageUrl = async (id) => {
    try {
        if (!id) {
            throw new Error("Image ID is not provided.");
        }

        const res = await fetch(`${process.env.API_BASE_URL}/media/${id}`, {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`).toString("base64")}`,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch image. Status: ${res.status}`);
        }

        const media = await res.json();
        return media?.source_url || "/assets/default.png";
    } catch (err) {
        console.error("Error fetching image URL:", err);
        return "/assets/default.png";
    }
};

export const fetchPosts = async () => {
    try {
        const res = await fetch(`${process.env.API_BASE_URL}/posts`);
        if (res.ok) {
            const posts = await res.json();
            return posts;
        }
    } catch (err) {
        console.error("Error fetching posts:", err);
    }

    return [];
}

export const fetchCategories = async () => {
    try {
        const res = await fetch(`${process.env.API_BASE_URL}/categories`);
        if (res.ok) {
            const categories = await res.json();
            return categories;
        }
    } catch (err) {
        console.error("Error fetching categories:", err);
    }

    return [];
}

export const fetchPost = async (slug) => {
    try {
        const res = await fetch(`${process.env.API_BASE_URL}/posts?slug=${slug}`);
        if (res.ok) {
            const post = await res.json();
            return post[0];
        }
    } catch (err) {
        console.error("Error fetching post:", err);
    }

    return null;
};

export const fetchAuthor = async (id) => {
    try {
        const res = await fetch(`${process.env.API_BASE_URL}/users/${id}`);
        if (res.ok) {
            const authorData = await res.json();
            return {
                name: authorData.name,
                avatar: authorData.avatar_urls[96],
            };
        }
    } catch (err) {
        console.error("Error fetching author details:", err);
    }

    return {
        name: process.env.NEXT_PUBLIC_AUTHOR_NAME,
        avatar: "/assets/dummy.webp",
    }
};

export const fetchCategory = async (slug) => {
    try {
        const res = await fetch(`${process.env.API_BASE_URL}/categories?slug=${slug}`);
        if (res.ok) {
            const category = await res.json();
            return category[0];
        }
    } catch (err) {
        console.error("Error fetching category:", err);
    }
};

export const fetchCategoryPosts = async (id) => {
    try {
        const res = await fetch(`${process.env.API_BASE_URL}/posts?categories=${id}`);
        if (res.ok) {
            const posts = await res.json();
            return posts;
        }
    } catch (err) {
        console.error("Error fetching category posts:", err);
    }
};

export const fetchPostComments = async (id) => {
    try {
        const res = await fetch(`${process.env.API_BASE_URL}/comments?post=${id}`);
        if (res.ok) {
            const comments = await res.json();
            return comments;
        }
    } catch (err) {
        console.error("Error fetching post comments:", err);
    }
};

export const createComment = async (data) => {
    try {
        // Ensure environment variables are defined
        if (!process.env.WP_USERNAME || !process.env.WP_APP_PASSWORD || !process.env.API_BASE_URL) {
            throw new Error("Environment variables are not set correctly.");
        }

        const credentials = `${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`;
        const encodedCredentials = Buffer.from(credentials).toString("base64");

        const res = await fetch(`${process.env.API_BASE_URL}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${encodedCredentials}`,
            },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            const comment = await res.json();
            console.log("Comment created:", comment);

            return comment;
        } else {
            const error = await res.json();
            console.error("Failed to create comment:", error);
        }
    } catch (err) {
        console.error("Error creating comment:", err);
    }
};