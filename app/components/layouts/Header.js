import Link from 'next/link';
import React from 'react';
import Share from '../Share';
import { fetchSiteData } from '@/app/utils/wpApis';

const Header = async () => {
    let siteData = {
        title: process.env.NEXT_PUBLIC_APP_NAME,
        description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
        url: process.env.NEXT_PUBLIC_APP_URL,
        site_logo: "/assets/author.jpg",
        site_icon: "/assets/author.jpg",
    };

    await fetchSiteData().then((data) => {
        siteData = data;
    });

    return (
        <header className='bg-blue-500 text-white'>
            <div className='container mx-auto py-4 px-4'>
                <div className='flex justify-between items-center gap-2'>
                    <Link href='/' className='w-1/2 flex items-center gap-3 logo-container'>
                        <div className='w-10 h-10 bg-white rounded-full overflow-hidden'>
                            <img src={siteData.site_logo} className='object-cover' alt={siteData.title} />
                        </div>
                        <h3 className='text-2xl md:text-3xl font-bold'>{siteData.title}</h3>
                    </Link>
                    <div className='w-1/2 flex justify-end items-center gap-4'>
                        <Link href='#' className='hover:bg-[hsla(0,0%,100%,.2)] rounded-full p-2 transition-all'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#FFFFFF" fill="none">
                                <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <div className='p-2 hover:bg-[hsla(0,0%,100%,.2)] rounded-full transition-all'>
                            <Share link={process.env.NEXT_PUBLIC_APP_URL} withText={false} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header