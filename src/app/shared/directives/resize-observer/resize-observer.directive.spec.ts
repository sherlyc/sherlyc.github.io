import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RuntimeService } from '../../../services/runtime/runtime.service';
import { mockService, ServiceMock } from '../../../services/mocks/MockService';
import { ResizeObserverDirective } from './resize-observer.directive';
import { By } from '@angular/platform-browser';

const onResizeCallback = jest.fn();
let triggerResize: Function;

jest.mock('resize-observer-polyfill', () => ({
  default: class FakeResizeObserver {
    observed: any[] = [];
    callback: Function;

    constructor(callback: Function) {
      this.callback = callback;

      triggerResize = () => {
        this.fakeTriggerResize();
      };
    }

    fakeTriggerResize() {
      this.callback(
        this.observed.map((observedElement) => ({ target: observedElement }))
      );
    }

    observe(target: Element): void {
      this.observed.push(target);
    }

    unobserve(target: Element): void {}
  }
}));

@Component({
  selector: 'app-fake-component',
  template:
    '<div id="fake-component" appResizeObserver (resize)="onResize($event)">fake data</div>'
})
class FakeExpandableComponent {
  onResize(entry: any) {
    onResizeCallback(entry);
  }
}

describe('Resize Observer', () => {
  let fixture: ComponentFixture<FakeExpandableComponent>;
  let component: FakeExpandableComponent;
  let runtimeService: ServiceMock<RuntimeService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FakeExpandableComponent, ResizeObserverDirective],
      providers: [
        { provide: RuntimeService, useClass: mockService(RuntimeService) }
      ]
    }).compileComponents();
    runtimeService = TestBed.get(RuntimeService);
  });

  it('should call the resizeCallBack when resized', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    fixture = TestBed.createComponent(FakeExpandableComponent);
    component = fixture.componentInstance;

    triggerResize();

    const observedElement = fixture.debugElement.query(
      By.css('#fake-component')
    ).nativeElement;
    expect(onResizeCallback).toHaveBeenCalledWith({ target: observedElement });
  });
});
