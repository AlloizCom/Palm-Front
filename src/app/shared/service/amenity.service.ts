import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Amenity} from "../models/amenity";
import {Injectable} from "@angular/core";

@Injectable()
export class AmenityService {

  controller = "/amenity";

  constructor(private _httpClient: HttpClient){

  }

  findAll(): Observable<Amenity[]>{
    return this._httpClient.get<Amenity[]>(this.controller + '/find-all').catch(err => Observable.throw(err));
  }

  findAllAvailable(): Observable<Amenity[]>{
    return this._httpClient.get<Amenity[]>(this.controller + '/find-all-available').catch(err => Observable.throw(err));
  }

  findOne(id: number): Observable<Amenity>{
    return this._httpClient.get<Amenity>(this.controller + '/find-one/' + id).catch(err => Observable.throw(err));
  }

  findOneAvailable(id: number): Observable<Amenity>{
    return this._httpClient.get<Amenity>(this.controller + '/find-one-available/' + id).catch(err => Observable.throw(err));
  }

  save(amenityJson: Amenity, form: HTMLFormElement): Observable<Amenity>{
    let f = new FormData(form);
    f.append('amenityJson',JSON.stringify(amenityJson));
    return this._httpClient.post<Amenity>(this.controller + '/save', f, {
      headers: new HttpHeaders().append('enctype', 'multipart/form-data')
    }).catch(err => Observable.throw(err));
  }

  update(amenityJson: Amenity, form: HTMLFormElement): Observable<Amenity>{
    let f = new FormData(form);
    f.append('amenityJson',JSON.stringify(amenityJson));
    return this._httpClient.post<Amenity>(this.controller + '/update', f,{
      headers: new HttpHeaders().append('enctype', 'multipart/form-data')
    }).catch(err => Observable.throw(err));
  }

  updateImage(id: number, form:HTMLFormElement): Observable<Amenity>{
    return this._httpClient.post<Amenity>(this.controller + '/update-image/' + id,
        new FormData(form),{
        headers: new HttpHeaders().append('enctype', 'multipart/form-data')
        }).catch(err => Observable.throw(err));
  }

  delete(id: number): Observable<any>{
    return this._httpClient.delete(this.controller + '/delete/' + id).catch(err => Observable.throw(err));
  }

}
