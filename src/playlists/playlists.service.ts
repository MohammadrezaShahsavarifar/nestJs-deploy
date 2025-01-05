import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Repository } from 'typeorm';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { CreatePlayListDto } from './dto/create-playlist-dto';

@Injectable()
export class PlaylistsService {
    constructor(
        @InjectRepository(Playlist)
        private playListRepository:Repository<Playlist>,
        @InjectRepository(Song)
        private songRepository:Repository<Song>,
        @InjectRepository(User)
        private userRepository:Repository<User>,

    ){}
    async create(playListDTO: CreatePlayListDto): Promise<Playlist>{
        const playList = new Playlist();
        playList.name= playListDTO.name;
        

        // songs will be the array of ids we are getting from dto
        const songs = await this.songRepository.findByIds(playListDTO.songs);
        //set relation for songs with playlist entity
        playList.songs = songs;


        // a user will be the id of the user we are getting from request
        //when we implementes the user authentication this will become the LoggedIn user Id

        const user = await this.userRepository.findOneBy({id: playListDTO.user});
        playList.user = user;

        return this.playListRepository.save(playList);
    }
}
