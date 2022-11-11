import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	setupSwagger(app);
	await app.listen(3000);
}
bootstrap();
function setupSwagger(app: INestApplication) {
	const openApiConfig = new DocumentBuilder()
		.setTitle("Greeter API")
		.setDescription("This is the Greeter API Description")
		.setVersion("1.0")
		.setLicense("MIT", "https://opensource.org/licenses/MIT")
		.build();
	const swaggerDoc = SwaggerModule.createDocument(app, openApiConfig);
	SwaggerModule.setup("/", app, swaggerDoc);
}
