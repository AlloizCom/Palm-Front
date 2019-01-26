import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Language} from '../../models/payment/language';
import {of} from 'rxjs/internal/observable/of';
import {tap} from 'rxjs/operators';

@Injectable()
export class LanguageService {

  private _controller = '/payment_language';

  private cached: Language[] = [];

  constructor(private _httpClient: HttpClient) {
  }

  findAll(): Observable<Language[]> {
    if (this.cached.length == 0)
      return this._httpClient.get<Language[]>(this._controller + '/find-all').pipe(tap(x => this.cached = x));
    return of(this.cached);
  }

  findOne(id: number): Observable<Language> {
    return this._httpClient.get<Language>(this._controller + '/find-one/' + id);
  }

  findAllAvailable(): Observable<Language[]> {
    return this._httpClient.get<Language[]>(this._controller + '/find-all-available');
  }

  save(language: Language): Observable<Language> {
    return this._httpClient.post<Language>(this._controller + '/save', language);
  }

  update(language: Language): Observable<Language> {
    return this._httpClient.post<Language>(this._controller + '/update', language);
  }

  delete(id: number): Observable<Language> {
    return this._httpClient.delete<Language>(this._controller + '/delete/' + id);
  }
}
