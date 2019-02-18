import { Component, Input } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IBasicArticleSection } from '../../../../common/__types__/IBasicArticleSection';

@Component({
  selector: 'app-basic-article-section',
  templateUrl: './basic-article-section.component.html',
  styleUrls: ['./basic-article-section.component.scss']
})
export class BasicArticleSectionComponent implements IContentBlockComponent {
  @Input() input!: IBasicArticleSection;

  constructor() {}
}
