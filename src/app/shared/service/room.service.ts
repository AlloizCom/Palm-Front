import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Amenity} from "../models/amenity";
import {Observable} from "rxjs/Observable";
import {Room} from "../models/room";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class RoomService{

  controller = "/room";

  constructor(private _httpClient: HttpClient){

  }

  findAll(): Observable<Room[]>{
    return this._httpClient.get<Room[]>(this.controller + '/find-all')
          .catch(err => Observable.throw(err));
  }

  findAllAvailable(): Observable<Room[]>{
    return this._httpClient.get<Room[]>(this.controller + '/find-all-available')
          .catch(err => Observable.throw(err));
  }

  findOne(id: number): Observable<Room>{
    return this._httpClient.get<Room>(this.controller + '/find-one/' + id)
          .catch(err => Observable.throw(err));
  }

  findOneAvailable(id: number): Observable<Room>{
    return this._httpClient.get<Room>(this.controller + '/find-one-available/' + id)
          .catch(err => Observable.throw(err));
  }

  save(roomJson: Room,form: HTMLFormElement): Observable<Room>{
    let f = new FormData(form);
    f.append('roomJson',JSON.stringify(roomJson));
    return this._httpClient.post<Room>(this.controller + '/save',f,{
      headers: new HttpHeaders().append('enctype','multipart/form-data')
    }).catch(err => Observable.throw(err));
  }

  update(roomJson: Room,form: HTMLFormElement): Observable<Room>{
    let f = new FormData(form);
    f.append('roomJson',JSON.stringify(roomJson));
    return this._httpClient.post<Room>(this.controller + '/update',f,{
      headers: new HttpHeaders().append('enctype','multipart/form-data')
    }).catch(err => Observable.throw(err));
  }

  addImage(roomId: number,form: HTMLFormElement): Observable<any>{
    return this._httpClient.post(this.controller + '/add-image/' +roomId,
        new FormData(form),{
        headers: new HttpHeaders().append('enctype','multipart/form-data')
      }).catch(err => Observable.throw(err));
  }

  changeAmount(roomType: string, amount: number): Observable<any>{
    return this._httpClient.get(this.controller + '/change-amount/' + roomType + '/amount/' + amount);
  }

  deleteImage(roomId: number, imageId: number): Observable<any>{
    return this._httpClient.delete(this.controller + '/delete-image/' + roomId + '/image/' + imageId);
  }

  delete(id: number): Observable<any>{
    return this._httpClient.delete(this.controller + '/delete/' + id);
  }
}
