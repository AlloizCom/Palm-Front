import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Proposal} from "../models/proposal";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class ProposalService {

  controller = '/proposal';

  constructor(private _httpClient: HttpClient){

  }

  findAll(): Observable<Proposal[]>{
    return this._httpClient.get<Proposal[]>(this.controller + '/find-all')
      .catch(err => Observable.throw(err));
  }

  findAllAvailable(): Observable<Proposal[]>{
    return this._httpClient.get<Proposal[]>(this.controller + '/find-all-available')
      .catch(err => Observable.throw(err));
  }

  findOne(id: number): Observable<Proposal>{
    return this._httpClient.get<Proposal>(this.controller + '/find-one/' + id)
      .catch(err => Observable.throw(err));
  }

  findOneAvailable(id: number): Observable<Proposal>{
    return this._httpClient.get<Proposal>(this.controller + '/find-one-available/' + id)
      .catch(err => Observable.throw(err));
  }

 save(proposalJson: Proposal, form: HTMLFormElement): Observable<Proposal>{
    let f = new FormData(form);
    f.append('proposalJson', JSON.stringify(proposalJson));
    return this._httpClient.post<Proposal>(this.controller + '/save', f,{
      headers: new HttpHeaders().append('enctype','multipart/form-data')
    }).catch(err => Observable.throw(err));
 }

  update(proposalJson: Proposal, form: HTMLFormElement): Observable<Proposal>{
    let f = new FormData(form);
    f.append('proposalJson', JSON.stringify(proposalJson));
    return this._httpClient.post<Proposal>(this.controller + '/update', f,{
      headers: new HttpHeaders().append('enctype','multipart/form-data')
    }).catch(err => Observable.throw(err));
  }

  delete(id: number): Observable<any>{
    return this._httpClient.delete(this.controller + '/delete/' + id)
      .catch(err => Observable.throw(err));
  }

}
