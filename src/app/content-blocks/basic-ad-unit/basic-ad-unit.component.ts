import { Component, Input, OnInit } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IBasicAdUnit } from '../../../../common/__types__/IBasicAdUnit';

@Component({
  selector: 'app-basic-ad-unit',
  template: '',
  styleUrls: ['./basic-ad-unit.component.scss']
})
export class BasicAdUnitComponent implements IContentBlockComponent, OnInit {
  @Input() input!: IBasicAdUnit;

  constructor() {}

  ngOnInit() {}
}
