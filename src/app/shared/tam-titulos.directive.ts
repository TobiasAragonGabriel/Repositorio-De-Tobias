// TamTitulosDirective

import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appTamTitulos]'
})
export class TamTitulosDirective implements AfterViewInit {
  @Input() tamTitulosSize: string = '20px';

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.adjustFontSize();
  }

  private adjustFontSize(): void {
    this.el.nativeElement.style.fontSize = this.tamTitulosSize;
  }
}
