import PostCardSkeleton from '@/app/components/PostCardSkeleton';
import React from 'react';

const page = async () => {
    return (
        <section className='container mx-auto max-w-4xl my-10 px-4 lg:px-0'>
            <div className='flex justify-between flex-col lg:flex-row gap-10'>
                <div className='w-full'>
                    {
                        Array.from({ length: 5 }).map((_, index) => (
                            <PostCardSkeleton key={index} />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default page