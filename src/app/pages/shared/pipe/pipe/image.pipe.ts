import { Pipe, PipeTransform } from '@angular/core';
import {url} from '../../config/url';

@Pipe({
  name: 'imagePipe'
})
export class ImagePipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return url+value;
  }

}