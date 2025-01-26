import axios from "axios"
import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

export const FullBlog=({blog}:{blog:Blog})=>{
    const navigate=useNavigate()
    return(
        <div>
            <div>
                <Appbar/>
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-12 pt-12 px-10 gap-x-8 w-full max-w-screen-xl">
                    <div className="col-span-8">
                        <div className="text-4xl font-extrabold text-justify">{blog.title}</div>
                        <div className="text-gray-500 py-5">Post on 2nd December,  2024</div>
                        <div className="pt-2 h-screen text-justify">{blog.content}</div>
                        <button onClick={async ()=>{
                            await axios.delete(`${BACKEND_URL}/api/v1/blog/${blog.id}`,{
                                headers:{
                                    Authorization:`Bearer ${localStorage.getItem("token")}`
                                }}
                            )
                            navigate("/blogs")
                        }}
                        className="bg-gray-600 mb-4 hover:bg-gray-500 text-white font-bold py-1 px-4 rounded">Delete Blog</button>
                    </div>
                    <div className="col-span-4">
                        <div className="flex justify-center gap-2">
                            <div className="flex flex-col justify-center">
                               <Avatar size="big" name={blog.author.name || "Anonymous"}/>
                            </div>
                            <div className="">
                                <div className="text-md  text-gray-500 ">Author</div>
                                <div className="text-3xl font-bold mt-4">
                                    {blog.author.name || "Anonyous"}
                                </div>
                                <div className="pt-2 text-sm text-slate-500">
                                    Random catch phrase about the author's ability to grab the user's attention.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    )
}