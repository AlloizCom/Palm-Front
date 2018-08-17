import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GlobalImportsModule} from '../../shared/config/global-imports/global-imports.module';
import {UpdateModule} from './update/update.module';
import {AddModule} from './add/add.module';
import {AddComponent} from './add/add.component';
import {UpdateComponent} from './update/update.component';


@NgModule({
  imports: [
    CommonModule,
    GlobalImportsModule,
    AddModule,
    UpdateModule
  ],
  declarations: [
    AddComponent,
    UpdateComponent
  ]
})
export class CabinetModule { }




