import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { SeedService } from './seed/seed.service';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module:any;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // down two line for create fake user by seeding
  // const seedService = app.get(SeedService);
  // await seedService.seed();
  const config = new DocumentBuilder()
  .setTitle("Spotify clone")
  .setDescription("The Spotify Clone Documentation")
  .setVersion("1.0")
  .addBearerAuth(
    {
      type:"http",
      scheme:"bearer",
      bearerFormat:"JWT",
      name:"JWT",
      description:"Enter JWT token",
      in:"header",
    },
    "JWT-auth",
  )
  .build();
  
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup("api",app,document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>("port");
  console.log(configService.get<string>("NODE_ENV"));
  if (!port) {
    console.error("Port is not defined in the configuration.");
    return;
  }
  await app.listen(port);


  if(module.hot){
    module.hot.accept();
    module.hot.dispose(()=>app.close());
  }
}
bootstrap();
