import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl ">
                <div className="col-span-8 ">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Posted on 12 Jan
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4 pl-10">
                    <div className="text-gray-700 font-medium text-lg pb-3">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="flex flex-col justify-center pr-4">
                            <Avatar size={"big"} name={blog.author?.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Proverb from the Author
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
}