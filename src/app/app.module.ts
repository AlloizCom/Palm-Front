import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import {PagesModule} from "./pages/pages/pages.module";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CabinetModule} from './pages/cabinet/cabinet.module';
import {CallbackService} from './shared/service/callback.service';
import {UserDetailsService} from './shared/service/user-details.service';
import {MyInterceptor} from './shared/interceptors/my.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TranslateModule} from 'ng2-translate';
import {GlobalImportsModule} from "./shared/config/global-imports/global-imports.module";
import {PipeModule} from './shared/pipe/pipe.module';
import{ AgmCoreModule} from "@agm/core";


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    PagesModule,
    CabinetModule,
    NgbModule.forRoot(),
    FormsModule,
    GlobalImportsModule,
    PipeModule,
    RouterModule.forRoot(routes),

  ],
  providers: [CallbackService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true
    },
    UserDetailsService,

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }


