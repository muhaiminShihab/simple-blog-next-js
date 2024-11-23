import React from 'react';
import CategoryCard from '@/app/components/CategoryCard';
import PostCard from '@/app/components/PostCard';

const Home = async () => {
    const fetchPosts = async () => {
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

    const fetchCategories = async () => {
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

    const posts = await fetchPosts();
    const categories = await fetchCategories();

    return (
        <section className='container mx-auto my-10 px-4 lg:px-0'>
            <div className='flex justify-between flex-col lg:flex-row gap-10'>
                <div className='lg:w-[75%] order-2 lg:order-1 mt-3 lg:mt-0'>
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
                <div className='lg:w-[25%] order-1 lg:order-2 border-l pl-6'>
                    <div>
                        <h3 className='text-xl font-semibold mb-2'>Categories</h3>

                        {
                            categories.map((category, index) => (
                                <CategoryCard key={index} name={category.name} slug={category.slug} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home