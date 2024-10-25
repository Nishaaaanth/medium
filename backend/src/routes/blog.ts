import { createBlog, updateBlog } from '@nishanth2696/medium-common';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { verify } from 'hono/jwt';

const blog = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

blog.use("/*", async (c, next) => {
    const authHeader: string = c.req.header("authorization") || "";

    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", user.id as string);
            await next();
        } else {
            c.status(403);
            return c.json({ msg: "Not authorized to access this page" });
        }
    } catch (err) {
        c.status(403);
        return c.json({ msg: "Not authorized to access this page" });
    }
});

blog.post('/', async c => {
    const body = await c.req.json();
    const authorId = c.get("userId");
    const {success} = createBlog.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({msg: "Not a valid input"});
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(authorId),
            }
        });

        return c.json({
            id: blog.id
        });
    } catch (err) {
        c.status(411);
        return c.json({ msg: "Error creating a blog post" });
    }
});

blog.put('/', async c => {
    const body = await c.req.json();
    const {success} = updateBlog.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({msg: "Not a valid input"});
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    });

    return c.json({
        id: blog.id
    });
});

blog.get('/bulk', async c => {
    //TODO: add pagination
    //
    //const page = await c.req.query("page") ?? 1;
    //const perPage = await c.req.query("perPage") ?? 5;
    //
    //const start = (perPage-1) * page;
    //const end = start + perPage;
    //
    //const prisma = new PrismaClient({
    //    datasourceUrl: c.env.DATABASE_URL
    //}).$extends(withAccelerate());
    //
    //try {
    //    const blogs = await prisma.blog.findMany({});
    //    const paginatedBlogs = blogs.slice(start, end);
    //
    //    return c.json({
    //        paginatedResult: paginatedBlogs
    //    });
    //} catch (err) {
    //    c.status(411);
    //    return c.json({ msg: "Error fetching the blog posts" });
    //}

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blogs = await prisma.blog.findMany({});

        return c.json({
            blogs
        });
    } catch (err) {
        c.status(411);
        return c.json({ msg: "Error fetching the blog posts" });
    }
});

blog.get('/:id', async c => {
    const id = c.req.param("id");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            }
        });

        return c.json({
            blog
        })
    } catch (err) {
        c.status(411);
        return c.json({
            msg: "Error fetching the blog post"
        })
    }
});

export default blog;
