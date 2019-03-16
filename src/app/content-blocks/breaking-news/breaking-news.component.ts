import { Component } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IBreakingNews } from '../../../../common/__types__/IBreakingNews';
import { CookieNames } from '../../../../common/__types__/CookieNames';
import { CookieService } from '../../services/cookie/cookie.service';

@Component({
  selector: 'app-breaking-news',
  templateUrl: './breaking-news.component.html',
  styleUrls: ['./breaking-news.component.scss']
})
export class BreakingNewsComponent implements IContentBlockComponent {
  input!: IBreakingNews;
  shouldIgnore = false;

  constructor(private cookieService: CookieService) {}

  onClickOrDismiss() {
    const domain = window && window.location && window.location.host;
    this.cookieService.set(CookieNames.IGNORE_BREAKING_NEWS, this.input.id, {
      path: '/',
      domain
    });
    this.shouldIgnore = true;
  }
}
