import {Injectable} from '@angular/core';

@Injectable()
export class CarrentLanguadgeService{
  carrentLanguadge: string='en';

  setCarrentLanguadge(language){
  this.carrentLanguadge = language;
  }
  getCarrentLanguadge(){
  return this.carrentLanguadge;
  }

}
