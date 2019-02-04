import { Component, OnInit } from '@angular/core';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  constructor() {}

  data: IContentBlock[] = [];

  ngOnInit() {}
}
