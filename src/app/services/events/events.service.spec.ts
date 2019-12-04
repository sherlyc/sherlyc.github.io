import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";

import { EventsService } from "./events.service";
import { RouterMock } from "../mocks/router.mock";

describe("EventsService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useClass: RouterMock
        }
      ]
    });
  });

  it("should be created", () => {
    const service: EventsService = TestBed.get(EventsService);
    expect(service).toBeTruthy();
  });
});
