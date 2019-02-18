import { ConnectableObservable, Observable, Subscriber } from 'rxjs';
import { RouterEvent } from '@angular/router';
import { publish } from 'rxjs/operators';

export class RouterMock {
  eventEmitter!: Subscriber<RouterEvent>;

  events: ConnectableObservable<Event>;

  constructor() {
    this.events = Observable.create((e: Subscriber<RouterEvent>) => {
      this.eventEmitter = e;
    }).pipe(publish());
    this.events.connect();
  }
}
