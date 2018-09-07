import {Injectable} from "@angular/core";
import {RoomsParams} from "../models/rooms-params";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class RoomParamsService {

  constructor(){}

  private paramsSource = new BehaviorSubject(new RoomsParams());
  currentRoomsParams = this.paramsSource.asObservable();

  setRoomsParams(params: RoomsParams){
    this.paramsSource.next(params);
  }


}
