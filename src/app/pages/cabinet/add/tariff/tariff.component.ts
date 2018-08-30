import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {isNullOrUndefined} from "util";
import {TariffService} from "../../../../shared/service/tariff.service";
import {Tariff} from "../../../../shared/models/tariff";

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.css'],
  providers:[TariffService]
})
export class TariffComponent implements OnInit {


  tariff: Tariff = new Tariff();
  tariffForm: FormGroup;
  roomType: string;
  tariffType: string;

  constructor(private _tariffService: TariffService) {
    this.roomType = 'NONE';
    this.tariffType = 'NONE';
  }

  ngOnInit() {
    this.createTariffForm();
  }


  isNull(object: any): Boolean {
    if (Array.isArray(object)) {
      return !isNullOrUndefined(object[0]);
    } else {
      return !isNullOrUndefined(object);
    }
  }

  changeTariff(value) {
    this.tariffType = value;
  }

  changeRoom(value) {
    this.roomType = value;
  }


  addTariff() {
    this._tariffService.save(this.tariff).subscribe(next => {
        console.log(next);
        this.tariffForm.reset();
      },
      error => {
        console.log(error);
      });
  }




  private createTariffForm() {
    this.tariffForm = new FormGroup({
      price: new FormControl(0, []),
      dateTo: new FormControl(0, []),
      dateFrom: new FormControl(0, [])
    });
    this.tariffForm.valueChanges.subscribe(value => {
      this.tariff = value;
      this.tariff.roomType = this.roomType;
      this.tariff.tariffType = this.tariffType;
      console.log('tariff : ', this.tariff);
    });
  }

}
