import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Blog } from "./pages/Blog"
import { Blogs } from "./pages/Blogs"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { Publish } from "./pages/Publish"


const router=createBrowserRouter([
  {path:"/",element:<Blogs/>},
  {path:"/signin",element:<Signin/>},
  {path:"/signup",element:<Signup/>},
  {path:"/blog/:id",element:<Blog/>},
  {path:"/blogs",element:<Blogs/>},
  {path:"publish",element:<Publish/>}
])

function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
