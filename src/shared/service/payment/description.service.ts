import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Description} from '../../models/payment/description';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DescriptionService {

  private _controller = '/payment_description';

  constructor(private _httpClient: HttpClient) {
  }

  findAll(): Observable<Description[]> {
    return this._httpClient.get<Description[]>(this._controller + '/find-all');
  }

  findOne(id: number): Observable<Description> {
    return this._httpClient.get<Description>(this._controller + '/find-one/' + id);
  }

  findAllAvailable(): Observable<Description[]> {
    return this._httpClient.get<Description[]>(this._controller + '/find-all-available');
  }

  save(description: Description): Observable<Description> {
    return this._httpClient.post<Description>(this._controller + '/save', description);
  }

  update(description: Description): Observable<Description> {
    return this._httpClient.post<Description>(this._controller + '/update', description);
  }

  delete(id: number): Observable<Description> {
    return this._httpClient.delete<Description>(this._controller + '/delete/' + id);
  }
}
