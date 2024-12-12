import { dateFormatter } from '@/app/utils/common'
import Link from 'next/link';

const CommentCard = ({ isReply = false, comment }) => {
    let formattedDate = dateFormatter(new Date(comment.date));

    return (
        <article className={`py-3 text-base rounded-lg ${isReply ? "ml-8" : ""}`}>
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm font-semibold">
                        <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src={comment.author_avatar_urls[96]}
                            alt={comment.author_name} />
                        {comment.author_name}
                    </p>
                    <p className="text-sm">{formattedDate}</p>
                </div>
            </footer>
            <div dangerouslySetInnerHTML={{ __html: comment.content.rendered }}></div>
            {/* <div className="flex items-center mt-4 space-x-4">
                <Link href="#comment" type="button"
                    className="flex items-center text-sm hover:underline font-medium">
                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                    </svg>
                    Reply
                </Link>
            </div> */}
        </article>
    )
}

export default CommentCard