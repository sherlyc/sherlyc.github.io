import { Component, Input, OnInit } from '@angular/core';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';

@Component({
  selector: 'app-basic-article-unit',
  templateUrl: './basic-article-unit.component.html',
  styleUrls: ['./basic-article-unit.component.scss']
})
export class BasicArticleUnitComponent implements IContentBlockComponent {
  @Input() input!: IBasicArticleUnit;

  constructor() {}
}
