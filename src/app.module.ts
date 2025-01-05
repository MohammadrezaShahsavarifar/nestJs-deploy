import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
// import { Song } from './songs/song.entity';
// import { Artist } from './artists/artist.entity';
// import { User } from './users/user.entity';
// import { Playlist } from './playlists/playlist.entity';
import { PlaylistsModule } from './playlists/playlists.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import {  typeOrmAsyncConfig } from 'db/data-source';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validate } from 'env.validation';

const devConfig={port:3000};
const proConfig={port:4000};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:[`${process.cwd()}/.env.${process.env.NODE_ENV}`],
      isGlobal:true,
      load:[configuration],
      validate:validate
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    SongsModule,
    PlaylistsModule,
    AuthModule,
    UsersModule,
    ArtistsModule,
    SeedModule,
   
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide:DevConfigService,
      useClass:DevConfigService
    },
    {
      provide:"CONFIG",
      useFactory:()=>{
        return process.env.NODE_ENV ==="development" ? devConfig:proConfig;
      }
    },
    
  
  ],
})
export class AppModule {
 
}
