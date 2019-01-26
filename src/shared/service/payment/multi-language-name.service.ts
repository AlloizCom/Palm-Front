import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {MultiLanguageName} from '../../models/payment/multi-language-name';


@Injectable()
export class MultiLanguageNameService {

  private _controller = '/payment_MultiLanguageName';

  constructor(private _httpClient: HttpClient) {
  }

  findAll(): Observable<MultiLanguageName[]> {
    return this._httpClient.get<MultiLanguageName[]>(this._controller + '/find-all');
  }

  findOne(id: number): Observable<MultiLanguageName> {
    return this._httpClient.get<MultiLanguageName>(this._controller + '/find-one/' + id);
  }

  findAllAvailable(): Observable<MultiLanguageName[]> {
    return this._httpClient.get<MultiLanguageName[]>(this._controller + '/find-all-available');
  }

  save(multiLanguageName: MultiLanguageName): Observable<MultiLanguageName> {
    return this._httpClient.post<MultiLanguageName>(this._controller + '/save', multiLanguageName);
  }

  update(multiLanguageName: MultiLanguageName): Observable<MultiLanguageName> {
    return this._httpClient.post<MultiLanguageName>(this._controller + '/update', multiLanguageName);
  }

  delete(id: number): Observable<MultiLanguageName> {
    return this._httpClient.delete<MultiLanguageName>(this._controller + '/delete/' + id);
  }
}
