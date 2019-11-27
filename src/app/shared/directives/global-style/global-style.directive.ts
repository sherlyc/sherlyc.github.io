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
    const classesToInject =
      this.globalStyleService.injectStyle(this.inputStyle) || '';
    const nonInjectedClasses = this.getNonInjectedClasses();

    this.el.nativeElement.className = nonInjectedClasses.concat(
      ' ',
      classesToInject
    );
  }

  private getNonInjectedClasses() {
    const stylePrefix = this.globalStyleService.stylePrefix();
    const existingClasses = this.el.nativeElement.className.split(' ');
    return existingClasses
      .filter((existingClass) => !existingClass.startsWith(stylePrefix))
      .join(' ');
  }
}
