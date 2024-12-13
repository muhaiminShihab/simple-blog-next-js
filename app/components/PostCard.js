import Link from "next/link";
import he from "he";
import { fetchAuthor, fetchImageUrl, fetchPostComments } from "../utils/wpApis";
import { nestComments } from "../utils/common";
import Image from "next/image";

const PostCard = async ({ imgId, title, content, slug, date, author, id }) => {
    let imageUrl = "/assets/default.png";
    let authorName = process.env.NEXT_PUBLIC_AUTHOR_NAME;
    let authorAvatar = "/assets/dummy.webp";
    let totalComments = 0;
    let comments = [];

    const decodedTitle = he.decode(title);
    const decodedContent = he.decode(content).replace(/<\/?[^>]+(>|$)/g, "");
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
    }).format(new Date(date));

    try {
        imageUrl = await fetchImageUrl(imgId) || imageUrl;
        const authorData = await fetchAuthor(author);
        authorName = authorData?.name || authorName;
        authorAvatar = authorData?.avatar || authorAvatar;

        comments = await fetchPostComments(id);
        comments = nestComments(comments);
        totalComments = comments?.length || 0;

    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return (
        <Link
            href={`/post/${slug}`}
            className="flex flex-col md:flex-row items-center justify-between w-full mb-8 gap-8 pb-8 border-b border-gray-200 last:border-b-0"
        >
            <div className="px-4 w-full md:w-[80%] order-2 md:order-1">
                <div className="text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gray-500 overflow-hidden">
                        <img src={authorAvatar} alt={authorName} className="w-full object-cover" />
                    </span>
                    {authorName}
                </div>
                <div className="my-4">
                    <h3 className="text-2xl font-bold">{decodedTitle}</h3>
                    <p className="mt-2">{decodedContent}</p>
                </div>
                <div className="flex items-center gap-8">
                    <div className="text-sm">{formattedDate}</div>
                    {/* <div className="text-sm flex items-center gap-1">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#000000"} fill={"none"}>
                                <path d="M2 12.5C2 11.3954 2.89543 10.5 4 10.5C5.65685 10.5 7 11.8431 7 13.5V17.5C7 19.1569 5.65685 20.5 4 20.5C2.89543 20.5 2 19.6046 2 18.5V12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15.4787 7.80626L15.2124 8.66634C14.9942 9.37111 14.8851 9.72349 14.969 10.0018C15.0369 10.2269 15.1859 10.421 15.389 10.5487C15.64 10.7065 16.0197 10.7065 16.7791 10.7065H17.1831C19.7532 10.7065 21.0382 10.7065 21.6452 11.4673C21.7145 11.5542 21.7762 11.6467 21.8296 11.7437C22.2965 12.5921 21.7657 13.7351 20.704 16.0211C19.7297 18.1189 19.2425 19.1678 18.338 19.7852C18.2505 19.8449 18.1605 19.9013 18.0683 19.9541C17.116 20.5 15.9362 20.5 13.5764 20.5H13.0646C10.2057 20.5 8.77628 20.5 7.88814 19.6395C7 18.7789 7 17.3939 7 14.6239V13.6503C7 12.1946 7 11.4668 7.25834 10.8006C7.51668 10.1344 8.01135 9.58664 9.00069 8.49112L13.0921 3.96056C13.1947 3.84694 13.246 3.79012 13.2913 3.75075C13.7135 3.38328 14.3652 3.42464 14.7344 3.84235C14.774 3.8871 14.8172 3.94991 14.9036 4.07554C15.0388 4.27205 15.1064 4.37031 15.1654 4.46765C15.6928 5.33913 15.8524 6.37436 15.6108 7.35715C15.5838 7.46692 15.5488 7.5801 15.4787 7.80626Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span className="text-sm font-semibold">{(totalComments * 10 / 100)}%</span>
                    </div> */}
                    <div className="text-sm flex items-center gap-1">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#000000"} fill={"none"}>
                                <path d="M22 11.5667C22 16.8499 17.5222 21.1334 12 21.1334C11.3507 21.1343 10.7032 21.0742 10.0654 20.9545C9.60633 20.8682 9.37678 20.8251 9.21653 20.8496C9.05627 20.8741 8.82918 20.9948 8.37499 21.2364C7.09014 21.9197 5.59195 22.161 4.15111 21.893C4.69874 21.2194 5.07275 20.4112 5.23778 19.5448C5.33778 19.0148 5.09 18.5 4.71889 18.1231C3.03333 16.4115 2 14.1051 2 11.5667C2 6.28357 6.47778 2 12 2C17.5222 2 22 6.28357 22 11.5667Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M11.9955 12H12.0045M15.991 12H16M8 12H8.00897" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span className="text-sm font-semibold">{totalComments}</span>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-[20%] order-1 md:order-2">
                <div className="relative overflow-hidden rounded-lg w-full pb-[50%] lg:pb-[80%]">
                    <Image
                        src={imageUrl}
                        alt={decodedTitle}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        className="rounded-lg"
                    />
                </div>
            </div>
        </Link>
    );
};

export default PostCard;
