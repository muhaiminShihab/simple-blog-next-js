import CategoryCard from '@/app/components/CategoryCard';
import PostCard from '@/app/components/PostCard';
import React from 'react';
import { fetchCategory, fetchCategoryPosts } from '@/app/utils/wpApis';

const page = async ({ params }) => {
    const slug = params.slug;
    let category = {};
    let posts = [];

    try {
        category = await fetchCategory(slug);

        if (category && category.id) {
            posts = await fetchCategoryPosts(category.id);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return (
        <section className='container mx-auto max-w-4xl my-10 px-4 lg:px-0'>
            <div className='flex justify-between flex-col lg:flex-row gap-10'>
                <div className=''>
                    {
                        posts.map((post, index) => (
                            <PostCard
                                key={index}
                                imgId={post.featured_media}
                                title={post.title.rendered}
                                slug={post.slug}
                                content={post.excerpt.rendered}
                                date={post.date}
                                author={post.author}
                                id={post.id}
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