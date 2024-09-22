import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  defaultHoverStyle = {
    backgroundColor: 'transparent',
    color: 'black'
  }

  hoverStyle = {
    backgroundColor: '#50C878',
    color: '#FFF'
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('mouseenter') onMouseEnterFn() {
    this.setStyleFn(this.hoverStyle);
  }

  @HostListener('mouseleave') onMouseLeaveFn() {
    this.setStyleFn(this.defaultHoverStyle);
  }

  setStyleFn(styleObj: any){
    Object.keys(styleObj).forEach(style => {
      this.renderer.setStyle(this.el.nativeElement,style,styleObj[style]);
    })
  }
}
