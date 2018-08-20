import {Observable} from "rxjs/Observable";
import {Callback} from "../models/callback";
import {HttpClient} from "@angular/common/http";

export class CallbackService {

  controller = "/callback";

  constructor(private _httpClient: HttpClient){

  }

  findAll(): Observable<Callback[]>{
    return this._httpClient.get<Callback[]>(this.controller + '/find-all')
      .catch(err => Observable.throw(err));
  }

  findAllAvailable(): Observable<Callback[]>{
    return this._httpClient.get<Callback[]>(this.controller + '/find-all-available')
      .catch(err => Observable.throw(err));
  }

  findOne(): Observable<Callback>{
    return this._httpClient.get<Callback>(this.controller + '/find-one/ + id')
      .catch(err => Observable.throw(err));
  }

  findOneAvailable(): Observable<Callback>{
    return this._httpClient.get<Callback>(this.controller + '/find-one-available/ + id')
      .catch(err => Observable.throw(err));
  }

  save(callback: Callback): Observable<Callback>{
    return this._httpClient.post<Callback>(this.controller + '/save', JSON.stringify(callback))
      .catch(err => Observable.throw(err));
  }

  update(callback: Callback): Observable<Callback>{
    return this._httpClient.post<Callback>(this.controller + '/update', JSON.stringify(callback))
      .catch(err => Observable.throw(err));
  }

  delete(id: number): Observable<any>{
    return this._httpClient.delete(this.controller + '/delete/' + id)
      .catch(err => Observable.throw(err));
  }


}
