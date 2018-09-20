import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {BookParams} from "../models/book-params";

@Injectable()
export class FindRoomByParamsService{

  private bookParams = new BehaviorSubject(new BookParams());
  currentData = this.bookParams.asObservable();

  constructor(){}

  changeParams(bookParam: BookParams){
    this.bookParams.next(bookParam);
  }

}
