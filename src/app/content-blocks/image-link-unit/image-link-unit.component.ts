import { Component, Input } from '@angular/core';
import { IImageLinkUnit } from '../../../../common/__types__/IImageLinkUnit';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';

@Component({
  selector: 'app-image-link-unit',
  templateUrl: './image-link-unit.component.html',
  styleUrls: ['./image-link-unit.component.scss']
})
export class ImageLinkUnitComponent implements IContentBlockComponent {
  @Input() input!: IImageLinkUnit;

  constructor() {}
}
