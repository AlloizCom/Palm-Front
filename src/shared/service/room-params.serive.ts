import {Injectable} from '@angular/core';
import {RoomsParams} from '../models/rooms-params';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RoomParamsService {

  private paramsSource = new Subject<RoomsParams>();

  constructor() {
  }

  private _params: RoomsParams;

  get params() {
    if (!this._params) {
      this._params = {
        adults: 2,
        childrens: 0,
        dateFrom: '05.01.2019',
        dateTo: '06.01.2019',
        numbersOfRooms: 0,
        roomType: 'DELUXE'
      };
    }
    return this._params;
  }

  set params(par) {
    this._params = par;
  }

  setRoomsParams(params: RoomsParams) {
    this.params = params;
    this.paramsSource.next(params);
  }


}
