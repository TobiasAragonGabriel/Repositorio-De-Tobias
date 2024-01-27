import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './full-name.pipe';
import { TamTitulosDirective } from './tam-titulos.directive';



@NgModule({
  declarations: [
    FullNamePipe,
    TamTitulosDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FullNamePipe, TamTitulosDirective
  ]
})
export class SharedModule { }
