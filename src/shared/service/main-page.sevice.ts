import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {MainPage} from '../models/main-page';

@Injectable()
export class MainPageSevice {

  controller = '/main-page';

  constructor(private _httpClient: HttpClient) {

  }

  findAll(): Observable<MainPage[]> {
    return this._httpClient.get<MainPage[]>(this.controller + '/find-all')
      .catch(err => Observable.throw(err));
  }

  findAllAvailable(): Observable<MainPage[]> {
    return this._httpClient.get<MainPage[]>(this.controller + '/find-all-available')
      .catch(err => Observable.throw(err));
  }

  findOne(id: number): Observable<MainPage> {
    return this._httpClient.get<MainPage>(this.controller + '/find-one/' + id)
      .catch(err => Observable.throw(err));
  }

  findOneAvailable(id: number): Observable<MainPage> {
    return this._httpClient.get<MainPage>(this.controller + '/find-one-available/' + id)
      .catch(err => Observable.throw(err));
  }

  save(mainPageJson: MainPage, form: HTMLFormElement): Observable<MainPage> {
    let f = new FormData(form);
    f.append('mainPageJson', JSON.stringify(mainPageJson));
    return this._httpClient.post<MainPage>(this.controller + '/save', f, {
      headers: new HttpHeaders().append('enctype', 'multipart/form-data')
    }).catch(err => Observable.throw(err));
  }

  update(mainPageJson: MainPage, form: HTMLFormElement): Observable<MainPage> {
    let f = new FormData(form);
    f.append('mainPageJson', JSON.stringify(mainPageJson));
    return this._httpClient.post<MainPage>(this.controller + '/update', f, {
      headers: new HttpHeaders().append('enctype', 'multipart/form-data')
    }).catch(err => Observable.throw(err));
  }

  addImage(mainPageId: number, form: HTMLFormElement): Observable<any> {
    return this._httpClient.post(this.controller + '/add-image/' + mainPageId,
      new FormData(form), {
        headers: new HttpHeaders().append('enctype', 'multipart/form-data')
      }).catch(err => Observable.throw(err));
  }

  deleteImage(mainPageId: number, imageId: number): Observable<any> {
    return this._httpClient.delete(this.controller + '/delete-image/' + mainPageId + '/image/' + imageId);
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete(this.controller + '/delete/' + id);
  }
}
