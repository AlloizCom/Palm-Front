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
import {BookStatusPipePipe} from "./pipe/book-status-pipe.pipe";
import {NullOrUndefinedPipe} from "./pipe/null-or-undefined.pipe";

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
    DateTimePipePipe,
    BookStatusPipePipe,NullOrUndefinedPipe
  ],
  exports: [
    ImagePipePipe,
    ReversPipe,
    DatePipePipe,
    MounthPipe,
    RoomTypePipe,
    TariffTypePipe,
    Safe,
    DateTimePipePipe,
    BookStatusPipePipe,NullOrUndefinedPipe
  ]
})
export class PipeModule {
}
