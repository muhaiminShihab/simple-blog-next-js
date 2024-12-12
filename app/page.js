import CategoryCard from '@/app/components/CategoryCard';
import PostCard from '@/app/components/PostCard';
import { fetchCategories, fetchPosts } from '@/app/utils/wpApis';
import Pagination from './components/Pagination';

export default async function Home({ searchParams }) {
    let posts = [];
    let totalPosts = 0;
    let categories = [];
    let totalCategories = 0;
    let page = await searchParams.page ? parseInt(searchParams.page) : 1;
    let perPage = 5;

    const fetchData = async () => {
        posts = await fetchPosts(page, perPage);
        totalPosts = posts.length;

        // categories = await fetchCategories();
        // totalCategories = categories.length;
    };

    await fetchData(page);

    return (
        <section className='container mx-auto my-10 px-4 lg:px-0'>
            <div className='flex justify-between flex-col lg:flex-row gap-10'>
                <div className='lg:w-[75%] order-2 lg:order-1 mt-3 lg:mt-0'>
                    <div className=''>
                        {
                            posts.map((post, index) => (
                                <PostCard
                                    key={index}
                                    imgId={post.featured_media}
                                    title={post.title.rendered}
                                    slug={post.slug}
                                    content={post.excerpt.rendered}
                                    date={post.date}
                                    author={post.author}
                                    id={post.id}
                                />
                            ))
                        }
                    </div>

                    <div className='mt-6'>
                        <Pagination page={page} perPage={perPage} totalPosts={totalPosts} />
                    </div>
                </div>
                <div className='lg:w-[25%] order-1 lg:order-2 border-l pl-6'>
                    <div>
                        <h3 className='text-xl font-semibold mb-2'>Categories</h3>

                        {
                            categories.map((category, index) => (
                                <CategoryCard key={index} name={category.name} slug={category.slug} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}