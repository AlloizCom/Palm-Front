import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Client} from '../../models/payment/client';


@Injectable()
export class ClientService {

  private _controller = '/payment_client';

  constructor(private _httpClient: HttpClient) {
  }

  findAll(): Observable<Client[]> {
    return this._httpClient.get<Client[]>(this._controller + '/find-all');
  }

  findOne(id: number): Observable<Client> {
    return this._httpClient.get<Client>(this._controller + '/find-one/' + id);
  }

  findAllAvailable(): Observable<Client[]> {
    return this._httpClient.get<Client[]>(this._controller + '/find-all-available');
  }

  save(Client: Client): Observable<Client> {
    return this._httpClient.post<Client>(this._controller + '/save', Client);
  }

  update(Client: Client): Observable<Client> {
    return this._httpClient.post<Client>(this._controller + '/update', Client);
  }

  delete(id: number): Observable<Client> {
    return this._httpClient.delete<Client>(this._controller + '/delete/' + id);
  }
}
