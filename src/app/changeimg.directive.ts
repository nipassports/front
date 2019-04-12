import { Directive,ElementRef,HostListener,Input } from '@angular/core';

@Directive({
  selector: '[appChangeimg]'
})
export class ChangeimgDirective {

  constructor(private el:ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
     this.el.nativeElement=1;
     console.log(this.el.nativeElement)
   
   }
   
  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement=0;
    console.log(this.el.nativeElement)
  }
   
  private highlight(url: string) {
    this.el.nativeElement.src =url;
   }

}
