import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
// import { authConstanst } from './auth-constants';
import { JwtStrategy } from './jwt-strategy';
import { ArtistsModule } from 'src/artists/artists.module';
import { ApiKeyStrategy } from './api-key-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    UsersModule,
    JwtModule.registerAsync({
    imports:[ConfigModule],
    useFactory:async( configService:ConfigService) =>({
      secret: configService.get<string>("secret"),
      signOptions:{
        expiresIn:"2d"
      }
    }),
    inject: [ConfigService],
}),
  ArtistsModule
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ApiKeyStrategy],
  exports:[AuthService]
})
export class AuthModule {}
