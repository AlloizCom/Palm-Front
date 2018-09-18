import {Component, OnInit} from '@angular/core';
import {MenuComponent} from '../../menu/menu.component';
import {Service} from '../../../../../shared/models/service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  middleIndex: number;
  middleIndex2: number;
  middleIndex3: number;
  screenWidth: number = 0;


  services: Service[] = [];

  constructor(private _menuComponent: MenuComponent) {

    this.services = _menuComponent.services;
    console.log(this.services);
    this.middleIndex = Math.round(this.services.length / 8);
    this.middleIndex2 = this.middleIndex + 1;
    this.middleIndex3 = this.middleIndex + 2;
  }


  scroll(event) {
    if (this.middleIndex > 0 && this.middleIndex != this.services.length - 1) {
      event ? this.middleIndex -= 1 : this.middleIndex += 1;
    } else if (this.middleIndex == 0 && event == false) {
      this.middleIndex += 1;
    } else if (this.middleIndex == this.services.length - 1 && event == true) {
      this.middleIndex -= 1;
    } else if (this.middleIndex == this.services.length - 1 && event == false) {
      this.middleIndex = 0;
    } else if (this.middleIndex == 0 && event == true) {
      this.middleIndex = this.services.length - 1;
    }

    if (this.middleIndex2 > 0 && this.middleIndex2 != this.services.length - 1) {
      event ? this.middleIndex2 -= 1 : this.middleIndex2 += 1;
    } else if (this.middleIndex2 == 0 && event == false) {
      this.middleIndex2 += 1;
    } else if (this.middleIndex2 == this.services.length - 1 && event == true) {
      this.middleIndex2 -= 1;
    } else if (this.middleIndex2 == this.services.length - 1 && event == false) {
      this.middleIndex2 = 0;
    } else if (this.middleIndex2 == 0 && event == true) {
      this.middleIndex2 = this.services.length - 1;
    }

    if (this.middleIndex3 > 0 && this.middleIndex3 != this.services.length - 1) {
      event ? this.middleIndex3 -= 1 : this.middleIndex3 += 1;
    } else if (this.middleIndex3 == 0 && event == false) {
      this.middleIndex3 += 1;
    } else if (this.middleIndex3 == this.services.length - 1 && event == true) {
      this.middleIndex3 -= 1;
    } else if (this.middleIndex3 == this.services.length - 1 && event == false) {
      this.middleIndex3 = 0;
    } else if (this.middleIndex3 == 0 && event == true) {
      this.middleIndex3 = this.services.length - 1;
    }
  }


  ngOnInit() {
  }


}
