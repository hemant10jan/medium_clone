import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify } from 'hono/jwt'; 
import { signinBody ,signupBody} from "@hemant_1001/medium-common";

export const userRouter = new Hono<{
    Bindings:{   // We need to pass this thing also in generics for environment variables, TS doesn't care to .toml file We need to explicitely the type of varable and this is how we tell
      DATABASE_URL:string
      JWT_SECRET:string
    }
  }>();

userRouter.post('/signup', async (c) => {
  const body=await c.req.json()

  const prisma = new PrismaClient({     // In case ofserverless, we should minimise the use of global bcoz only the functions loads and we cant have access of c outside route
  datasourceUrl: c.env.DATABASE_URL,  // This is how we access environment variable in HONO
  }).$extends(withAccelerate())
  console.log(c.env.DATABASE_URL)

  const {success}=signupBody.safeParse(body)

  if(!success){
    c.status(411);
    return c.json({
      error:"Input validation failed"
    })
  }

  const existingUser=await prisma.user.findUnique({
    where:{
      email:body.email
    }
  })

  if(existingUser){
    c.status(409)
    return c.json({
      error:"User already exists."
    })
  }

  try{
    const user=await prisma.user.create({
      data:{
        name:body.name,
        email:body.email,
        password:body.password
      },
    })
  
    const token=await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({
      token,
      id:user.id
    })
  }
  catch(err){
    return c.json({
      error:"Error while Signing Up"
    })
  }
})


userRouter.post("/signin",async (c)=>{
  
  const body=await c.req.json()
  
  const {success}=signinBody.safeParse(body)
  
  if(!success){
    c.status(411);
    return c.json({
      error:"Input validation failed"
    })
  }
  
  const prisma = new PrismaClient({     
    datasourceUrl: c.env.DATABASE_URL,  
}).$extends(withAccelerate())

  try{
    const user=await prisma.user.findUnique({
      where:{
        email:body.email,
        password:body.password
      }
    })
  
    if(!user){
      c.status(403);
      return c.json({error:"User not found"})
    }
  
    const token=await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({token,id:user.id})
  }
  catch(err){
    c.status(411);
    return c.json({
      error:"Error While Signing In"
    })
  }
})