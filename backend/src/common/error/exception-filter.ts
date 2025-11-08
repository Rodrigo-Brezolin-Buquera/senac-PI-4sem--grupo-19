import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id?: string;
      user_type?: string;
    };
    requestId?: string;
  }
}

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const rawResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Erro interno no servidor';

    
    const message = this.formatMessage(rawResponse);
    const user = request.user;
    const safeUser = user
      ? {
          id: user.id,
          user_type: user.user_type,
        }
      : undefined;

    const errorStack = exception instanceof Error ? exception.stack : undefined;
    
      this.logger.error(
      JSON.stringify({
        level: 'error',
        requestId: request.requestId,
        method: request.method,
        path: request.url,
        status,
        user: safeUser,
        message,
        stack: errorStack,
      }),
    );

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private formatMessage(raw: any): string {
    if (typeof raw === 'string') return raw;

    if (typeof raw === 'object' && Array.isArray(raw.message)) {
      return raw.message.join(' | ');
    }

    if (typeof raw === 'object' && typeof raw.message === 'string') {
      return raw.message;
    }
    return 'Erro inesperado.';
  }
}
