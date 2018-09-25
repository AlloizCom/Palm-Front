import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImagePipePipe} from './pipe/image.pipe';
import {ReversPipe} from './pipe/revers.pipe';
import {DatePipePipe} from './pipe/date-pipe.pipe';
import {MounthPipe} from './pipe/mounth.pipe';
import {RoomTypePipe} from "./pipe/room-type.pipe";
import {TariffTypePipe} from "./pipe/tariff-type.pipe";
import {Safe} from "./pipe/safe-html.pipe";
import {DateTimePipePipe} from "./pipe/date-time-pipe.pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ImagePipePipe,
    ReversPipe,
    DatePipePipe,
    MounthPipe,
    RoomTypePipe,
    TariffTypePipe,
    Safe,
    DateTimePipePipe
  ],
  exports: [
    ImagePipePipe,
    ReversPipe,
    DatePipePipe,
    MounthPipe,
    RoomTypePipe,
    TariffTypePipe,
    Safe,
    DateTimePipePipe
  ]
})
export class PipeModule {
}
