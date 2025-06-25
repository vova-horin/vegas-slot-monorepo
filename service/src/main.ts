import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("Bootstrap");
  const configService = app.get(ConfigService);

  app.setGlobalPrefix(configService.get<string>("app.apiPrefix"));

  // Enable CORS for frontend integration
  app.enableCors();

  // Swagger configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Vegas Slot Machine API")
    .setDescription("API documentation for the Vegas Slot Machine game")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api/docs", app, document);

  const port = configService.get<number>("app.port");
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(
    `Swagger documentation is available at: http://localhost:${port}/api/docs`
  );
}
bootstrap();
