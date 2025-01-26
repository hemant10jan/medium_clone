import { Link } from "react-router-dom"

type BlogCardProps={
    title:string,
    content:string,
    publishedDate:string,
    authorName:string
    id:string
}

export const BlogCard=({title,content,publishedDate,authorName,id} : BlogCardProps)=>{
    return(
        <Link to={`/blog/${id}`}>
        <div className="border-slate-200 p-4 pb-3 border-b-[0.01rem] cursor-pointer">
            <div className="flex gap-2 items-center">
                <Avatar name={authorName}/>
                <div className="font-normal  pl-2 text-sm flex flex-col justify-center">{authorName}</div>
                <div className="flex flex-col justify-center pl-2">
                    <Circle/>
                </div>
                <div className="pl-2 font-thin text-sm text-slate-500 flex flex-col justify-center">{publishedDate}</div>
            </div>
            <div className="text-xl font-bold pt-2 text-justify">
                {title}
            </div>
            <div className="text-md font-light text-justify">
                 {content.slice(0, 250)}{content.length>250?"...":""}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                {`${Math.ceil(content.length/100)} minutes(s) read`}
            </div>
        </div>
        </Link>
    )
}

export function Circle(){
    return(
        <div className="h-1 w-1 rounded-full bg-slate-500">

        </div>
    )
}

export function Avatar({name,size="small"}:{name:string,size?:string}){
    return(
        <div className={`relative inline-flex items-center justify-center ${size==="small"?"w-6 h-6":"w-8 h-8"} overflow-hidden bg-gray-500 rounded-full`}>
            <span className="font-medium text-gray-300 text-xs">{name[0]}</span>
        </div>
    )
}