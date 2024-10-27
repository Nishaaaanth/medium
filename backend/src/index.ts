import { Hono } from 'hono'
import user from './routes/user';
import blog from './routes/blog';
import { cors } from 'hono/cors';

const app = new Hono().basePath("/api/v1");

app.use('/*', cors());
app.route('/user', user);
app.route('/blog', blog);

app.get('*', c => {
    return c.text("Not a valid page");
});

export default app
