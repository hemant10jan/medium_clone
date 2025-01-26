import { Hono } from "hono";
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
    }
}>();

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

blogRouter.post("/",async (c)=>{
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

    const blog=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:author
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
                author:{
                    select:{
                        name:true
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