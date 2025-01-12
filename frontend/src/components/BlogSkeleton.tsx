import { Circle } from "./BlogCard"

export const BlogSkeleton = () => {
    return <div>
        
<div role="status" className=" animate-pulse">
    <div className="p-5 border-b pb-4 w-screen max-w-screen-md cursor-pointer">
                <div className="flex ">
                    <div className="flex justify-center flex-col">
                    <div className="h-4 w-4 bg-gray-200 rounded-full  w-48 mb-4"></div>
                    </div>
                    <div className="flex justify-center flex-col text-xs text-slate-700 font-medium pl-2">
                    <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>

                    </div>
                    <div className="flex justify-center flex-col pl-1">
                        <Circle />
                    </div>
                    <div className="flex justify-center flex-col font-thin text-xs text-slate-500 pl-1">
                    <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>

                    </div>
                </div>
                <div className="text-xl font-bold mt-1">
                <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>

                </div>
                <div className="text-sm mt-1 text-slate-600 font-semibold">
                <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>

                </div>
                <div className="mt-10 ml-4 font-thin text-xs text-slate-500">
                <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>

                </div>
            </div>
    <span className="sr-only">Loading...</span>
</div>


    </div>
}