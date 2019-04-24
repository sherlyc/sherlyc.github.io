import { Injectable } from '@angular/core';
import { Router, Event as RouteEvent, NavigationStart } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private routerEvents = {
    NavigationStart: new ReplaySubject<NavigationStart>(1)
  };
  constructor(private router: Router) {}

  setup() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event: RouteEvent) => {
        this.routerEvents.NavigationStart.next(event as NavigationStart);
      });
  }

  getEventSubject() {
    return this.routerEvents;
  }
}
