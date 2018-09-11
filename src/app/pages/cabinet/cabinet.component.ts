import { Component, OnInit } from '@angular/core';
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit {
  isIn = true;
  constructor(private _translate:TranslateService) {
    this._translate.use('uk');
  }

  ngOnInit() {
  }
  toggleState() { // click handler
    this.isIn = !this.isIn;
  }
}
