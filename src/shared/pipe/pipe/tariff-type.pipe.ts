import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'tariffTypePipe'
})
export class TariffTypePipe implements PipeTransform{

  transform(value: any, ...args: any[]): any {
    if(value == 'REGULAR')
      return 'СТАНДАРТНИЙ';
    else if(value == 'SPECIAL')
      return 'СПЕЦІАЛЬНИЙ';
  }
}
