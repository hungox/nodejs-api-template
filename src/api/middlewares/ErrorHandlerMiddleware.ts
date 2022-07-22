import * as express from 'express';
import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers';
import { Service } from 'typedi';

import { Logger, LoggerInterface } from '@base/decorators/Logger';
import { env } from '@base/env';

@Service()
@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  public isProduction = env.isProduction;
  constructor(@Logger(__filename) private log: LoggerInterface) {}

  public error(error: any, req: express.Request, res: express.Response, _next: express.NextFunction): void {
    const responseObject = {} as any;
    responseObject.success = false;

    // Status code
    if (error instanceof HttpError && error.httpCode) {
      responseObject.status = error.httpCode;
      res.status(error.httpCode);
    } else {
      responseObject.status = 500;
      res.status(500);
    }

    // Message
    responseObject.message = error.message;

    // Class validator handle errors
    if (responseObject.status === 400) {
      const validatorErrors = {} as any;
      if (typeof error === 'object' && Object.prototype.hasOwnProperty.call(error, 'errors')) {
        error.errors.forEach((element: any) => {
          if (element.property && element.constraints) {
            validatorErrors[element.property] = element.constraints;
          }
        });
      }
      responseObject.errors = validatorErrors;
    }

    // Final response
    if (!this.isProduction && responseObject.status === 500) {
      responseObject.stack = error.stack;
    }
    res.json(responseObject);

    if (this.isProduction) {
      this.log.error(error.name, error.message);
    } else {
      // console.log(this.log2, "hung")
      this.log.error(error.name, error.stack);
    }
  }
}
