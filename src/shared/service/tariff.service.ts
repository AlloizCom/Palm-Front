import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Tariff} from '../models/tariff';

@Injectable()
export class TariffService {

  controller = '/tariff';

  constructor(private _httpClient: HttpClient) {

  }

  findAll(): Observable<Tariff[]> {
    return this._httpClient.get<Tariff[]>(this.controller + '/find-all');
  }

  findAllAvailable(): Observable<Tariff[]> {
    return this._httpClient.get<Tariff[]>(this.controller + '/find-all-available');
  }

  findOne(id: number): Observable<Tariff> {
    return this._httpClient.get<Tariff>(this.controller + '/find-one/' + id);
  }

  findOneAvailable(id: number): Observable<Tariff> {
    return this._httpClient.get<Tariff>(this.controller + '/find-one-available/' + id);
  }

  findByRoomType(roomType: string): Observable<Tariff[]> {
    return this._httpClient.get<Tariff[]>(this.controller +
      '/find-one-by-room-type/' + roomType);
  }

  findByTariffType(tariffType: string): Observable<Tariff[]> {
    return this._httpClient.get<Tariff[]>(this.controller +
      '/find-one-by-tariff-type/' + tariffType);
  }

  findByTariffTypeAndRoomType(roomType: string, tariffType: string): Observable<Tariff[]> {
    return this._httpClient.get<Tariff[]>(this.controller +
      '/find-one-by-tariff-type-and-room-type/' + roomType + '/room/' + tariffType);
  }

  findRelative(tariffType: string): Observable<Tariff> {
    return this._httpClient.get<Tariff>(this.controller +
      '/find-relative/'
      + tariffType);
  }

  findAllRelative(): Observable<Tariff[]> {
    return this._httpClient.get<Tariff[]>(this.controller + '/find-all-relative');
  }

  save(tariff: Tariff): Observable<Tariff> {
    return this._httpClient.post<Tariff>(this.controller + '/save', JSON.stringify(tariff));
  }

  update(tariff: Tariff): Observable<Tariff> {
    return this._httpClient.post<Tariff>(this.controller + '/update', JSON.stringify(tariff));
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete(this.controller + '/delete/' + id);
  }

}
