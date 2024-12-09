'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { fetchPosts } from '../utils/wpApis';

const Pagination = ({ page, perPage, totalPosts }) => {
    const router = useRouter();
    let posts = totalPosts;

    const changePage = async (newPage) => {
        if (newPage < 1) {
            // console.log("No more posts");
            return;
        }

        posts = await fetchPosts(newPage, perPage);
        if (posts.length < 1) {
            // console.log("No more posts");
            return;
        }

        router.push(`/?page=${newPage}`, undefined, { scroll: false });
    };

    return (

        <>
            {posts < 1 && (
                <div className='w-full bg-gray-100 rounded-lg text-center py-16'>
                    <img src='/assets/404.svg' className='w-1/3 mx-auto' />
                    <h3 className='text-xl'>No more posts. Stay tuned for future updates.</h3>
                </div>
            )}

            {posts > 0 && (
                <div className='flex items-center justify-center text-center gap-4'>
                    <button onClick={() => changePage(page - 1)} className='bg-gray-100 hover:bg-blue-500 transition-all hover:text-white p-3 rounded-full cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                            <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div>Page No {page}</div>
                    <button onClick={() => changePage(page + 1)} className='bg-gray-100 hover:bg-blue-500 transition-all hover:text-white p-3 rounded-full cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                            <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            )}
        </>
    )
}

export default Pagination