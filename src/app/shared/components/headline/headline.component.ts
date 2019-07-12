import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.scss']
})
export class HeadlineComponent {
  @Input() headline?: string;

  assggg() {
    console.log(33);
  }
}
