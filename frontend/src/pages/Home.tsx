import { Blogs } from "./Blogs";
import { Signin } from "./Signin";

export const Home=()=>{

    const isLoggedIn=localStorage.getItem("token");

    if(isLoggedIn){
        return <Blogs/>
    }
    else{
        return <Signin/>
    }

}