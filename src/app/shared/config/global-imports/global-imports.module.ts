import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {PipeModule} from '../../pipe/pipe.module';
// import {routes} from '../../../main.routes';

// const _routes: Routes = [
//   ...routes
// ];
@NgModule({
  imports: [
    // RouterModule.forRoot(_routes, {useHash: true})
  ],
  declarations: [],
  exports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PipeModule,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GlobalImportsModule { }
