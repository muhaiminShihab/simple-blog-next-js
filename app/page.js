import React from 'react';
import PostCard from './components/PostCard';

const Home = () => {
    return (
        <section className='container mx-auto rounded-md my-8 px-4 lg:px-0'>
            <div className='flex justify-between flex-col lg:flex-row gap-2'>
                <div className='lg:w-[75%] order-2 lg:order-1 mt-3 lg:mt-0'>
                    <div className='flex items-center flex-wrap gap-3'>
                        {[...Array(9)].map((_, index) => (
                            <PostCard key={index} image="/assets/what-is-javascript-450x253.webp" title="10 things you should check before delivering a Laravel Project." url="#" date="8 Nov, 2024" />
                        ))}

                        {/* <div className='w-full bg-gray-200 rounded-md text-center py-16'>
                            <img src='/assets/404.svg' className='w-1/3 mx-auto' />
                            <h3 className='text-xl'>No Data Found. Stay Tuned.</h3>
                        </div> */}
                    </div>
                    <div className='mt-6'>
                        <div className='flex items-center justify-center text-center gap-4'>
                            <div className='bg-gray-200 hover:bg-blue-500 transition-all hover:text-white p-3 rounded-full cursor-pointer'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                                    <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>Page No 1</div>
                            <div className='bg-gray-200 hover:bg-blue-500 transition-all hover:text-white p-3 rounded-full cursor-pointer'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                                    <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='lg:w-[25%] order-1 lg:order-2'>
                    <div className='bg-white shadow-md rounded-md text-center overflow-hidden relative mb-4'>
                        <div className='w-full h-24 overflow-hidden'>
                            <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' className='w-full object-cover' alt='Background Image' />
                        </div>

                        <div className='w-24 h-24 bg-white border-white border-4 rounded-full overflow-hidden absolute top-12 left-1/2 -translate-x-1/2'>
                            <img src='/assets/author.jpg' className='object-cover' alt='Author Image' />
                        </div>

                        <div className="px-4 pt-12 pb-4">
                            <h3 className="text-xl font-semibold" aria-label="Name">
                                Md Muhaiminul Islam Shihab
                            </h3>
                            <h4 className="text-lg -mt-1" aria-label="Job Title">Software Engineer</h4>
                            <p className="font-sans mt-2">
                                I am a passionate software developer specializing in HTML, CSS, Bootstrap, Tailwind CSS, jQuery, JavaScript, Nuxt js, Next js, React Native, PHP, Laravel, MySQL, and PostgreSQL.
                            </p>
                        </div>
                    </div>

                    <div className='bg-white shadow-md rounded-md overflow-hidden relative mb-4 p-4'>
                        <h3 className='text-xl'>Categories</h3>
                        <hr />

                        <div className='mt-2'>
                            <div className='inline-block mr-2 my-1 bg-gray-200 text-black rounded-full py-1 px-3 cursor-pointer transition-all text-sm'>
                                <div className='flex justify-center items-center gap-2'>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#000000" fill="none">
                                            <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span>Newsletter</span>
                                </div>
                            </div>
                            <div className='inline-block mr-2 my-1 bg-gray-200 text-black rounded-full py-1 px-3 cursor-pointer transition-all text-sm'>
                                <div className='flex justify-center items-center gap-2'>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#000000" fill="none">
                                            <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span>AA</span>
                                </div>
                            </div>
                            <div className='inline-block mr-2 my-1 bg-gray-200 text-black rounded-full py-1 px-3 cursor-pointer transition-all text-sm'>
                                <div className='flex justify-center items-center gap-2'>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#000000" fill="none">
                                            <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span>News</span>
                                </div>
                            </div>
                            <div className='inline-block mr-2 my-1 bg-gray-200 text-black rounded-full py-1 px-3 cursor-pointer transition-all text-sm'>
                                <div className='flex justify-center items-center gap-2'>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#000000" fill="none">
                                            <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span>B</span>
                                </div>
                            </div>
                            <div className='inline-block mr-2 my-1 bg-gray-200 text-black rounded-full py-1 px-3 cursor-pointer transition-all text-sm'>
                                <div className='flex justify-center items-center gap-2'>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#000000" fill="none">
                                            <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span>C</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home