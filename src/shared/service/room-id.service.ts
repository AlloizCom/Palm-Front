import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {RoomsParams} from "../models/rooms-params";

@Injectable()
export class RoomIdService {

  constructor(){}

  private idSource = new Subject<string>();

  id: string;

  setId(id: string){
    this.id = id;
  }

}
