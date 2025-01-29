import { useRecoilValue } from "recoil";
// import { Blogs } from "./Blogs";
// import { Signin } from "./Signin";
import { idState } from "../state/atom";

export const Home=()=>{
    const currentUserLoggedinId=useRecoilValue(idState)
    console.log(currentUserLoggedinId)

    return <div>Hi</div>

    // if(currentUserLoggedinId){
    //     return <Blogs/>
    // }
    // else{
    //     return <Signin/>
    // }

}