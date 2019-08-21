import { Component, Input } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IDefconArticleUnit } from '../../../../common/__types__/IDefconArticleUnit';

@Component({
  selector: 'app-gray-defcon-article-unit-component',
  templateUrl: './gray-defcon-article-unit.component.html',
  styleUrls: ['./gray-defcon-article-unit.component.scss']
})
export class GrayDefconArticleUnitComponent implements IContentBlockComponent {
  @Input() input!: IDefconArticleUnit;
  index!: number;
}
