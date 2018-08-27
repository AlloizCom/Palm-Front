import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name:'languagePipe'
})

export class LanguageDescPipe implements PipeTransform{

  transform(value: any, ...args: any[]): any {
    let index = 0;
    // console.log(value);
    switch (value){
        case 'uk':
          index = 1;
          break;
        case 'en':
          index = 0;
          break;
        case 'pl':
          index = 2;
          break;
        case 'ru':
          index = 3;
          break;

    }
    // console.log('pipe - ' + index);
    return index;
  }



}
