import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { title } from 'process';
import { connection } from 'src/common/constants/connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Artist } from 'src/artists/artist.entity';

const mockSongService ={
  findAll(){
    return({id:1,title:"Aroos rap song",artists:["dashi","kiri"]})
  }
}

@Module({
  imports:[TypeOrmModule.forFeature([Song,Artist])],  // this featur from typeorm to hadnling crud
  controllers: [SongsController],
  providers: [
    SongsService, //way 1

    // {
    //   provide:SongsService,   //way 2
    //   useClass:SongsService
    // }

    // {
    //   provide:SongsService, // way3
    //   useValue:mockSongService
    // }
    // {
    //   provide:"CONNECTION",
    //   useValue:connection
    // }
  ]
})
export class SongsModule {}
