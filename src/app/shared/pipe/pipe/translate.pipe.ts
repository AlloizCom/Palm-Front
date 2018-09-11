import {Pipe, PipeTransform} from "@angular/core";
import {TranslateService} from "ng2-translate";
import {Subscription} from "rxjs/Subscription";

@Pipe({
  name: 'customtranslate',
  pure: false
})
export class TranslatePipe implements PipeTransform {

  private retVal: any = null;
  private cache: any[] = [];
  private subs = new Map();

  constructor(private _translate: TranslateService) {
  }

  transform(value: any[], args?: any): any {
    if (this.cache !== value) {
      this.cache = value;
      this.retVal = value.find(value1 => value1.language == this._translate.currentLang.toUpperCase());
      this.subs.set(
        value,
        this._translate.onLangChange.subscribe(next => {
          this.retVal = value.find(value1 => value1.language == next.lang.toUpperCase());
          console.warn('some');
        }));
    }
    return this.retVal;
  }

}

class Map {
  private values: Tuple[] = [];

  get(key: any): any {
    return this.values.find(value => value.key === key);
  }

  set(key: any, value: any) {
    console.log(this.get(key));
    console.log(key);
    if (this.get(key)) {
      let index = this.values.findIndex(value1 => value1.key === key);
      this.values[index].value.unsubscribe();
      this.values[index].value = value;
    } else {
      this.values.push(new Tuple(key, value));
    }
  }
}

class Tuple {
  key: any;
  value: Subscription;

  constructor(key?: any, value?: Subscription) {
    this.key = key;
    this.value = value;
  }
}
