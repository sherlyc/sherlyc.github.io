import { Component, Input } from '@angular/core';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';

@Component({
  selector: 'app-content-block',
  templateUrl: './content-block.component.html',
  styleUrls: ['./content-block.component.scss']
})
export class ContentBlockComponent {
  @Input()
  input!: IContentBlock;

  constructor() {}
}
