import {Injectable} from "@angular/core";
import {RoomsParams} from "../models/rooms-params";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subject} from "rxjs/Subject";

@Injectable()
export class RoomParamsService {

  constructor(){}

  private paramsSource = new Subject<RoomsParams>();

  params : RoomsParams;

  setRoomsParams(params: RoomsParams){
    this.params = params;
    this.paramsSource.next(params);
  }


}
