import { Component, Input, OnInit } from '@angular/core';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';

@Component({
  selector: 'app-basic-article-unit',
  templateUrl: './basic-article-unit.component.html',
  styleUrls: ['./basic-article-unit.component.scss']
})
export class BasicArticleUnitComponent implements OnInit {
  static key = 'BasicArticleUnit';

  @Input() input!: IBasicArticleUnit;

  constructor() {}

  ngOnInit() {}
}
