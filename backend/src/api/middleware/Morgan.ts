/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import morgan from 'morgan';

@Middleware({ type: 'before' })
export class MorganMiddleware implements ExpressMiddlewareInterface {
    public use(request: any, response: any, next: (err?: any) => void): void {
        return morgan('dev')(request, response, next);
    }
}
