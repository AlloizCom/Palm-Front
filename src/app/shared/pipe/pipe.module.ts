import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipePipe } from './pipe/image.pipe';
import {ReversPipe} from './pipe/revers.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ImagePipePipe,
    ReversPipe],
  exports:[
    ImagePipePipe,
    ReversPipe]
})
export class PipeModule { }
