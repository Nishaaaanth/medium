import { PrismaClient } from '@prisma/client/extension';
import { app } from '../../types';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { JWTPayload } from 'hono/utils/jwt/types';
import { createPostInput, updatePostInput } from '@nishanthubuntu/medium-common';

app.use("/*", async (c, next) => {
    const authorization: string = c.req.header("authorization") || "";
    const valid_authorization: string = authorization.split(" ")[1];

    try {
    const valid_user: JWTPayload = await verify(valid_authorization, c.env.JWT_SECRET);

    if (!valid_user) {
        c.status(403);
        return c.json({ msg: "Not authorized" });
    }

    c.set("userId", valid_user.id);
    await next();
    } catch(err) {
        c.status(403);
        return c.json({msg: "You're not logged in"});
    }
});

app.post('/', async c => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = createPostInput.safeParse(body);

    if(!success) {
        c.status(411)
        c.json({msg: "Invalid Input"});
    }

    const userId = c.get("userId");

    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(userId)
            }
        })

        return c.json({ id: post.id });
    } catch (err) {
        c.status(403);
        return c.json({ msg: "Invalid" });
    }
});
app.put('/', async c => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = updatePostInput.safeParse(body);

    if(!success) {
        c.status(411)
        c.json({msg: "Invalid Input"});
    }

    try {
        const post = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })

        return c.json({ id: post.id });
    } catch (err) {
        c.status(403);
        return c.json({ msg: "Invalid" });
    }
});
app.get('/:id', async c => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: Number(id)
            }
        })

        return c.json({ post: post });
    } catch (err) {
        c.status(411);
        return c.json({ msg: "Error while fetching post" });
    }
});

// TODO: add pagination
app.get("/bulk", async c => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());



    try {
        const posts = await prisma.post.findMany({});
        return c.json({ posts: posts });
    } catch (err) {
        c.status(403);
        return c.json({ msg: "Error" });
    }
});

export default app;
