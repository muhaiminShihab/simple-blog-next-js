'use client'
import React from 'react'

const Pagination = ({ page, handleChangePage }) => {
    const changePage = (page) => {
        handleChangePage(page);
    }

    return (
        <div className='flex items-center justify-center text-center gap-4'>
            <div onClick={() => changePage(page - 1)} className='bg-gray-100 hover:bg-blue-500 transition-all hover:text-white p-3 rounded-full cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                    <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <div>Page No {page}</div>
            <div onClick={() => changePage(page + 1)} className='bg-gray-100 hover:bg-blue-500 transition-all hover:text-white p-3 rounded-full cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                    <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    )
}

export default Pagination