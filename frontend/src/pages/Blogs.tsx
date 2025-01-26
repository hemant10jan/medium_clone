import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export function Blogs(){
    const{loading,blogs}=useBlogs();

    if(loading){
        return (
            <div>
                <Appbar/>
                <div className="flex justify-center">
                    <div className="flex flex-col justify-center max-w-2xl">
                        <BlogSkeleton/>
                        <BlogSkeleton/>
                        <BlogSkeleton/>
                        <BlogSkeleton/>
                        <BlogSkeleton/>
                    </div>
                </div>
            </div>
        )
    }


    return(
        <div>
             <Appbar/>
             <h1 className="flex justify-center pr-4 text-2xl pt-3 font-extralight">Discover Blogs</h1>
             <div className="flex justify-center">
                <div className="max-w-2xl">
                    {blogs.map((cblog,val)=>{
                        return <BlogCard key={val} id={cblog.id} title={cblog.title} content={cblog.content} 
                        authorName={cblog.author.name || "Anonymous"} publishedDate={"2nd Feb 2024"} />
                    })}
                </div>
            </div>
        </div>
    )
}