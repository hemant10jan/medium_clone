import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";
import logo from "../assets/medium.png"

export function Signup(){
    return(
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
                <div className="items-center flex gap-2">
                    <img src={logo} className="w-8 h-8 mt-2 ml-2"/>
                    <span className="text-2xl font-bold font-mono mt-2">Medium</span>
                </div>
                <Auth type="signup"/>
            </div>
            <div className="hidden lg:block">
                <Quote/>
            </div>
        </div>
    )
}