import { useParams} from "react-router-dom"
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { Appbar } from "../components/Appbar";


export function Blog(){
    const {id}=useParams();
    const {loading,blog}=useBlog({id:id || ""})

    if(loading || !blog){
        return (
            <div>
                <Appbar/> 
                <div className="flex flex-col justify-center h-screen">
                    <div className="flex justify-center">
                        <Spinner/>
                    </div>
                </div>
            </div>
        )
    }
    
    return(
        <>
        <FullBlog blog={blog}/>
        </>
    )
}