import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { ImagePipePipe } from './pipe/image.pipe';
import {ReversPipe} from './pipe/revers.pipe';
import {DatePipePipe} from './pipe/date-pipe.pipe';
import {LanguageDescPipe} from './pipe/language-desc.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ImagePipePipe,
    ReversPipe,
    DatePipePipe,
    LanguageDescPipe],
  exports:[
    ImagePipePipe,
    ReversPipe,
    DatePipePipe,
    LanguageDescPipe]
})
export class PipeModule { }
