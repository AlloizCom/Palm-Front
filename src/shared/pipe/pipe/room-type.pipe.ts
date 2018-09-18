import {TranslatePipe} from "ng2-translate";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'roomTypePipe'
})
export class RoomTypePipe implements PipeTransform{

  transform(value: any, ...args: any[]): any {
    if(value == 'DELUXE')
      return 'ЛЮКС';
    else if(value == 'STANDARD')
      return 'СТАНДАРТ';
    else if(value == 'STANDARD_IMPROVED')
      return 'ПОКРАЩЕНИЙ СТАНДАРТ';
    else if(value == 'SUPERIOR')
      return 'НАПІВЛЮКС';
    else if(value == 'SUPERIOR_IMPROVED')
      return 'ПОКРАЩЕНИЙ НАПІВЛЮКС';
  }
}
