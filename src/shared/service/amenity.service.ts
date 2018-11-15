import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Amenity} from "../models/amenity";
import {Injectable} from "@angular/core";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class AmenityService {

  controller = "/amenity";

  constructor(private _httpClient: HttpClient){

  }

  findAll(): Observable<Amenity[]>{
    return this._httpClient.get<Amenity[]>(this.controller + '/find-all');
  }

  findAllAvailable(): Observable<Amenity[]>{
    return this._httpClient.get<Amenity[]>(this.controller + '/find-all-available');
  }

  findOne(id: number): Observable<Amenity>{
    return this._httpClient.get<Amenity>(this.controller + '/find-one/' + id);
  }

  findOneAvailable(id: number): Observable<Amenity>{
    return this._httpClient.get<Amenity>(this.controller + '/find-one-available/' + id);
  }

  save(amenityJson: Amenity, form: HTMLFormElement): Observable<Amenity>{
    let f = new FormData(form);
    f.append('amenityJson',JSON.stringify(amenityJson));
    return this._httpClient.post<Amenity>(this.controller + '/save', f, {
      headers: new HttpHeaders().append('enctype', 'multipart/form-data')
    });
  }

  update(amenityJson: Amenity, form: HTMLFormElement): Observable<Amenity>{
    let f = new FormData(form);
    f.append('amenityJson',JSON.stringify(amenityJson));
    return this._httpClient.post<Amenity>(this.controller + '/update', f,{
      headers: new HttpHeaders().append('enctype', 'multipart/form-data')
    });
  }

  updateImage(id: number, form:HTMLFormElement): Observable<Amenity>{
    return this._httpClient.post<Amenity>(this.controller + '/update-image/' + id,
        new FormData(form),{
        headers: new HttpHeaders().append('enctype', 'multipart/form-data')
        });
  }

  delete(id: number): Observable<any>{
    return this._httpClient.delete(this.controller + '/delete/' + id);
  }

}
