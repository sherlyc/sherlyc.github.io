import { Component } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IBreakingNews } from '../../../../common/__types__/IBreakingNews';

@Component({
  selector: 'app-breaking-news',
  templateUrl: './breaking-news.component.html',
  styleUrls: ['./breaking-news.component.scss']
})
export class BreakingNewsComponent implements IContentBlockComponent {
  input!: IBreakingNews;
  shouldIgnore = false;

  constructor() {}

  onClickOrDismiss() {
    this.shouldIgnore = true;
  }
}