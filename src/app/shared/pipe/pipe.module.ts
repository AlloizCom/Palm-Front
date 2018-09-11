import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImagePipePipe} from './pipe/image.pipe';
import {ReversPipe} from './pipe/revers.pipe';
import {DatePipePipe} from './pipe/date-pipe.pipe';
import {MounthPipe} from './pipe/mounth.pipe';
import {TranslatePipe} from "./pipe/translate.pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ImagePipePipe,
    ReversPipe,
    DatePipePipe,
    MounthPipe,
    TranslatePipe,
  ],
  exports: [
    ImagePipePipe,
    ReversPipe,
    DatePipePipe,
    MounthPipe,
    TranslatePipe,]
})
export class PipeModule {
}
