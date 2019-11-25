import { Directive, Input, OnInit } from '@angular/core';
import { GlobalStyleService } from '../../../services/global-style/global-style.service';

@Directive({ selector: '[appGlobalStyle]' })
export class GlobalStyleDirective implements OnInit {
  @Input('appGlobalStyle') inputStyle?: object;

  constructor(private globalStyleService: GlobalStyleService) {}

  ngOnInit(): void {
    this.globalStyleService.injectStyle(this.inputStyle);
  }
}
