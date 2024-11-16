import React from 'react'
import he from 'he'

const page = async ({ params }) => {
    const slug = params.slug;
    let imageUrl = "/assets/default.png";
    let authorName = process.env.NEXT_PUBLIC_AUTHOR_NAME;
    let authorAvatar = "/assets/dummy.webp";

    const dateFormatter = (date = new Date()) => {
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(date);
    }

    let formattedDate = dateFormatter();

    const fetchPost = async () => {
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

    const fetchAuthorDetails = async (author) => {
        try {
            const res = await fetch(`${process.env.API_BASE_URL}/users/${author}`);
            if (res.ok) {
                const authorData = await res.json();
                return {
                    name: authorData.name,
                    avatar: authorData.avatar_urls[24],
                };
            }
        } catch (err) {
            console.error("Error fetching author details:", err);
        }

        return {
            name: process.env.NEXT_PUBLIC_AUTHOR_NAME,
            avatar: "/assets/default.png",
        }
    };

    async function fetchImageUrl(imgId) {
        try {
            const res = await fetch(`${process.env.API_BASE_URL}/media/${imgId}`);
            if (res.ok) {
                const media = await res.json();
                return media.source_url || "/assets/default.png";
            }
        } catch (err) {
            console.error("Error fetching image URL:", err);
        }

        return "/assets/default.png";
    }

    const post = await fetchPost();
    if (post) {
        imageUrl = await fetchImageUrl(post.featured_media || "/assets/default.png");
        const author = post.author;
        const authorData = await fetchAuthorDetails(author);
        authorName = authorData.name;
        authorAvatar = authorData.avatar;
        formattedDate = dateFormatter(new Date(post.date));
    }

    return (
        <section className='container mx-auto max-w-4xl my-10 px-4 lg:px-0'>
            <div className=''>
                <h1 className='text-3xl md:text-5xl font-semibold my-6'>{he.decode(post.title.rendered)}</h1>
                <div className="my-8 flex items-center gap-3">
                    <span className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden">
                        <img src={authorAvatar} alt="#" className="w-full object-cover" />
                    </span>
                    <span>
                        <span className='block'>{authorName}</span>
                        <span>{formattedDate}</span>
                    </span>
                </div>
                <div className="flex items-center gap-8 border-t border-b py-3 mb-8">
                    <div className="text-sm flex items-center gap-1">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#000000"} fill={"none"}>
                                <path d="M2 12.5C2 11.3954 2.89543 10.5 4 10.5C5.65685 10.5 7 11.8431 7 13.5V17.5C7 19.1569 5.65685 20.5 4 20.5C2.89543 20.5 2 19.6046 2 18.5V12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15.4787 7.80626L15.2124 8.66634C14.9942 9.37111 14.8851 9.72349 14.969 10.0018C15.0369 10.2269 15.1859 10.421 15.389 10.5487C15.64 10.7065 16.0197 10.7065 16.7791 10.7065H17.1831C19.7532 10.7065 21.0382 10.7065 21.6452 11.4673C21.7145 11.5542 21.7762 11.6467 21.8296 11.7437C22.2965 12.5921 21.7657 13.7351 20.704 16.0211C19.7297 18.1189 19.2425 19.1678 18.338 19.7852C18.2505 19.8449 18.1605 19.9013 18.0683 19.9541C17.116 20.5 15.9362 20.5 13.5764 20.5H13.0646C10.2057 20.5 8.77628 20.5 7.88814 19.6395C7 18.7789 7 17.3939 7 14.6239V13.6503C7 12.1946 7 11.4668 7.25834 10.8006C7.51668 10.1344 8.01135 9.58664 9.00069 8.49112L13.0921 3.96056C13.1947 3.84694 13.246 3.79012 13.2913 3.75075C13.7135 3.38328 14.3652 3.42464 14.7344 3.84235C14.774 3.8871 14.8172 3.94991 14.9036 4.07554C15.0388 4.27205 15.1064 4.37031 15.1654 4.46765C15.6928 5.33913 15.8524 6.37436 15.6108 7.35715C15.5838 7.46692 15.5488 7.5801 15.4787 7.80626Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span className="text-sm font-semibold">0</span>
                    </div>
                    <div className="text-sm flex items-center gap-1">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#000000"} fill={"none"}>
                                <path d="M22 11.5667C22 16.8499 17.5222 21.1334 12 21.1334C11.3507 21.1343 10.7032 21.0742 10.0654 20.9545C9.60633 20.8682 9.37678 20.8251 9.21653 20.8496C9.05627 20.8741 8.82918 20.9948 8.37499 21.2364C7.09014 21.9197 5.59195 22.161 4.15111 21.893C4.69874 21.2194 5.07275 20.4112 5.23778 19.5448C5.33778 19.0148 5.09 18.5 4.71889 18.1231C3.03333 16.4115 2 14.1051 2 11.5667C2 6.28357 6.47778 2 12 2C17.5222 2 22 6.28357 22 11.5667Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M11.9955 12H12.0045M15.991 12H16M8 12H8.00897" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span className="text-sm font-semibold">0</span>
                    </div>
                    <div className="text-sm flex items-center gap-1">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#000000"} fill={"none"}>
                                <path d="M18 7C18.7745 7.16058 19.3588 7.42859 19.8284 7.87589C21 8.99181 21 10.7879 21 14.38C21 17.9721 21 19.7681 19.8284 20.8841C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8841C3 19.7681 3 17.9721 3 14.38C3 10.7879 3 8.99181 4.17157 7.87589C4.64118 7.42859 5.2255 7.16058 6 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M12.0253 2.00052L12 14M12.0253 2.00052C11.8627 1.99379 11.6991 2.05191 11.5533 2.17492C10.6469 2.94006 9 4.92886 9 4.92886M12.0253 2.00052C12.1711 2.00657 12.3162 2.06476 12.4468 2.17508C13.3531 2.94037 15 4.92886 15 4.92886" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span className="text-sm font-semibold">Share</span>
                    </div>
                </div>
                <img src={imageUrl} alt='#' className='rounded-lg mx-auto' />
            </div>

            <div className='mt-16'>
                <div className='md:text-lg text-justify post-content' dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
            </div>
        </section>
    )
}

export default page