import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch(Error)
export class SmtpExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Внутренняя ошибка сервера';

        if (exception.message.includes('550 not local sender over smtp')) {
            status = HttpStatus.BAD_REQUEST;
            message = 'Ошибка отправки почты. Проверьте данные отправителя.';
        }

        if (exception.message.includes('409 not unique')) {
            status = HttpStatus.CONFLICT;
            message = 'Пользователь с таким логином или почтой уже зарегистрирован.';
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: message,
        });
    }
}