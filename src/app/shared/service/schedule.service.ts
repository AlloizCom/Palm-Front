import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Schedule} from "../models/schedule";

@Injectable()
export class ScheduleService {

  controller = "/schedule";

  constructor(private _httpClient: HttpClient) {
  }

  findAll(): Observable<Schedule[]> {
    return this._httpClient.get<Schedule[]>(this.controller + '/find-all')
      .catch(err => Observable.throw(err));
  }

  findOne(id:number): Observable<Schedule> {
    return this._httpClient.get<Schedule>(this.controller + '/find-one/'+ id )
      .catch(err => Observable.throw(err));
  }

  findAllAvailable(): Observable<Schedule[]> {
    return this._httpClient.get<Schedule[]>(this.controller + '/find-all-available')
      .catch(err => Observable.throw(err));
  }

  findOneAvailable(id:number): Observable<Schedule> {
    return this._httpClient.get<Schedule>(this.controller + '/find-one-available/'+ id);
  }

  save(schedule: Schedule): Observable<Schedule> {
    return this._httpClient.post<Schedule>(this.controller + '/save', JSON.stringify(schedule))
      .catch(err => Observable.throw(err));
  }

  update(schedule: Schedule): Observable<Schedule> {
    return this._httpClient.post<Schedule>(this.controller + '/update', JSON.stringify(schedule))
      .catch(err => Observable.throw(err));
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete(this.controller + '/delete/' + id)
      .catch(err => Observable.throw(err));
  }


}
