import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { GlobalStyleService } from '../../../services/global-style/global-style.service';

@Directive({ selector: '[appGlobalStyle]' })
export class GlobalStyleDirective implements OnChanges {
  @Input('appGlobalStyle') inputStyle?: object;

  constructor(
    private el: ElementRef<HTMLElement>,
    private globalStyleService: GlobalStyleService
  ) {}

  ngOnChanges() {
    const className = this.globalStyleService.injectStyle(this.inputStyle);
    if (className) {
      this.el.nativeElement.classList.add(...className.split(' '));
    }
  }
}
