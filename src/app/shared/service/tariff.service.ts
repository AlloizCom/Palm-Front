import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Callback} from "../models/callback";
import {Tariff} from "../models/tariff";

@Injectable()
export class TariffService {

  controller = '/tariff'

  constructor(private _httpClient: HttpClient){

  }

  findAll(): Observable<Tariff[]>{
    return this._httpClient.get<Tariff[]>(this.controller + '/find-all')
      .catch(err => Observable.throw(err));
  }

  findAllAvailable(): Observable<Tariff[]>{
    return this._httpClient.get<Tariff[]>(this.controller + '/find-all-available')
      .catch(err => Observable.throw(err));
  }

  findOne(): Observable<Tariff>{
    return this._httpClient.get<Tariff>(this.controller + '/find-one/ + id')
      .catch(err => Observable.throw(err));
  }

  findOneAvailable(): Observable<Tariff>{
    return this._httpClient.get<Tariff>(this.controller + '/find-one-available/ + id')
      .catch(err => Observable.throw(err));
  }

  save(tariff: Tariff): Observable<Tariff>{
    return this._httpClient.post<Tariff>(this.controller + '/save', JSON.stringify(tariff))
      .catch(err => Observable.throw(err));
  }

  update(tariff: Tariff): Observable<Tariff>{
    return this._httpClient.post<Tariff>(this.controller + '/update', JSON.stringify(tariff))
      .catch(err => Observable.throw(err));
  }

  delete(id: number): Observable<any>{
    return this._httpClient.delete(this.controller + '/delete/' + id)
      .catch(err => Observable.throw(err));
  }

}
