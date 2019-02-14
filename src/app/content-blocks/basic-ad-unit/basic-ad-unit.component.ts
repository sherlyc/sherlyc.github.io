import { Component, Input, OnInit } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IBasicAdUnit } from '../../../../common/__types__/IBasicAdUnit';

@Component({
  selector: 'app-basic-ad-unit',
  template: '',
  styles: ['']
})
export class BasicAdUnitComponent implements IContentBlockComponent, OnInit {
  @Input() input!: IBasicAdUnit;

  constructor() {}

  ngOnInit() {}
}
