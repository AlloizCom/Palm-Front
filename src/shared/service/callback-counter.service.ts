import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {CallbackCounter} from "../models/callback-counter";

@Injectable()
export class CallbackCounterService {

  controller = "/callback-gcounter";

  constructor(private _httpClient: HttpClient){

  }

  getCount(): Observable<CallbackCounter>{
    return this._httpClient.get<CallbackCounter>('/notify-callback')
      .catch(err => Observable.throw(err));
  }

  resetCounter(): Observable<CallbackCounter>{
    return this._httpClient.get<CallbackCounter>('/reset-callback')
      .catch(err => Observable.throw(err));
  }

  incrementCounter(): Observable<CallbackCounter>{
    return this._httpClient.get<CallbackCounter>( '/reset-callback')
      .catch(err => Observable.throw(err));
  }


}
