import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DummyComponent, PullToRefreshDirective],
      providers: [
        { provide: RuntimeService, useClass: mockService(RuntimeService) }
      ]
    }).compileComponents();
    runtimeService = TestBed.get(RuntimeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create an instance", () => {
    runtimeService.isBrowser.mockReturnValueOnce(true);
    fixture = TestBed.createComponent(DummyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(PullToRefresh.init).toHaveBeenCalledWith({
      mainElement: expect.anything()
    });
  });
});
