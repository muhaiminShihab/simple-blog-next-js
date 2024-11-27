import React from 'react'
import he from 'he'
import Share from '@/app/components/Share'
import { fetchPost, fetchAuthor, fetchImageUrl, fetchPostComments } from '@/app/utils/wpApis'
import CommentCard from '@/app/components/CommentCard'
import { dateFormatter, nestComments } from '@/app/utils/common'
import CommentForm from '@/app/components/CommentForm'

const page = async ({ params }) => {
    const { slug } = await params;

    let imageUrl = "/assets/default.png";
    let authorName = process.env.NEXT_PUBLIC_AUTHOR_NAME;
    let authorAvatar = "/assets/dummy.webp";
    let totalComments = 0;
    let comments = [];
    let formattedDate = dateFormatter();
    let post = {};

    try {
        // Fetch post data
        const postData = await fetchPost(slug);

        if (postData) {
            post = postData;
            formattedDate = dateFormatter(new Date(post.date));

            // Fetch additional details asynchronously
            imageUrl = await fetchImageUrl(post.featured_media) || imageUrl;

            const authorData = await fetchAuthor(post.author);
            authorName = authorData?.name || authorName;
            authorAvatar = authorData?.avatar || authorAvatar;

            formattedDate = dateFormatter(new Date(post.date));

            comments = await fetchPostComments(post.id);
            comments = nestComments(comments);
            totalComments = comments?.length || 0;
        }
    } catch (error) {
        console.error("Error fetching page data:", error);
    }

    return (
        <section className='container mx-auto max-w-4xl my-10 px-4 lg:px-0'>
            <div className=''>
                <h1 className='text-3xl md:text-5xl font-semibold my-6'>{he.decode(post.title.rendered)}</h1>
                <div className="my-8 flex items-center gap-3">
                    <span className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden">
                        <img src={authorAvatar} alt="#" className="w-full object-cover" />
                    </span>
                    <span>
                        <span className='block'>{authorName}</span>
                        <span className='text-sm'>{formattedDate}</span>
                    </span>
                </div>
                <div className="flex items-center gap-8 border-t border-b py-3 mb-8">
                    <div className="text-sm flex items-center gap-1 cursor-pointer">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#000000"} fill={"none"}>
                                <path d="M2 12.5C2 11.3954 2.89543 10.5 4 10.5C5.65685 10.5 7 11.8431 7 13.5V17.5C7 19.1569 5.65685 20.5 4 20.5C2.89543 20.5 2 19.6046 2 18.5V12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15.4787 7.80626L15.2124 8.66634C14.9942 9.37111 14.8851 9.72349 14.969 10.0018C15.0369 10.2269 15.1859 10.421 15.389 10.5487C15.64 10.7065 16.0197 10.7065 16.7791 10.7065H17.1831C19.7532 10.7065 21.0382 10.7065 21.6452 11.4673C21.7145 11.5542 21.7762 11.6467 21.8296 11.7437C22.2965 12.5921 21.7657 13.7351 20.704 16.0211C19.7297 18.1189 19.2425 19.1678 18.338 19.7852C18.2505 19.8449 18.1605 19.9013 18.0683 19.9541C17.116 20.5 15.9362 20.5 13.5764 20.5H13.0646C10.2057 20.5 8.77628 20.5 7.88814 19.6395C7 18.7789 7 17.3939 7 14.6239V13.6503C7 12.1946 7 11.4668 7.25834 10.8006C7.51668 10.1344 8.01135 9.58664 9.00069 8.49112L13.0921 3.96056C13.1947 3.84694 13.246 3.79012 13.2913 3.75075C13.7135 3.38328 14.3652 3.42464 14.7344 3.84235C14.774 3.8871 14.8172 3.94991 14.9036 4.07554C15.0388 4.27205 15.1064 4.37031 15.1654 4.46765C15.6928 5.33913 15.8524 6.37436 15.6108 7.35715C15.5838 7.46692 15.5488 7.5801 15.4787 7.80626Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span className="text-sm font-semibold">{Math.floor(Math.random() * 1000)}</span>
                    </div>
                    <div className="text-sm flex items-center gap-1 cursor-pointer">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#000000"} fill={"none"}>
                                <path d="M22 11.5667C22 16.8499 17.5222 21.1334 12 21.1334C11.3507 21.1343 10.7032 21.0742 10.0654 20.9545C9.60633 20.8682 9.37678 20.8251 9.21653 20.8496C9.05627 20.8741 8.82918 20.9948 8.37499 21.2364C7.09014 21.9197 5.59195 22.161 4.15111 21.893C4.69874 21.2194 5.07275 20.4112 5.23778 19.5448C5.33778 19.0148 5.09 18.5 4.71889 18.1231C3.03333 16.4115 2 14.1051 2 11.5667C2 6.28357 6.47778 2 12 2C17.5222 2 22 6.28357 22 11.5667Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M11.9955 12H12.0045M15.991 12H16M8 12H8.00897" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span className="text-sm font-semibold">{totalComments}</span>
                    </div>
                    <div className="text-sm flex items-center gap-1">
                        <Share iconSize={18} iconColor='#000000' link={process.env.NEXT_PUBLIC_APP_URL + "/post/" + post.slug} withText={true} />
                    </div>
                </div>
                <img src={imageUrl} alt='#' className='rounded-lg mx-auto' />
            </div>

            <div className='my-16 overflow-x-hidden text-wrap'>
                <div className='md:text-lg text-justify post-content' dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
            </div>

            <div className='border-t hidden'>
                <div className='mt-16'>
                    <div className='flex items-center gap-2 mb-4'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={25} height={25} color={"#000000"} fill={"none"}>
                                <path d="M2 12C2 7.52166 2 5.28249 3.39124 3.89124C4.78249 2.5 7.02166 2.5 11.5 2.5C15.9783 2.5 18.2175 2.5 19.6088 3.89124C21 5.28249 21 7.52166 21 12C21 16.4783 21 18.7175 19.6088 20.1088C18.2175 21.5 15.9783 21.5 11.5 21.5C7.02166 21.5 4.78249 21.5 3.39124 20.1088C2 18.7175 2 16.4783 2 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M12.3638 7.72209L13.2437 9.49644C13.3637 9.74344 13.6837 9.98035 13.9536 10.0257L15.5485 10.2929C16.5684 10.4643 16.8083 11.2103 16.0734 11.9462L14.8335 13.1964C14.6236 13.4081 14.5086 13.8164 14.5736 14.1087L14.9285 15.6562C15.2085 16.8812 14.5636 17.355 13.4887 16.7148L11.9939 15.8226C11.7239 15.6613 11.2789 15.6613 11.004 15.8226L9.50913 16.7148C8.43925 17.355 7.78932 16.8761 8.06929 15.6562L8.42425 14.1087C8.48925 13.8164 8.37426 13.4081 8.16428 13.1964L6.92442 11.9462C6.1945 11.2103 6.42947 10.4643 7.44936 10.2929L9.04419 10.0257C9.30916 9.98035 9.62912 9.74344 9.74911 9.49644L10.629 7.72209C11.109 6.7593 11.8889 6.7593 12.3638 7.72209Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <h3 className='text-2xl font-bold'>Comments</h3>
                    </div>
                </div>
                <div className='mt-16'>
                    <div className='flex items-center gap-2 mb-4'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={25} height={25} color={"#000000"} fill={"none"}>
                                <path d="M2 12C2 7.52166 2 5.28249 3.39124 3.89124C4.78249 2.5 7.02166 2.5 11.5 2.5C15.9783 2.5 18.2175 2.5 19.6088 3.89124C21 5.28249 21 7.52166 21 12C21 16.4783 21 18.7175 19.6088 20.1088C18.2175 21.5 15.9783 21.5 11.5 21.5C7.02166 21.5 4.78249 21.5 3.39124 20.1088C2 18.7175 2 16.4783 2 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M12.3638 7.72209L13.2437 9.49644C13.3637 9.74344 13.6837 9.98035 13.9536 10.0257L15.5485 10.2929C16.5684 10.4643 16.8083 11.2103 16.0734 11.9462L14.8335 13.1964C14.6236 13.4081 14.5086 13.8164 14.5736 14.1087L14.9285 15.6562C15.2085 16.8812 14.5636 17.355 13.4887 16.7148L11.9939 15.8226C11.7239 15.6613 11.2789 15.6613 11.004 15.8226L9.50913 16.7148C8.43925 17.355 7.78932 16.8761 8.06929 15.6562L8.42425 14.1087C8.48925 13.8164 8.37426 13.4081 8.16428 13.1964L6.92442 11.9462C6.1945 11.2103 6.42947 10.4643 7.44936 10.2929L9.04419 10.0257C9.30916 9.98035 9.62912 9.74344 9.74911 9.49644L10.629 7.72209C11.109 6.7593 11.8889 6.7593 12.3638 7.72209Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <h3 className='text-2xl font-bold'>Leave a comment</h3>
                    </div>
                    <div className='flex flex-row flex-wrap justify-between items-center gap-4'>
                        <label className="input input-bordered flex items-center gap-2 w-full md:w-[48%]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-4 w-4 opacity-70' color={"#000000"} fill={"none"}>
                                <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                            <input type="text" className="grow" placeholder="Email" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 w-full md:w-[48%]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-4 w-4 opacity-70' color={"#000000"} fill={"none"}>
                                <path d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            </svg>
                            <input type="text" className="grow" placeholder="Email" />
                        </label>

                        <textarea className="textarea textarea-bordered w-full" rows="5" placeholder="Comment"></textarea>

                        <button className='bg-blue-500 hover:bg-blue-600 transition-all text-white py-2 px-4 rounded-lg'>Comment</button>
                    </div>
                </div>
            </div>

            <section className="border-t pt-16">
                <div className="flex items-center mb-6 gap-2" id='comment'>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
                            <path d="M2 12C2 7.52166 2 5.28249 3.39124 3.89124C4.78249 2.5 7.02166 2.5 11.5 2.5C15.9783 2.5 18.2175 2.5 19.6088 3.89124C21 5.28249 21 7.52166 21 12C21 16.4783 21 18.7175 19.6088 20.1088C18.2175 21.5 15.9783 21.5 11.5 21.5C7.02166 21.5 4.78249 21.5 3.39124 20.1088C2 18.7175 2 16.4783 2 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M12.3638 7.72209L13.2437 9.49644C13.3637 9.74344 13.6837 9.98035 13.9536 10.0257L15.5485 10.2929C16.5684 10.4643 16.8083 11.2103 16.0734 11.9462L14.8335 13.1964C14.6236 13.4081 14.5086 13.8164 14.5736 14.1087L14.9285 15.6562C15.2085 16.8812 14.5636 17.355 13.4887 16.7148L11.9939 15.8226C11.7239 15.6613 11.2789 15.6613 11.004 15.8226L9.50913 16.7148C8.43925 17.355 7.78932 16.8761 8.06929 15.6562L8.42425 14.1087C8.48925 13.8164 8.37426 13.4081 8.16428 13.1964L6.92442 11.9462C6.1945 11.2103 6.42947 10.4643 7.44936 10.2929L9.04419 10.0257C9.30916 9.98035 9.62912 9.74344 9.74911 9.49644L10.629 7.72209C11.109 6.7593 11.8889 6.7593 12.3638 7.72209Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                    <h2 className="text-lg lg:text-2xl font-bold">Comments ({totalComments})</h2>
                </div>

                <CommentForm postId={post.id} />

                {
                    comments.map((comment, index) => (
                        <div key={index}>
                            <CommentCard comment={comment} />
                            {comment.children && comment.children.length > 0 && (
                                <div className="replies">
                                    {comment.children.map((reply, replyIndex) => (
                                        <div key={`reply-${replyIndex}`}>
                                            <CommentCard isReply={true} comment={reply} />
                                            {/* Render replies of replies recursively */}
                                            {reply.children && reply.children.length > 0 && (
                                                <div className="replies">
                                                    {reply.children.map((nestedReply, nestedReplyIndex) => (
                                                        <CommentCard
                                                            key={`nested-reply-${nestedReplyIndex}`}
                                                            isReply={true}
                                                            comment={nestedReply}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                }
            </section>
        </section>
    )
}

export default page