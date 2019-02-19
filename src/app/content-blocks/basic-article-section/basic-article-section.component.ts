import { Component, Input } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { ClassNameService } from '../../services/class-name/class-name.service';
import { IBasicArticleSection } from '../../../../common/__types__/IBasicArticleSection';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';

@Component({
  selector: 'app-basic-article-section',
  templateUrl: './basic-article-section.component.html',
  styleUrls: ['./basic-article-section.component.scss']
})
export class BasicArticleSectionComponent implements IContentBlockComponent {
  @Input() input!: IBasicArticleSection;

  constructor(private classNameService: ClassNameService) {}

  getClassName(contentBlockType: string) {
    return this.classNameService.generateClassName(contentBlockType);
  }

  trackByFn(index: number, item: IBasicArticleUnit) {
    return index;
  }
}
