import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Language} from '../enum/language';

@Injectable()
export class CurrentLanguageService {
  private _currentLanguage: Language = 'uk';

  get currentLanguage(): Language {
    return this._currentLanguage;
  }

  set currentLanguage(language: Language) {
    this._currentLanguage = language;
  }

  private _currentLanguage$: Subject<Language> = new Subject();

  get currentLanguage$(): Observable<Language> {
    return this._currentLanguage$.asObservable();
  }

}
