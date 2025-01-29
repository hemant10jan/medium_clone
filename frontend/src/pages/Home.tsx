import { useRecoilValue } from "recoil";
import { Blogs } from "./Blogs";
import { Signin } from "./Signin";
import { idState } from "../store/atom";

export const Home=()=>{
    const currentUserLoggedinId=useRecoilValue(idState)
    console.log(currentUserLoggedinId)

    if(currentUserLoggedinId){
        return <Blogs/>
    }
    else{
        return <Signin/>
    }
}