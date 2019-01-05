import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Room} from '../models/room';
import {RoomWithPrice} from '../models/room-with-price';
import {RoomsParams} from '../models/rooms-params';

@Injectable()
export class RoomService {

  controller = '/room';

  constructor(private _httpClient: HttpClient) {

  }

  findAll(): Observable<Room[]> {
    return this._httpClient.get<Room[]>(this.controller + '/find-all');
  }

  findAllAvailable(): Observable<Room[]> {
    return this._httpClient.get<Room[]>(this.controller + '/find-all-available');
  }

  findAllAvailableSplit(): Observable<Room[]> {
    return this._httpClient.get<Room[]>(this.controller + '/find-all-available-split');
  }

  findRoomByParams(roomParams: RoomsParams): Observable<RoomWithPrice[]> {
    return this._httpClient.post<RoomWithPrice[]>(this.controller + '/find-by-book-params',
      JSON.stringify(roomParams));
  }

  findRoomByParamsWithRoomType(roomParams: RoomsParams): Observable<RoomWithPrice[]> {
    return this._httpClient.post<RoomWithPrice[]>(this.controller + '/find-by-book-params-with-room-type',
      JSON.stringify(roomParams));
  }

  findAllByAdultPlacesAndKidsPlacesAndAvailable(kidsPlaces: number,
                                                adultPlaces: number):
    Observable<Room[]> {
    return this._httpClient.get<Room[]>(this.controller + '/find-all-available-kids-adult/'
      + kidsPlaces + '/' + adultPlaces);
  }

  // findAllByAdultPlacesAndKidsPlacesAndAmountAndAvailable(kidsPlaces: number,
  //                                                        adultPlaces: number,
  //                                                        amount: number):
  //   Observable<Room[]>{
  //   return this._httpClient.get<Room[]>(this.controller + '/find-all-available-kids-adult-amount/'
  //     + kidsPlaces + '/' + adultPlaces + '/' + amount)
  //    ;
  // }

  findAllByAdultPlacesAndKidsPlacesAndAmountAndAvailable(kidsPlaces: number,
                                                         adultPlaces: number,
                                                         amount: number):
    Observable<Room[]> {
    return this._httpClient.get<Room[]>
    (this.controller + '/find-all-available-kids-adult-amount/'
      + kidsPlaces + '/' + adultPlaces + '/' + amount);
  }

  findAllOnlyWithImages(): Observable<Room[]> {
    return this._httpClient.get<Room[]>(this.controller + '/find-all-only-with-images');
  }

  findAllAvailableOnlyWithImages(): Observable<Room[]> {
    return this._httpClient.get<Room[]>(this.controller + '/find-all-available-only-with-images');
  }

  findOne(id: number): Observable<Room> {
    return this._httpClient.get<Room>(this.controller + '/find-one/' + id);
  }

  findOneAvailable(id: number): Observable<Room> {
    return this._httpClient.get<Room>(this.controller + '/find-one-available/' + id);
  }

  /**
   *
   * @param {number} id
   * @returns {Observable<Room>}
   */
  findOneAvailableWithPrice(id: number): Observable<Room> {
    console.log(id);
    return this._httpClient.get<Room>
    (this.controller + '/find-one-with-price/' + id);
  }

  save(roomJson: Room, form: HTMLFormElement): Observable<Room> {
    let f = new FormData(form);
    f.append('roomJson', JSON.stringify(roomJson));
    return this._httpClient.post<Room>(this.controller + '/save', f, {
      headers: new HttpHeaders().append('enctype', 'multipart/form-data')
    });
  }

  update(roomJson: Room, form?: HTMLFormElement): Observable<Room> {
    let f = form ? new FormData(form) : new FormData();
    f.append('roomJson', JSON.stringify(roomJson));
    return this._httpClient.post<Room>(this.controller + '/update', f, {
      headers: new HttpHeaders().append('enctype', 'multipart/form-data')
    });
  }

  addImage(roomId: number, form: HTMLFormElement): Observable<any> {
    return this._httpClient.post(this.controller + '/add-images/' + roomId,
      new FormData(form), {
        headers: new HttpHeaders().append('enctype', 'multipart/form-data')
      });
  }

  changeAmount(roomType: string, amount: number): Observable<any> {
    return this._httpClient.get(this.controller + '/change-amount/' + roomType + '/amount/' + amount);
  }

  deleteImage(roomId: number, imageId: number): Observable<any> {
    return this._httpClient.delete(this.controller + '/delete-image/' + roomId + '/image/' + imageId);
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete(this.controller + '/delete/' + id);
  }

  findAllRoomWithPrice(): Observable<RoomWithPrice[]> {
    return this._httpClient.get<RoomWithPrice[]>(this.controller + '/find-room-with-price');
  }
}
