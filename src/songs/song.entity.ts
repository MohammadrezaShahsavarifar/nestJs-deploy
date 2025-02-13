import { Artist } from "src/artists/artist.entity";
import { Playlist } from "src/playlists/playlist.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("songs")
export class Song{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    // @Column("varchar',{
    //     array:true
    // })
    // artists:string[];

    @Column("date")
    releasedDate:Date;

    @Column("time")
    duration:Date;

    @Column("text")
    lyrics:string;


    @ManyToMany(()=>Artist,(artist)=>artist.songs,{cascade:true})
    @JoinTable({name:"songs_artists"})
    artists:Artist[];


    //many song can blong to playlist
    @ManyToOne(()=>Playlist,(playList)=>playList.songs)
    playList:Playlist
}
