import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {PipeModule} from '../../pipe/pipe.module';
import {TranslateLoader, TranslateModule, TranslateService, TranslateStaticLoader} from 'ng2-translate';
import {Http} from "@angular/http";
import {AgmCoreModule} from "@agm/core";
import { AgmDirectionModule } from 'agm-direction';
import {RoomParamsService} from "../../service/room-params.serive";
import {NotificationService} from "../../service/notification.service";

// import {routes} from '../../../main.routes';

// const _routes: Routes = [
//   ...routes
// ];
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, '/assets/i18n', '.json');
}



@NgModule({
  imports: [
    // RouterModule.forRoot(_routes, {useHash: true})
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http],
    }),
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyC9oymho0KGOZ41bxj7fW_1qSqjvuVwodY'
    }),
    AgmDirectionModule,
  ],
  declarations: [],
  exports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PipeModule,
    CommonModule,
    TranslateModule,
    AgmCoreModule,
    AgmDirectionModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[
    RoomParamsService,
    TranslateService,
    NotificationService
  ]
})
export class GlobalImportsModule { }
