import { signin, signup } from '@nishanth2696/medium-common';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign } from 'hono/jwt';

const user = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

user.post('/signup', async c => {
    const body = await c.req.json();
    const {success} = signup.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({msg: "Not a valid input"});
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const user = await prisma.user.create({
            data: {
                username: body.username,
                name: body.name,
                password: body.password,
            }
        });

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.text(jwt);
    } catch (err) {
        c.status(411);
        return c.json({ msg: "Signup was not successful. Check if the user is already registered or enter valid credentials" });
    }
});

user.post('/signin', async c => {
    const body = await c.req.json();
    const {success} = signin.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({msg: "Not a valid input"});
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const user = await prisma.user.findFirst({
            where: {
                username: body.username,
                password: body.password
            }
        });

        if (!user) {
            c.status(403);
            return c.json({ msg: "Invalid Credentials" });
        }

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.text(jwt);
    } catch (err) {
        c.status(411);
        return c.json({ msg: "Signin was not successful. Check the credentials and try again" });
    }
});

export default user;
