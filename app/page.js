import React from 'react';
import CategoryCard from '@/app/components/CategoryCard';
import PostCard from '@/app/components/PostCard';
import { fetchCategories, fetchPosts } from '@/app/utils/wpApis';
import Pagination from './components/Pagination';

const Home = async () => {
    let posts = [];
    let categories = [];
    let page = 2;
    let perPage = 5;

    const fetchData = async () => {
        posts = await fetchPosts(page, perPage);
        categories = await fetchCategories();
    };

    await fetchData(page);

    const changePage = async (page) => {
        page = page >= 1 ? page : 1;
        await fetchData(page);
    };

    return (
        <section className='container mx-auto my-10 px-4 lg:px-0'>
            <div className='flex justify-between flex-col lg:flex-row gap-10'>
                <div className='lg:w-[75%] order-2 lg:order-1 mt-3 lg:mt-0'>
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
                    
                    <div className='mt-6'>
                        <Pagination page={page} />
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