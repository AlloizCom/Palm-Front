import {updateRoutes} from './update/update.routes';
import {addRoutes} from './add/add.routes';
import {CabinetComponent} from './cabinet.component';
import {Routes} from '@angular/router';
import {CallbackComponent} from './callback/callback.component';
import {BookingComponent} from './booking/booking.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {ScheduleOneComponent} from './schedule/schedule-one/schedule-one.component';
import {BookingOneComponent} from "./booking/booking-one/booking-one.component";
import {AdminChildrenGuards} from "../../../shared/Guard/admin-children-guards.service";
import {AdminGuard} from "../../../shared/Guard/AdminGuard";

export const cabinetRoutes: Routes = [
  {
    path: 'cabinet', component: CabinetComponent,canActivate: [AdminGuard], canActivateChild: [AdminChildrenGuards], children: [
      ...addRoutes,
      ...updateRoutes,
      {path: 'callback', component: CallbackComponent},
      {
        path: 'booking', children: [
          {
          path: '', component: BookingComponent
          },
          {
            path: ':id', component: BookingOneComponent
          }
        ]
      },
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
