import { createExpressServer } from 'routing-controllers';
import { MorganMiddleware } from './middleware/Morgan';
import BlogController from './controllers/BlogController';

const app = createExpressServer({
    cors: true,
    controllers: [BlogController],
    middlewares: [MorganMiddleware],
    interceptors: [],
});

export default app;
