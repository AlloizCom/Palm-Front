import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  // console.log = ()=>{};
  // console.error = ()=>{};
  // console.warn = ()=>{};
}

export { AppServerModule } from './app/app.server.module';
