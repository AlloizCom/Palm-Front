import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Schedule} from '../models/schedule';
import {ScheduleByPage} from '../models/schedule-by-page';
import {ChangeRoomForSale} from '../models/change-room-for-sale';

@Injectable()
export class ScheduleService {

  controller = '/schedule';

  constructor(private _httpClient: HttpClient) {
  }

  findAll(): Observable<Schedule[]> {
    return this._httpClient.get<Schedule[]>(this.controller + '/find-all');
  }

  findOne(id: number): Observable<Schedule> {
    return this._httpClient.get<Schedule>(this.controller + '/find-one/' + id);
  }

  findAllAvailable(): Observable<Schedule[]> {
    return this._httpClient.get<Schedule[]>(this.controller + '/find-all-available');
  }

  findAllArchived(): Observable<Schedule[]> {
    return this._httpClient.get<Schedule[]>(this.controller + '/find-all-archived');
  }

  findOneAvailable(id: number): Observable<Schedule> {
    return this._httpClient.get<Schedule>(this.controller + '/find-one-available/' + id);
  }

  /**
   *
   * @param {number} page
   * @param {number} count
   * @returns {Observable<Schedule[]>}
   */
  findAllScheduleByPage(page: number, count: number): Observable<Schedule[]> {
    return this._httpClient.get<Schedule[]>
    (this.controller + '/find-all-schedule-by-page/' + page + '/' + count);
  }

  findAllScheduleByTypeFromDate(date: string, type: string): Observable<Schedule[]> {
    return this._httpClient.get<Schedule[]>
    (this.controller + '/find-all-schedule-by-date-type', {params: new HttpParams().set('date', date).set('type', type)});
  }

  /**
   *
   * @param {number} page
   * @param {number} count
   * @returns {Observable<ScheduleByPage>}
   */
  findAllAvailableScheduleByPage(page: number, count: number): Observable<ScheduleByPage> {
    return this._httpClient.get<ScheduleByPage>
    (this.controller + '/find-all-schedule-by-page-available/' + page + '/' + count);
  }

  save(schedule: Schedule): Observable<Schedule> {
    return this._httpClient.post<Schedule>(this.controller + '/save', JSON.stringify(schedule));
  }

  update(schedule: Schedule): Observable<Schedule> {
    return this._httpClient.post<Schedule>(this.controller + '/update', JSON.stringify(schedule));
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete(this.controller + '/delete/' + id);
  }

  changeRoomForSale(params: ChangeRoomForSale): Observable<any> {
    return this._httpClient.post<ChangeRoomForSale>(this.controller + '/change-room-for-sale', JSON.stringify(params));
  }

}
