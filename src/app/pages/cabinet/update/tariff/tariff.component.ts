import { Component, OnInit } from '@angular/core';
import {Tariff} from "../../../../../shared/models/tariff";
import {TariffService} from "../../../../../shared/service/tariff.service";

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.css'],
  providers:[TariffService]
})
export class TariffComponent implements OnInit {
  tariff: Tariff[]=[];
  constructor(private _tariffService:TariffService) {
    _tariffService.findAll().subscribe(next=>{
        this.tariff=next;
      }
    )
  }

  deleteTariff(i){
    this._tariffService.delete(i).subscribe(next =>{
      this._tariffService.findAll().subscribe(value => {
        this.tariff = value;
        console.log(value);
      });
    }), error => {
      console.log(error);
    }
  }


  ngOnInit() {
  }

}
