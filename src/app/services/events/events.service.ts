import { Injectable } from "@angular/core";
import { Event as RouteEvent, NavigationStart, Router } from "@angular/router";
import { Subject } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class EventsService {
  private routerEvents = {
    NavigationStart: new Subject<NavigationStart>()
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
