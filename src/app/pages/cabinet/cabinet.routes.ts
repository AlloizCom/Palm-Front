import {updateRoutes} from './update/update.routes';
import {addRoutes} from './add/add.routes';
import {CabinetComponent} from './cabinet.component';
import {Routes} from '@angular/router';
import {CallbackComponent} from './callback/callback.component';

export const cabinetRoutes: Routes = [
  {
    path: 'cabinet',
    component: CabinetComponent,
    children: [
      ...addRoutes,
      ...updateRoutes,
      {path: 'callback', component: CallbackComponent}

    ]
  }
]
