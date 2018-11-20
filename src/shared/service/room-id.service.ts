import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RoomIdService {

  id: string;
  private idSource = new Subject<string>();

  constructor() {
  }

  setId(id: string) {
    this.id = id;
  }

}
