import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { app } from '../../types';
import { sign } from 'hono/jwt';
import { signinInput } from '@nishanthubuntu/medium-common';

app.post('/', async c => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());


    try {
        const body = await c.req.json();
        const { success } = signinInput.safeParse(body);

        if (!success) {
            c.status(411);
            c.json({ msg: "Invalid Input" });
        }

        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password
            }
        });

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt: token });
    } catch (err) {
        c.status(411);
        return c.text("Invalid User");
    }

});

export default app;
