import { Component, Inject, Input, Renderer2 } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IHeader } from '../../../../common/__types__/IHeader';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements IContentBlockComponent {
  @Input() input!: IHeader;

  navigationVisible = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  toggleMenu() {
    this.navigationVisible = !this.navigationVisible;
    if (this.navigationVisible) {
      this.renderer.addClass(this.document.body, 'noScroll');
    } else {
      this.renderer.removeClass(this.document.body, 'noScroll');
    }
  }
}
