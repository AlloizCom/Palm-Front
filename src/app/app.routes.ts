import {Routes} from '@angular/router';
import {pagesRoutes} from './pages/pages/pages.routers';
import {cabinetRoutes} from './pages/cabinet/cabinet.routes';


export const routes: Routes = [
  {path:'',pathMatch: 'full', redirectTo: 'pages'},
  {path: 'cabinet', children: cabinetRoutes},
  {path: 'pages', children: pagesRoutes}
];
