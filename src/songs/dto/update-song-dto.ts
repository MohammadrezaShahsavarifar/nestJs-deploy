import { IsArray, IsDateString, IsMilitaryTime, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSongDTO{
    @IsString()
    @IsOptional()
    readonly title:string;

    @IsOptional()
    @IsArray()
    // @IsString({each:true})
    @IsNumber({},{each:true})
    readonly artists;

    @IsDateString()
    @IsOptional()
    readonly releasedDate:Date

    @IsMilitaryTime()
    @IsOptional()
    readonly duration:Date;

    @IsString()
    @IsOptional()
    readonly lyrics: string;

}