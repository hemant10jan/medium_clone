import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"




export function Publish(){
    const navigate=useNavigate()
    const[title,setTitle]=useState("")
    const[description,setDescription]=useState("")

    return(
        <div>
            <Appbar/>
            <div className="flex pt-8 justify-center w-full">
                <div className="mt-16 w-1/2 text-center">
                    <input type="type" onChange={(e)=>setTitle(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                  focus:border-blue-500 block w-full p-2.5" placeholder="Title"/>
                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your content</label>
                     <TextEditor onChange={(e)=>setDescription(e.target.value)} />
                     <button onClick={async ()=>{
                        const response=await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                        title,
                        content:description
                        },{
                            headers:{
                                Authorization:`Bearer ${localStorage.getItem("token")}`
                            }
                        })
                        navigate(`/blog/${response.data.id}`)
                     }}
                    type="submit" className="relative inline-block text-lg group mt-4">
                          <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                <span className="absolute left-0 w-[28rem] h-96 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                <span className="relative">
                                    Publish
                                </span>
                                </span>
                                <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                    </button>
                </div>
            </div>
        </div>
        
    )
}

function TextEditor({onChange}:{onChange : (e:React.ChangeEvent<HTMLTextAreaElement>) => void}){
    return( 
        <>
        <form>
           <div className="w-full mb-4 mt-2">
                <div className="flex items-center justify-between border">
                    <div className="my-2 bg-white rounded-b-lg dark:bg-gray-800 w-full">
                        <label htmlFor="editor" className="sr-only">Publish post</label>
                        <textarea onChange={onChange} id="editor" rows={8} className=" focus:outline-none pl-2 block w-full px-0 text-sm text-gray-800 bg-white border-0" placeholder="Write your blog here..." required ></textarea>
                    </div>
                </div>
           </div>
        </form>
         
        </>
    )
}




