import { Component, Input } from '@angular/core';
import { HeadlineFlags } from '../../../../../common/HeadlineFlags';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.scss']
})
export class HeadlineComponent {
  @Input() headline?: string;
  @Input() timeStamp?: number;
  @Input() headlineFlags?: HeadlineFlags[];
  @Input() textColor?: string;
}
