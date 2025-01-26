import { Link, useNavigate } from "react-router-dom"
import { Avatar } from "./BlogCard"
import logo from "../assets/medium.png"

export const Appbar=()=>{
    const navigate=useNavigate()
    return(
        <div className="border-b-2 py-1 border-slate-200 px-10 flex justify-between">
            <div className="items-center flex gap-2">
                <Link to="/blogs">
                    <img src={logo} className="w-9 h-9 cursor-pointer" alt=""/>
                </Link>
                <span className="text-xl font-bold">Medium</span>
            </div>
            <div className="flex items-center gap-3">
            <button onClick={()=>{navigate("/publish")}}
                className="relative px-5 h-7 w-29 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group">
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">New Blog</span>
            </button>
            <button 
                onClick={()=>{
                    localStorage.removeItem("token");
                    navigate("/signin")
                }}
                className="relative px-5 h-7 w-28 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group">
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Sign Out</span>
            </button>
                <Avatar name="hemant" size="big"/>
            </div>
        </div>
    )
}

