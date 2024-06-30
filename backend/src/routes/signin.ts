import { PrismaClient } from '@prisma/client/extension';
import { app } from '../../types';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
import { JWTPayload } from 'hono/utils/jwt/types';
import { signupInput } from '@nishanthubuntu/medium-common';

app.use('/*', async (c, next) => {
    const authorization: string = c.req.header("authorization") || "";

    //since we're expecting "Bearer" before the token
    const valid_authorization: string = authorization.split(" ")[1];

    const valid_user: JWTPayload = await verify(valid_authorization, c.env.JWT_SECRET);
    if (!valid_user.id) {
        c.status(403);
        return c.json({ msg: "Not authorized" });
    }

    await next();
});

app.post('/', async c => {
    const prisma = PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const { success } = signupInput.safeParse(body);

        if (!success) {
            c.status(411);
            c.json({ msg: "Invalid Inputs" });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        })

        if (!user) {
            c.status(403);
            return c.json({ msg: "no user found" });
        }

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ token: jwt });
    } catch (err) {
        c.status(403);
        return c.json({ msg: "Invalid Credentials" });
    }
});

export default app;
