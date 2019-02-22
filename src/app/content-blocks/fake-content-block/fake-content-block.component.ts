import { Component, OnInit } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';

// !! Only for testing purpose
@Component({
  selector: 'app-fake-content-block',
  template: '',
  styles: ['']
})
export class FakeContentBlockComponent implements IContentBlockComponent {
  constructor() {}

  input!: IContentBlock;
}
