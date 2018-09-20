import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {BookCounter} from "../models/book-counter";

@Injectable()
export class NotificationService {

  constructor(private _httpClient: HttpClient){
  }

  getCount(): Observable<BookCounter>{
    return this._httpClient.get<BookCounter>("/notify")
      .catch(err => Observable.throw(err));
  }

}
