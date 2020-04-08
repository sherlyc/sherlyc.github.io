import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { ServiceMock } from "../mocks/MockService";
import { RouterMock } from "../mocks/router.mock";

import { EventsService } from "./events.service";

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
    const service: EventsService = TestBed.inject(EventsService) as ServiceMock<
      EventsService
    >;
    expect(service).toBeTruthy();
  });
});
