import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { authConstanst } from "./auth-constants";
import { PayloadType } from "./types";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
   constructor(){
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: process.env.SECRET
    })
   } 

   async validate(payload:PayloadType){ // this validate method aplly when using authGuard
    return{
        userId:payload.userId,
        email:payload.email,
        artistId:payload.artistId
        }
   }
}