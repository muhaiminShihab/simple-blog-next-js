import React from 'react';
import PostCardSkeleton from './components/PostCardSkeleton';
import CategoryCardSkeleton from './components/CategoryCardSkeleton';

const Home = async () => {
    return (
        <section className='container mx-auto my-10 px-4 lg:px-0'>
            <div className='flex justify-between flex-col lg:flex-row gap-10'>
                <div className='lg:w-[75%] order-2 lg:order-1 mt-3 lg:mt-0'>
                    <div className=''>
                        {
                            Array.from({ length: 5 }).map((_, index) => (
                                <PostCardSkeleton key={index} />
                            ))
                        }
                    </div>
                </div>
                <div className='lg:w-[25%] order-1 lg:order-2 border-l pl-6'>
                    <div>
                        <h3 className='text-xl font-semibold mb-2'>Categories</h3>

                        {
                            Array.from({ length: 5 }).map((_, index) => (
                                <CategoryCardSkeleton key={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home