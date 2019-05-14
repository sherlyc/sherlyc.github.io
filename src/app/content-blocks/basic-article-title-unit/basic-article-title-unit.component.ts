import { Component, Input } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IBasicArticleTitleUnit } from '../../../../common/__types__/IBasicArticleTitleUnit';

@Component({
  selector: 'app-basic-article-title-unit',
  templateUrl: './basic-article-title-unit.html',
  styleUrls: ['./basic-article-title-unit.scss']
})
export class BasicArticleTitleUnitComponent implements IContentBlockComponent {
  @Input() input!: IBasicArticleTitleUnit;

  constructor() {}
}
