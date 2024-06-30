import { Hono } from 'hono';
import signupRoute from './signup';
import signinRoute from './signin';
import blogRoute from './post';

const app = new Hono();

app.route('/signin', signinRoute);
app.route('/signup', signupRoute);
app.route('/blog', blogRoute);

export default app;
