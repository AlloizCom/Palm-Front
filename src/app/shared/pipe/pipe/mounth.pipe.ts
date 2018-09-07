import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mounth'
})
export class MounthPipe implements PipeTransform {

  month: string[] = [
    'січень', 'лютий', 'березень', 'квітень', 'травень', 'червень', 'липень', 'серпень', 'вересень', 'жовтень', 'листопад', 'грудень'
  ];
  transform(value: number, args?: any): any {
    return this.month[value];
  }

}
