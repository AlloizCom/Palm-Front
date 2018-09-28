import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'bookStatusPipe'
})

export class BookStatusPipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value != null){
      if(value == 'AVAILABLE')
        return 'ДОСТУПНИЙ';
      else if(value == 'CANCELED')
        return 'ВІДМІНЕНИЙ';
      else if(value == 'PAID_BY_CARD')
        return 'ОПЛАТА ЗДІЙСНЕНА';
      else if(value == 'HAVE_TO_BE_PAID')
        return 'ОПЛАТА ПРИ ЗАСЕЛЕННІ';
    }  else {
      return '-';
    }

  }

}
