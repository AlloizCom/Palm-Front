import {Injectable} from '@angular/core';
import {RoomsParams} from '../models/rooms-params';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RoomParamsService {

  params: RoomsParams;
  private paramsSource = new Subject<RoomsParams>();

  constructor() {
  }

  setRoomsParams(params: RoomsParams) {
    this.params = params;
    this.paramsSource.next(params);
  }


}
