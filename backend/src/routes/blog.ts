import { Context, Hono, Next } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { createBlogInput,updateBlogInput } from "@hemant_1001/medium-common";

export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
    Variables:{
        userId:string,
        finalDate:string
    }
}>();

// Middleware which we are using to format the Date to add in Blog

blogRouter.use("/*", async (c,next)=>{
    const header=c.req.header("Authorization") || ""

    if(!header){
        c.status(401)
        return c.json({
            error:"Unauthorized"
        })
    }

    try{
        const token=header.split(" ")[1];
        const payload=await verify(token,c.env.JWT_SECRET)
        c.set("userId",String(payload.id))
        await next();
    }
    catch(err){
        return c.json({
            error:"Unauthorized"
        })
    }
})

const formatDate=async (c:Context,next:Next)=>{
    const obj=new Date()
    const day=obj.getDate();
    const month=obj.getMonth();
    const year=obj.getFullYear();
    
    const arr=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    let suffix=""

    if(day%10===1 && day!==11){
        suffix+="st"
    }
    else if(day%10===2 && day!==12){
        suffix+="nd"
    }
    else if(day%10===3 && day!==13){
        suffix+="rd"
    }
    else{
        suffix+="th"
    }

    const finalDate=day+""+suffix+" "+arr[month]+" "+year;
    c.set("finalDate",finalDate)
    await next()
}

blogRouter.post("/",formatDate,async (c)=>{
    const body=await c.req.json()

    const {success}=createBlogInput.safeParse(body)

    if(!success){
        c.status(411)
        return c.json({
            error:"Input validation failed"
        })
    }

    const prisma = new PrismaClient({     
        datasourceUrl: c.env.DATABASE_URL,  
    }).$extends(withAccelerate())
    
    
    const author=c.get("userId")
    const date=c.get("finalDate")

    const blog=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:author,
            publishedDate:date
        }
    })

    return c.json({
        id:blog.id
    })
})

blogRouter.put("/",async (c)=>{
    const body=await c.req.json()
    
    const {success}=createBlogInput.safeParse(body)

    if(!success){
        c.status(411)
        return c.json({
            error:"Input validation failed"
        })
    }
    const prisma = new PrismaClient({     
        datasourceUrl: c.env.DATABASE_URL,  
    }).$extends(withAccelerate())
    

    const blog=await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content,
        }
    })

    return c.json({
        blog
    })
})

// Todo : add pagination
blogRouter.get("/bulk", async (c)=>{
    const prisma = new PrismaClient({     
        datasourceUrl: c.env.DATABASE_URL,  
    }).$extends(withAccelerate())

    try{
        const blogs=await prisma.post.findMany({
            select:{
                title:true,
                content:true,
                publishedDate:true,
                id:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })

        return c.json({
            blogs
        })
    }

    catch(err){
        return c.json({
            error:"Error While Fetching Blogs"
        })
    }
})


blogRouter.get("/:id", async (c)=>{
    console.log("Bulk")
    const prisma = new PrismaClient({     
        datasourceUrl: c.env.DATABASE_URL,  
    }).$extends(withAccelerate())

    const param=c.req.param("id")

    try{
        const blog=await prisma.post.findFirst({
            where:{
                id:param
            },
            select:{
                title:true,
                content:true,
                id:true,
                publishedDate:true,
                author:{
                    select:{
                        name:true,
                        id:true
                    }
                }
            }
        })

        if(!blog){
            return c.json({
                error:"Blog not found"
            })
        }

        return c.json({
            blog
        })
    }
    catch(err){
        c.status(411)
        return c.json({
            error:"Error While Fetching blog"
        })
    }
})


blogRouter.delete("/:id",async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const param = c.req.param("id");
    
    const deletedBlog = await prisma.post.delete({
        where: {
          id: param,  
        },
      });

    return c.json({
        msg:"Blog deleted successfully."
    })
  })