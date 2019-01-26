import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Room} from '../../models/payment/room';
import {RoomType} from '../../models/room-type';

@Injectable()
export class RoomService {

  private _controller = '/payment_room';

  constructor(private _httpClient: HttpClient) {
  }

  findAll(): Observable<Room[]> {
    return this._httpClient.get<Room[]>(this._controller + '/find-all');
  }

  findAllByType(type: RoomType): Observable<Room[]> {
    return this._httpClient.get<Room[]>(this._controller + '/find-all-by-type/' + type);
  }

  findOne(id: number): Observable<Room> {
    return this._httpClient.get<Room>(this._controller + '/find-one/' + id);
  }

  findAllAvailable(): Observable<Room[]> {
    return this._httpClient.get<Room[]>(this._controller + '/find-all-available');
  }

  save(room: Room): Observable<Room> {
    return this._httpClient.post<Room>(this._controller + '/save', room);
  }

  update(room: Room): Observable<Room> {
    return this._httpClient.post<Room>(this._controller + '/update', room);
  }

  delete(id: number): Observable<Room> {
    return this._httpClient.delete<Room>(this._controller + '/delete/' + id);
  }
}
