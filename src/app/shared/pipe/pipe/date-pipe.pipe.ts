import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.split('T')[0].split('-').reverse().join('.');
  }

}


