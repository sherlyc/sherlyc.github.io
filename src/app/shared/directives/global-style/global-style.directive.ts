import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { GlobalStyleService } from '../../../services/global-style/global-style.service';

@Directive({ selector: '[appGlobalStyle]' })
export class GlobalStyleDirective implements OnInit {
  @Input('appGlobalStyle') inputStyle?: object;

  constructor(
    private el: ElementRef<HTMLElement>,
    private globalStyleService: GlobalStyleService
  ) {}

  ngOnInit() {
    const className = this.globalStyleService.injectStyle(this.inputStyle);
    this.el.nativeElement.classList.add(...className.split(' '));
  }
}
