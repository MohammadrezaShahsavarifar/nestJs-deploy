import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Playlist } from "src/playlists/playlist.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty({
        example:"John",
        description:"the first name of user"
    })
    @Column()
    firstName: string;

    @ApiProperty({
        example:"Doe",
        description:"the last name of user"
    })
    @Column()
    lastName: string;

    @ApiProperty({
        example:"john@gmail.com",
        description:"the email of user"
    })
    @Column({unique:true})
    email: string;

    @ApiProperty({
        example:"12345",
        description:"the password of user"
    })
    @Column()
    @Exclude() // with this annotation we don't send the password to the client
    password: string;

    @Column({nullable:true,type:"text"})
    twoFASecret: string;

    @Column({default:false,type:"boolean"})
    enable2FA:boolean;

    @Column()
    apiKey:string;

    
    //user can create many playlist
    @OneToMany(()=>Playlist,(playList)=>playList.user)
    playLists:Playlist[];
}