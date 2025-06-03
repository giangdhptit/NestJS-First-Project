import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

/**
 * the catch decorator binds the required metadatta to the exception filter
 */
@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    console.log({ exceptionResponse });
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
