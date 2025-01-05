import { Injectable } from "@nestjs/common";



@Injectable()
export class DevConfigService {
private DBHOST: string = "localhost";
getDBHOST(){
    return this.DBHOST;
}
}