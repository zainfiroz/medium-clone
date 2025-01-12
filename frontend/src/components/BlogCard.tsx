import { Link } from "react-router-dom";


interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
    <div className="p-5 border-b pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex ">
                <div className="flex justify-center flex-col">
                    <Avatar name={authorName} size={"small"} />
                </div>
                <div className="flex justify-center flex-col text-xs text-slate-700 font-medium pl-2">
                    {authorName}
                </div>
                <div className="flex justify-center flex-col pl-1">
                    <Circle />
                </div>
                <div className="flex justify-center flex-col font-thin text-xs text-slate-500 pl-1">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-bold mt-1">
                {title}
            </div>
            <div className="text-sm mt-1 text-slate-600 font-semibold">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="mt-10 ml-4 font-thin text-xs text-slate-500">
                {`${Math.ceil(content.length / 100)} minute read`}
            </div>
        </div>
        </Link>
}

export function Avatar({ name, size = "small" }: { name: string , size?: "small" | "big" }) {
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden 
    bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-8 h-8"}`}>
            <span className={`${size === "small" ? "text-xs" : "text-md"}
             text-gray-600 dark:text-gray-300 
                `}>
                {name[0]}
            </span>
        </div>
    )
}

export function Circle() {
    return <div className="h-0.5 w-0.5 rounded-full bg-slate-500 ">

    </div>
}