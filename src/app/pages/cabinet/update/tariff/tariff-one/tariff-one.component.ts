import { Component, OnInit } from '@angular/core';
import {Tariff} from "../../../../../shared/models/tariff";
import {ActivatedRoute} from "@angular/router";
import {TariffService} from "../../../../../shared/service/tariff.service";

@Component({
  selector: 'app-tariff-one',
  templateUrl: './tariff-one.component.html',
  styleUrls: ['./tariff-one.component.css'],
  providers:[TariffService]
})
export class TariffOneComponent implements OnInit {

  tariff: Tariff = new Tariff();
  constructor(private _router: ActivatedRoute,private _tariffService: TariffService) {
    _router.params.subscribe(next=>{
      _tariffService.findOne(next['id']).subscribe(next=>{
        this.tariff=next;
      })
    })
  }


  ngOnInit() {
  }

  update(form:HTMLFormElement){
    console.log(this.tariff);
    this._tariffService.update(this.tariff).subscribe(next=>{
      this.tariff=next;
    },error=>{
      console.log(error);
    })
  }

}
