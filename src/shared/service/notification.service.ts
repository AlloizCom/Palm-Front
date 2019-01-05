import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {BookCounter} from "../models/book-counter";

@Injectable()
export class NotificationService {

  controller = "/counter";

  constructor(private _httpClient: HttpClient){
  }

  getCount(): Observable<BookCounter>{
    return this._httpClient.get<BookCounter>("/notify");
  }

  resetCounter(): Observable<BookCounter>{
    return this._httpClient.get<BookCounter>("/reset");
  }

  incrementCounter(): Observable<BookCounter>{
    return this._httpClient.get<BookCounter>("/increment");
  }

}
