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
    if (this.linkUrl && this.isExternalLink(this.linkUrl)) {
      this.elementRef.nativeElement.setAttribute('target', '_blank');
      this.elementRef.nativeElement.setAttribute('rel', 'noopener noreferrer');
    }
  }

  private isExternalLink(url: string) {
    const lowercaseUrl = url.toLowerCase();
    return (
      lowercaseUrl.startsWith('http://') || lowercaseUrl.startsWith('https://')
    );
  }
}
