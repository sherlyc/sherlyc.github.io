import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  HostBinding,
  Host,
  OnChanges,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { TargetLocator } from 'selenium-webdriver';

@Directive({
  selector: '[appOpenExternalLink]'
})
export class OpenExternalLinkDirective implements OnChanges {
  @Input('appOpenExternalLink') linkUrl?: string;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.linkUrl) {
      const isExternalLink =
        this.linkUrl.startsWith('http://') ||
        this.linkUrl.startsWith('https://');
      if (isExternalLink) {
        this.elementRef.nativeElement.setAttribute('target', '_blank');
        this.elementRef.nativeElement.setAttribute(
          'rel',
          'noopener noreferrer'
        );
      }
    }
  }
}
