import {Observable} from 'rxjs/Observable';
import {Callback} from '../models/callback';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CallbackByPage} from '../models/callback-by-page';

@Injectable()
export class CallbackService {

  controller = '/callback';

  constructor(private _httpClient: HttpClient) {

  }

  findAll(): Observable<Callback[]> {
    return this._httpClient.get<Callback[]>(this.controller + '/find-all');
  }

  findAllAvailable(): Observable<Callback[]> {
    return this._httpClient.get<Callback[]>(this.controller + '/find-all-available');
  }

  findOne(id: number): Observable<Callback> {
    return this._httpClient.get<Callback>(this.controller + '/find-one/' + id);
  }

  findOneAvailable(id: number): Observable<Callback> {
    return this._httpClient.get<Callback>(this.controller + '/find-one-available/' + id);
  }

  save(callback: Callback): Observable<Callback> {
    return this._httpClient.post<Callback>(this.controller + '/save', JSON.stringify(callback));
  }

  update(callback: Callback): Observable<Callback> {
    return this._httpClient.post<Callback>(this.controller + '/update', JSON.stringify(callback));
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete(this.controller + '/delete/' + id);
  }

  findAllCallbacksByPage(page: number, count: number): Observable<Callback[]> {
    return this._httpClient.get<Callback[]>
    (this.controller + '/find-all-callbacks-by-page/' + page + '/' + count);
  }

  findAllAvailableCallbacksByPage(page: number, count: number): Observable<CallbackByPage> {
    return this._httpClient.get<CallbackByPage>
    (this.controller + '/find-all-callbacks-by-page-available/' + page + '/' + count);
  }

}
