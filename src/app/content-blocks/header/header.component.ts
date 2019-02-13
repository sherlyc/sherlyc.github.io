import { Component, Input } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IHeader } from '../../../../common/__types__/IHeader';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements IContentBlockComponent {
  @Input() input!: IHeader;
  constructor() {}
}
