import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import compression from '@fastify/compress';
import morgan from 'morgan';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await app.register(compression, { encodings: ['gzip', 'deflate'] });

    const config = new DocumentBuilder()
        .setTitle('DO Laundry')
        .setDescription('API description of DO Laundry Project')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger-ui', app, document);

    const logger = WinstonModule.createLogger({
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp(),
                    nestWinstonModuleUtilities.format.nestLike('Do-Laundry', { prettyPrint: true }),
                ),
            }),
        ],
    });

    app.useLogger(logger);

    morgan.token('ip', function (req) {
        return (req.headers['x-forwarded-for'] as string) ?? req.socket.remoteAddress;
    });


    app.use(
        morgan(':ip :method :url HTTP/:http-version :status :user-agent - :response-time ms', {
            stream: {
                write: function (message) {
                    logger.log(message.substring(0, message.lastIndexOf('\n')));
                },
            },
        }),
    );

    await app.listen(8000);
}

void bootstrap();
