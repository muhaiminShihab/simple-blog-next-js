import CategoryCard from '@/app/components/CategoryCard';
import PostCard from '@/app/components/PostCard';
import React from 'react';

const page = async ({ params }) => {
    const slug = params.slug;
    
    const fetchCategory = async () => {
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

    const fetchCategoryPosts = async (id) => {
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

    const category = await fetchCategory();
    const posts = await fetchCategoryPosts(category.id);

    return (
        <section className='container mx-auto max-w-4xl my-10 px-4 lg:px-0'>
            <div className='flex justify-between flex-col lg:flex-row gap-10'>
                <div className=''>
                    {
                        posts.map((post, index) => (
                            <PostCard
                                key={index}
                                imgId={post.featured_media || "/assets/default.png"}
                                title={post.title.rendered}
                                url={"/post/" + post.slug}
                                content={post.excerpt.rendered}
                                date={post.date}
                                author={post.author}
                            />
                        ))
                    }

                    {/* <div className='w-full bg-gray-100 rounded-lg text-center py-16'>
                            <img src='/assets/404.svg' className='w-1/3 mx-auto' />
                            <h3 className='text-xl'>No Data Found. Stay Tuned.</h3>
                        </div> */}
                </div>
                <div className='mt-6 hidden'>
                    <div className='flex items-center justify-center text-center gap-4'>
                        <div className='bg-gray-100 hover:bg-blue-500 transition-all hover:text-white p-3 rounded-full cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                                <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>Page No 1</div>
                        <div className='bg-gray-100 hover:bg-blue-500 transition-all hover:text-white p-3 rounded-full cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                                <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page