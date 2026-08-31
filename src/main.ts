import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import cookieParser = require('cookie-parser');
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston/dist/winston.constants';

//import { AppLoggerService } from './logger/logger.service';

dotenv.config({ path: process.cwd() + `/.env.${process.env.NODE_ENV}` });
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Obtener el dominio del frontend desde las variables de entorno o lista de permitidos
  const frontendUrl =
    process.env.FRONTEND_URL || 'https://tu-nombre-de-swa.azurestaticapps.net';

  const isProdEnv = process.env.NODE_ENV === 'production';
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          baseUri: ["'self'"],
          fontSrc: ["'self'", 'https:', 'data:'],
          imgSrc: ["'self'", 'data:', 'https:'],
          objectSrc: ["'none'"],
          scriptSrc: isProdEnv ? ["'self'"] : ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
        },
      },
      crossOriginEmbedderPolicy: false,
      hsts: isProdEnv
        ? { maxAge: 31536000, includeSubDomains: true, preload: true }
        : false,
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      xFrameOptions: { action: 'deny' },
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Enable transformation globally
      whitelist: true, // Strip unknown properties
      forbidNonWhitelisted: true, // Disallow unknown properties
    }),
  );

  app.useGlobalFilters(
    new AllExceptionsFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)),
  );
  app.enableCors({
    origin: [frontendUrl, 'http://localhost:4200'],
    credentials: true, // Required to send cookies
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  //app.useGlobalFilters(new GlobalExceptionFilter());
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: process.env.API_VERSION,
  });

  app.use(cookieParser());

  const isProd = isProdEnv;
  const swaggerBaseUrl = isProd
    ? process.env.API_HOST // Replace with your Azure domain
    : `${process.env.API_HOST}: ${process.env.PORT}`;

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Animo API')
    .setDescription('API documentation for my NestJS app')
    .setVersion('1.0')
    .addServer(swaggerBaseUrl, isProd ? 'Production' : 'Local environment')
    .addBearerAuth() // Enables JWT Authentication (optional)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.info('✅ Payroll App Started succesfully');
  console.info(`🚀 This application is running on: ${await app.getUrl()}`);
  console.log(process.env.NODE_ENV);
}
bootstrap().catch((err) => {
  console.error('Bootstrap faile: ', err);
  process.exit(1);
});
