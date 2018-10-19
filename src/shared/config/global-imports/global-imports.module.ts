import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PipeModule} from '../../pipe/pipe.module';
import {Http, HttpModule} from '@angular/http';
import {AgmCoreModule} from '@agm/core';
import {AgmDirectionModule} from 'agm-direction';
import {RoomParamsService} from '../../service/room-params.serive';
import {NotificationService} from '../../service/notification.service';
import {urlFront} from '../url';
import {RoomIdService} from '../../service/room-id.service';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `${urlFront}/assets/i18n/`, '.json');
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'palm-front'}),
    // RouterModule.forRoot(_routes, {useHash: true})
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD0aSEhG-yUDTdWZSvVGhwD9p1AU-1stV0'
    }),
    AgmDirectionModule,
  ],
  declarations: [],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
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
  providers: [
    RoomParamsService,
    TranslateService,
    NotificationService,
    RoomIdService
  ]
})
export class GlobalImportsModule {
}
