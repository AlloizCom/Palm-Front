import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Service} from '../models/service';

@Injectable()
export class ServiceService {

  controller = '/service';

  constructor(protected _httpClient: HttpClient) {

  }

  findAll(): Observable<Service[]> {
    return this._httpClient.get<Service[]>(this.controller + '/find-all');
  }

  findAllAvailable(): Observable<Service[]> {
    return this._httpClient.get<Service[]>(this.controller + '/find-all-available');
  }

  findOne(id: number): Observable<Service> {
    return this._httpClient.get<Service>(this.controller + '/find-one/' + id);
  }

  findOneAvailable(id: number): Observable<Service> {
    return this._httpClient.get<Service>(this.controller + '/find-one-available/' + id);
  }

  save(serviceJson: Service, form: HTMLFormElement): Observable<Service> {
    let f = new FormData(form)
      .append('serviceJson', JSON.stringify(serviceJson));
    return this._httpClient.post<Service>(this.controller + '/save', f, {
      headers: new HttpHeaders().append('enctype', 'multipart/form-data')
    });
  }

  update(serviceJson: Service, form: HTMLFormElement): Observable<Service> {
    let f = new FormData(form);
    f.append('serviceJson', JSON.stringify(serviceJson));
    return this._httpClient.post<Service>(this.controller + '/update', f, {
      headers: new HttpHeaders().append('enctype', 'multipart/form-data')
    });
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete(this.controller + '/delete/' + id);
  }

}
