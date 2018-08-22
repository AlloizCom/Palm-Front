import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'revers'
})
export class ReversPipe implements PipeTransform {

  transform(arr) {
    var copy = arr.slice();
    return copy.reverse();
  }

}
