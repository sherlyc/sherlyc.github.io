import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import * as PullToRefresh from "pulltorefreshjs";
import { mockService, ServiceMock } from "../../../services/mocks/MockService";
import { RuntimeService } from "../../../services/runtime/runtime.service";
import { PullToRefreshDirective } from "./pull-to-refresh.directive";

jest.mock("pulltorefreshjs");

@Component({
  selector: "app-dummy-component",
  template: `
    <div appPullToRefresh></div>
  `
})
class DummyComponent {}

describe("PullToRefreshDirective", () => {
  let fixture: ComponentFixture<DummyComponent>;
  let component: DummyComponent;
  let runtimeService: ServiceMock<RuntimeService>;
  const pointer = { destroy: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DummyComponent, PullToRefreshDirective],
      providers: [
        { provide: RuntimeService, useClass: mockService(RuntimeService) }
      ]
    }).compileComponents();
    runtimeService = TestBed.inject(RuntimeService) as ServiceMock<
      RuntimeService
    >;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("when in browser", () => {
    beforeEach(() => {
      runtimeService.isBrowser.mockReturnValueOnce(true);
      (PullToRefresh.init as jest.Mock).mockReturnValueOnce(pointer);
      fixture = TestBed.createComponent(DummyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it("creates PullToRefresh.js instance after view init", () => {
      const mainElement = fixture.debugElement.query(By.css("div"))
        .nativeElement;
      expect(PullToRefresh.init).toHaveBeenCalledWith({ mainElement });
    });

    it("destroys PullToRefresh.js instance before view destroy", () => {
      fixture.destroy();
      expect(pointer.destroy).toHaveBeenCalled();
    });
  });

  describe("when in server", () => {
    beforeEach(() => {
      runtimeService.isBrowser.mockReturnValueOnce(false);
      fixture = TestBed.createComponent(DummyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it("does not call PullToRefresh.js", () => {
      expect(PullToRefresh.init).not.toHaveBeenCalled();
    });
  });
});
