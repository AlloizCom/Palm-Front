import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable()
export class BrowserCheckService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  isBrowser():boolean{
    return isPlatformBrowser(this.platformId);
  }

}
