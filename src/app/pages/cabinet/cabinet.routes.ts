import {updateRoutes} from './update/update.routes';
import {addRoutes} from './add/add.routes';
import {CabinetComponent} from './cabinet.component';
import {Routes} from '@angular/router';
import {CallbackComponent} from './callback/callback.component';
import {BookingComponent} from './booking/booking.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {ScheduleOneComponent} from './schedule/schedule-one/schedule-one.component';

export const cabinetRoutes: Routes = [
  {
    path: 'cabinet',
    component: CabinetComponent,
    children: [
      ...addRoutes,
      ...updateRoutes,
      {path: 'callback', component: CallbackComponent},
      {path: 'booking', component: BookingComponent},
      {path: 'schedule', children: [
          {
            path: '', component: ScheduleComponent
          },
          {
            path: ':id', component: ScheduleOneComponent
          }
        ]
      }
    ]
  }
]
