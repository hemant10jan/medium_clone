import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupBody } from "@hemant_1001/medium-common"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useSetRecoilState } from "recoil"
import { idState } from "../state/atom"


//trpc
export const Auth=({type} : {type:"signup" | "signin"})=>{
    const navigate=useNavigate();
    const setId=useSetRecoilState(idState);
    
    const [postInput,setPostInputs]=useState<SignupBody>({
        email:"",
        password:"",
        name:"",
    })

    async function sendRequest(){
        try{
            const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`
                ,postInput
            )
            const token=response.data.token
            localStorage.setItem("token",token)
            setId(response.data.id)
            navigate("/blogs")
        }
        catch(e){
            alert("Error: Request failed.")
        }
    }

    return(
        <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <div className="bg-slate-200 w-1/2 p-4 rounded-lg">
                    <div className="pl-5">
                        <div className="text-3xl font-extrabold">
                            {type==="signup"?"Sign up with email":"Sign in with email"}
                        </div>
                        <div className="text-slate-500 pl-3.5">
                            {type==="signup"?"Already have an account?":"Don't have an account?"}
                            <Link to={type==="signup"?"/signin":"/signup"} className="pl-1 underline">
                            {type==="signup"?"Sign in":"Sign up"}
                            </Link>
                        </div>
                    </div>
                    <div className="mt-2 pt-2 flex flex-col">
                        {type==="signup" && <LabelledInput type="text" placeholder="Enter your name" label="Name"
                        onChange={(e)=>{
                            setPostInputs((prev)=>({...prev,name:e.target.value}))
                        }}/>}

                        <LabelledInput type="text" placeholder="m@example.com" label="Username"
                        onChange={(e)=>{
                            setPostInputs((prev)=>({...prev,email:e.target.value}))
                        }}/>

                        <LabelledInput type="password" placeholder="123456" label="Password"
                        onChange={(e)=>{
                            setPostInputs((prev)=>({...prev,password:e.target.value}))
                        }}/>

                        <button onClick={sendRequest} type="button" className="relative inline-block text-lg group mt-8">
                                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                <span className="absolute left-0 w-[28rem] h-96 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                <span className="relative">
                                    {type === "signup" ? "Sign up" : "Sign in"}
                                </span>
                                </span>
                                <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

type LabelledInputProps={
    type?:string,
    placeholder:string,
    label:string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({label,type,placeholder,onChange}:LabelledInputProps){
    return(
        <div className="mt-4">
            <label className="leading-7 text-sm font-medium text-gray-800">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" 
            className="w-full bg-gray-300 rounded border bg-opacity-40 border-gray-700 focus:ring-2
         focus:ring-gray-600 focus:bg-transparent focus:border-gray-500 text-base outline-none py-1 
         px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder={placeholder} required />
        </div>
    )
}



