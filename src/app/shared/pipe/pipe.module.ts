import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipePipe } from './pipe/image.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImagePipePipe],
  exports:[ImagePipePipe]
})
export class PipeModule { }
