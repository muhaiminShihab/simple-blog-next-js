import React from 'react'

const PostCard = ({ image, title, url, date }) => {
    return (
        <a
            href={ url }
            className="w-[48%] lg:w-[32%] mb-2 bg-white shadow-md rounded-md overflow-hidden transition-all"
        >
            <div className="w-full h-full">
                <img
                    src={ image }
                    alt={ title }
                    className="w-full object-cover"
                />
            </div>

            <div className="mt-2 pb-4 px-4">
                <p className="text-sm">{ date }</p>
                <h3 className="text-lg leading-tight hover:text-blue-500 transition-all">
                    { title }
                </h3>
            </div>
        </a>
    )
}

export default PostCard