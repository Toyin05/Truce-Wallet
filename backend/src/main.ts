import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global rate limiting
  app.useGlobalGuards(new ThrottlerGuard());

  // API prefix
  app.setGlobalPrefix('api/v1');

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Truce Wallet API')
    .setDescription('AI-powered multi-chain crypto wallet API')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('wallet', 'Wallet management endpoints')
    .addTag('dex', 'Decentralized exchange endpoints')
    .addTag('staking', 'Staking operations endpoints')
    .addTag('market', 'Market data endpoints')
    .addTag('ai', 'AI insights endpoints')
    .addTag('presale', 'Token presale endpoints')
    .addTag('security', 'Security settings endpoints')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Truce Wallet API is running on: http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api-docs`);
}

bootstrap();