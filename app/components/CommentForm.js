"use client"
import React, { useState } from 'react'
import { createComment } from '../utils/wpApis';

const CommentForm = ({ postId }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = async () => {
        try {
            const data = {
                "author_name": name,
                "author_email": email,
                "content": comment,
                "post": postId
            };
    
            let res = await createComment(data);
    
            if (res) {
                setName("");
                setEmail("");
                setComment("");
    
                console.log("Comment created:", res);
            }
        } catch (error) {
            console.error("Error creating comment:", error);
            
        }
    }

    return (
        <div className='mb-10 flex flex-row flex-wrap justify-between items-center gap-4'>
            <label className="border rounded-lg py-2.5 px-4 flex items-center gap-2 w-full md:w-[48%]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-4 w-4 opacity-70' color={"#000000"} fill={"none"}>
                    <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="grow border-0 focus:ring-0 focus:outline-none" />
            </label>
            <label className="border rounded-lg py-2.5 px-4 flex items-center gap-2 w-full md:w-[48%]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-4 w-4 opacity-70' color={"#000000"} fill={"none"}>
                    <path d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="grow border-0 focus:ring-0 focus:outline-none" />
            </label>

            <div className="py-2 px-4 rounded-lg border w-full">
                <label htmlFor="comment" className="sr-only">Your comment</label>
                <textarea id="comment" rows="6"
                    className="px-0 w-full border-0 focus:ring-0 focus:outline-none"
                    placeholder="Write a comment..." value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
            </div>
            <button className='bg-blue-500 hover:bg-blue-600 transition-all text-white py-2 px-4 rounded-lg' onClick={handleSubmit}>Comment</button>
        </div>
    )
}

export default CommentForm