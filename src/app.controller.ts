import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@Controller()
@ApiTags("App")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("profile")
  @ApiBearerAuth("JWT-auth") // this will protect the swagger route
  @UseGuards(JwtAuthGuard)
  getProfile(
    @Req()
    request
  ){
    return request.user;
  }
}
