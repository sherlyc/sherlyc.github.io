import { Subject } from 'rxjs';
import { RouterEvent } from '@angular/router';

export class RouterMock {
  events: Subject<RouterEvent>;

  constructor() {
    this.events = new Subject();
  }
}
