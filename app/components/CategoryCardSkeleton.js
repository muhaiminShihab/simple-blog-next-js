const CategoryCardSkeleton = ({ name, slug }) => {
    return (
        <div className="inline-block mr-2 my-1 bg-gray-200 rounded-full py-1 px-3 animate-pulse">
            <div className="flex justify-center items-center gap-2">
                <span className="w-4 h-4 bg-gray-300 rounded-full"></span>
                <span className="w-16 h-4 bg-gray-300 rounded-md"></span>
            </div>
        </div>
    )
}

export default CategoryCardSkeleton