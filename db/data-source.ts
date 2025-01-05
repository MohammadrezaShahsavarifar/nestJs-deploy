import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Artist } from "src/artists/artist.entity";
import { Playlist } from "src/playlists/playlist.entity";
import { Song } from "src/songs/song.entity";
import { User } from "src/users/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";


export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions={
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:async(
        configService:ConfigService
    ):Promise<TypeOrmModuleOptions> =>{
        return {
            type:"postgres",
            host:configService.get<string>("db.host"),
            port:configService.get<number>("db.port"),
            username:configService.get<string>("db.username"),
            password:configService.get<string>("db.password"),
            database:configService.get<string>("db.name"),
            entities:[User,Playlist,Song,Artist],
            synchronize:false,
            migrations: ["dist/db/migrations/*.js"],
        }
    }
}


export const dataSourceOptions: DataSourceOptions={
    type:"postgres",
    host:process.env.DB_HOST,
    port:parseInt(process.env.DB_PORT),
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    entities:["dist/**/*.entity.js"],
    synchronize:false,
    migrations:["dist/db/migrations/*.js"],
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;