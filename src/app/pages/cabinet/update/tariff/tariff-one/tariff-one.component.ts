import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TariffService} from "../../../../../../shared/service/tariff.service";
import {FormControl, FormGroup,Validators} from "@angular/forms";

@Component({
  selector: 'app-tariff-one',
  templateUrl: './tariff-one.component.html',
  styleUrls: ['./tariff-one.component.css'],
  providers: [TariffService]
})
export class TariffOneComponent implements OnInit {

  tariffForm: FormGroup;
  id: number = 0;

  constructor(private _route: Router, private _router: ActivatedRoute, private _tariffService: TariffService) {
    _router.params.subscribe(next => {
      this.id = next['id'];
    });
  }


  ngOnInit() {
    this.tariffForm = new FormGroup({
      id: new FormControl(),
      available: new FormControl(),
      tariffType: new FormControl('',[Validators.required,Validators.min(1)]),
      price: new FormControl('',[Validators.required]),
      dateFrom: new FormControl('',[Validators.required]),
      dateTo: new FormControl('',[Validators.required]),
      roomType: new FormControl('',[Validators.required])
    });
    this._tariffService.findOne(this.id).subscribe(next=>{
      console.log(next);
      this.tariffForm.patchValue(<any>next);
    },err=>{
      console.error(err);
    });
  }

  update() {
    console.log(this.tariffForm.getRawValue());
    this._tariffService.update(this.tariffForm.getRawValue()).subscribe(next => {
      this.tariffForm.patchValue(<any>next);
      alert("Тариф оновлено");
      this._route.navigateByUrl("/cabinet/update/tariff");
    }, error => {
      console.error(error);
    })
  }

}
