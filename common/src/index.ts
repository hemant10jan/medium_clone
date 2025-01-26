import z from "zod"

export const signupBody=z.object({
    email:z.string().email(),
    name:z.string().optional(),
    password:z.string().min(6)
})

export type SignupBody=z.infer<typeof signupBody>;

export const signinBody=z.object({
    email:z.string().email(),
    password:z.string().min(6)
})

export type SigninBody=z.infer<typeof signinBody>;

export const createBlogInput=z.object({
    title:z.string().min(1),
    content:z.string()
})

export type CreateBlogInput=z.infer<typeof createBlogInput>;

export const updateBlogInput=z.object({
    title:z.string().min(1),
    content:z.string(),
    id:z.string()
})

export type UpdateBlogInput=z.infer<typeof updateBlogInput>;



