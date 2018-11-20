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
    return this._httpClient.get<Proposal[]>(this.controller + '/find-all');
  }

  findAllAvailable(): Observable<Proposal[]>{
    return this._httpClient.get<Proposal[]>(this.controller + '/find-all-available');
  }

  findOne(id: number): Observable<Proposal>{
    return this._httpClient.get<Proposal>(this.controller + '/find-one/' + id);
  }

  findOneAvailable(id: number): Observable<Proposal>{
    return this._httpClient.get<Proposal>(this.controller + '/find-one-available/' + id);
  }

 save(proposalJson: Proposal, form: HTMLFormElement): Observable<Proposal>{
    console.log(proposalJson);
    let f = new FormData(form);
    f.append('proposalJson', JSON.stringify(proposalJson));
    return this._httpClient.post<Proposal>(this.controller + '/save', f,{
      headers: new HttpHeaders().append('enctype','multipart/form-data')
    });
 }

  update(proposalJson: Proposal, form: HTMLFormElement): Observable<Proposal>{
    let f = new FormData(form);
    f.append('proposalJson', JSON.stringify(proposalJson));
    return this._httpClient.post<Proposal>(this.controller + '/update', f,{
      headers: new HttpHeaders().append('enctype','multipart/form-data')
    });
  }

  delete(id: number): Observable<any>{
    return this._httpClient.delete(this.controller + '/delete/' + id);
  }

}
