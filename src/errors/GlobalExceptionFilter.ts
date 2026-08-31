import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      this.logger.error(`HTTP Exception: ${exception.message}`);
      response.status(status).json({
        statusCode: status,
        message: exception.message,
      });
    } else {
      this.logger.error(`Unexpected error: ${JSON.stringify(exception)}`);
      response.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error',
      });
    }
  }
}
