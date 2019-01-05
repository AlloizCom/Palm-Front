import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'nuo'
})
export class NullOrUndefinedPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value ? value : '';
  }

}
