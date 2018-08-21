import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Service} from "../models/service";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class ServiceService {

  controller = '/service';

  constructor(protected _httpClient: HttpClient){

  }

  findAll(): Observable<Service[]> {
    return this._httpClient.get<Service[]>(this.controller + '/find-all')
      .catch(err => Observable.throw(err));
  }

  findAllAvailable(): Observable<Service[]> {
    return this._httpClient.get<Service[]>(this.controller + '/find-all-available')
      .catch(err => Observable.throw(err));
  }

  findOne(id: number): Observable<Service> {
    return this._httpClient.get<Service>(this.controller + '/find-one/' + id)
      .catch(err => Observable.throw(err));
  }

  findOneAvailable(id: number): Observable<Service> {
    return this._httpClient.get<Service>(this.controller + '/find-one-available/' + id)
      .catch(err => Observable.throw(err));
  }

  save(serviceJson: Service, form: HTMLFormElement): Observable<Service> {
    let f = new FormData(form);
    f.append('serviceJson', JSON.stringify(serviceJson));
    return this._httpClient.post<Service>(this.controller + '/save', f, {
      headers: new HttpHeaders().append('enctype', 'multipart/form-data')
    }).catch(err => Observable.throw(err));
  }

  update(serviceJson: Service, form: HTMLFormElement): Observable<Service> {
    let f = new FormData(form);
    f.append('serviceJson', JSON.stringify(serviceJson));
    return this._httpClient.post<Service>(this.controller + '/update', f, {
      headers: new HttpHeaders().append('enctype', 'multipart/form-data')
    }).catch(err => Observable.throw(err));
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete(this.controller + '/delete')
      .catch(err => Observable.throw(err));
  }

}
