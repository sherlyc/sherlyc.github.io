import { RouterEvent } from "@angular/router";
import { Subject } from "rxjs";

export class RouterMock {
  events: Subject<RouterEvent>;

  constructor() {
    this.events = new Subject();
  }
}
