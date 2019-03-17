import { Component, Input } from '@angular/core';
import { IContentBlock } from '../../../../../common/__types__/IContentBlock';

@Component({
  selector: 'app-content-block-list',
  templateUrl: './content-block-list.component.html',
  styleUrls: ['./content-block-list.component.scss']
})
export class ContentBlockListComponent {
  @Input() contentBlocks!: IContentBlock[];

  trackByFn(index: number) {
    return index;
  }
}
