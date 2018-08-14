import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {PagesModule} from "./pages/pages/pages.module";
import {RouterModule} from "@angular/router";
import {routes} from "./main.routes";
import {GlobalImportsModule} from "../shared/global-imports";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    PagesModule,
    GlobalImportsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
}
