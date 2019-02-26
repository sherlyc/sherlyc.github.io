import { Directive, ElementRef, HostListener } from '@angular/core';
import { RuntimeService } from '../../services/runtime/runtime.service';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective {
  private windowScrollBefore = 0;
  private elementTop = 0;
  private readonly isBrowser: boolean;
  private element: any;

  constructor(el: ElementRef, private runtime: RuntimeService) {
    this.element = el.nativeElement;
    this.isBrowser = runtime.isBrowser();

    const style = this.element.style;

    style.width = '100%';
    style.position = 'fixed';
    style.top = '0';
    style.left = '0';
    style.zIndex = 100;
  }

  @HostListener('window:scroll') public windowScrolled() {
    if (this.isBrowser) {
      const elementHeight = this.element.offsetHeight;
      const windowScrollCurrent = window.pageYOffset;
      const windowScrollDiff = this.windowScrollBefore - windowScrollCurrent;
      const newElementTop = this.elementTop + windowScrollDiff;
      if (windowScrollDiff > 0) {
        this.elementTop = Math.min(newElementTop, 0);
      } else {
        this.elementTop = Math.max(-elementHeight, newElementTop);
      }
      this.element.style.transform = 'translateY(' + this.elementTop + 'px)';
      this.windowScrollBefore = windowScrollCurrent;
    }
  }
}
