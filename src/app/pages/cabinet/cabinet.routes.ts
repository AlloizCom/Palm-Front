import {updateRoutes} from './update/update.routes';
import {addRoutes} from './add/add.routes';
import {CabinetComponent} from './cabinet.component';
import {Routes} from '@angular/router';

export const cabinetRoutes: Routes = [
  {
    path: 'cabinet',
    component: CabinetComponent,
    children: [
      ...addRoutes,
      ...updateRoutes
    ]
  }
]
