import z from "zod";

export const signin = z.object({
    username: z.string().email(),
    password: z.string().min(8),
});

export const signup = z.object({
    username: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional()
});

export type Signin = z.infer<typeof signin>;
export type Signup = z.infer<typeof signup>;

export const createBlog = z.object({
    title: z.string(),
    author: z.string(),
});

export const updateBlog = z.object({
    id: z.number(),
    title: z.string(),
    author: z.string(),
});

export type CreateBlog = z.infer<typeof createBlog>;
export type UpdateBlog = z.infer<typeof updateBlog>;
