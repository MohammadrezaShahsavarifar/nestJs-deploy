import { EntityManager } from "typeorm";
import { v4 as uuid4} from "uuid";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/user.entity";
import { faker } from "@faker-js/faker";
import { Artist } from "src/artists/artist.entity";
import { Playlist } from "src/playlists/playlist.entity";

export const seedData = async(manager:EntityManager):Promise<void>=>{

//Adding seeding logic here using the manager

await seedUser();
await seedArtist();
await seedPlayLists();
// await seedSongs();

async function seedUser(){
const salt = await bcrypt.genSalt();
const hashedPassword = await bcrypt.hash("12345",salt);

const user = new User();
user.firstName = faker.person.firstName();
user.lastName = faker.person.lastName();
user.email = faker.internet.email();
user.password = hashedPassword;
user.apiKey = uuid4();

await manager.getRepository(User).save(user);
}

async function seedArtist(){

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash("12345",salt);
    
    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = hashedPassword;
    user.apiKey = uuid4()

const artist = new Artist();
artist.user = user;
await manager.getRepository(User).save(user);
await manager.getRepository(Artist).save(artist);

}

async function seedPlayLists(){
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash("12345",salt);
    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = hashedPassword;
    user.apiKey = uuid4();

    const playList = new Playlist();
    playList.name = faker.music.songName();
    playList.user = user;
    
    await manager.getRepository(User).save(user);
    await manager.getRepository(Playlist).save(playList);
}

// async function seedSongs(){}

}