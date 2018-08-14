import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';


import { AppComponent } from './app.component';
import {PagesModule} from "./pages/pages/pages.module";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {MenuComponent} from './pages/pages/menu/menu.component';
import {FooterComponent} from './pages/pages/footer/footer.component';
import { PipeModule } from './pages/shared/pipe/pipe.module';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    PipeModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
