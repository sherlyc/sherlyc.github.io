import { Component, Input } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IDefconArticleUnit } from '../../../../common/__types__/IDefconArticleUnit';

@Component({
  selector: 'app-defcon-article-unit-component',
  templateUrl: './defcon-article-unit.component.html',
  styleUrls: ['./defcon-article-unit.component.scss']
})
export class DefconArticleUnitComponent implements IContentBlockComponent {
  @Input() input!: IDefconArticleUnit;
  index!: number;
}
