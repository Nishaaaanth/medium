import mainRouter from './routes/index';
import { app } from '../types';

app.route('api/v1/', mainRouter);

app.get('/', (c) => {
  return c.json({api: '/api/v1/'})
})

export default app
