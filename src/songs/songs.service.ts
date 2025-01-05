import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDTO } from './dto/update-song-dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artist.entity';

@Injectable({
    scope:Scope.TRANSIENT,}
)
export class SongsService {
    

    constructor(
        @InjectRepository(Song)
        private songsRepository:Repository<Song>,
        @InjectRepository(Artist)
        private artistsRepository:Repository<Artist>,
    ){}

    // private readonly songs=[]; // this is local array

   async create(songDTO : CreateSongDTO) : Promise<Song>{
        const song = new Song();
        song.title = songDTO.title;
        song.artists = songDTO.artists;
        song.releasedDate = songDTO.releasedDate;
        song.duration = songDTO.duration;
        song.lyrics = songDTO.lyrics;

        //find all the artist on the based on id
        const artists = await this.artistsRepository.findByIds(songDTO.artists);

        //create relation with artist and song
        song.artists = artists;

        return await this.songsRepository.save(song);
    
    }

    findAll(): Promise<Song[]>{
       return this.songsRepository.find();
    }

    findOne(id: number): Promise<Song>{
        return this.songsRepository.findOneBy({id})
    }

     remove(id:number): Promise<DeleteResult>{
        return this.songsRepository.delete(id);
    }

    update(id:number, recordToUpdate:UpdateSongDTO): Promise<UpdateResult>{
       return this.songsRepository.update(id, recordToUpdate);
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {

        //down lines sort the song by realsed date
        const queryBuilder = this.songsRepository.createQueryBuilder("c");
        queryBuilder.orderBy('c.releasedDate',"DESC");


        return paginate<Song>(queryBuilder,options);
    }
}
