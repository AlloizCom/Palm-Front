import {Routes} from "@angular/router";
import {pagesRoutes} from "./pages/pages/pages.routers"
import {cabinetRoutes} from './pages/cabinet/cabinet.routes';


export const routes: Routes = [

  ...pagesRoutes,
  ...cabinetRoutes
]
