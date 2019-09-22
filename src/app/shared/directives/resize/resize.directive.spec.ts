import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RuntimeService } from '../../../services/runtime/runtime.service';
import { mockService, ServiceMock } from '../../../services/mocks/MockService';
import { ResizeDirective } from './resize.directive';
import { By } from '@angular/platform-browser';

let triggerResize: Function;
let observed: any[] = [];
const unobserveMock = jest.fn();

jest.mock('resize-observer-polyfill', () => ({
  default: class FakeResizeObserver {
    callback: Function;

    constructor(callback: Function) {
      this.callback = callback;

      triggerResize = () => {
        this.fakeTriggerResize();
      };
    }

    fakeTriggerResize() {
      this.callback(
        observed.map((observedElement) => ({ target: observedElement }))
      );
    }

    observe(target: Element): void {
      observed.push(target);
    }

    unobserve(target: Element): void {
      observed = observed.filter((element) => element !== target);
      unobserveMock(target);
    }
  }
}));

const clearObservedElements = () => {
  observed = [];
};

const onResizeMock = jest.fn();
@Component({
  selector: 'app-fake-component',
  template:
    '<div *ngIf="toShow" id="fake-component" appResizeObserver (resize)="onResize($event)">fake data</div>'
})
class FakeExpandableComponent {
  toShow = false;
  onResize(entry: any) {
    onResizeMock(entry);
  }
}

describe('Resize Observer', () => {
  let fixture: ComponentFixture<FakeExpandableComponent>;
  let component: FakeExpandableComponent;
  let runtimeService: ServiceMock<RuntimeService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FakeExpandableComponent, ResizeDirective],
      providers: [
        { provide: RuntimeService, useClass: mockService(RuntimeService) }
      ]
    }).compileComponents();
    runtimeService = TestBed.get(RuntimeService);
  });

  afterEach(() => {
    clearObservedElements();
    onResizeMock.mockClear();
    unobserveMock.mockClear();
  });

  it('should call the resizeCallBack when resized', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    fixture = TestBed.createComponent(FakeExpandableComponent);
    component = fixture.componentInstance;
    component.toShow = true;
    fixture.detectChanges();

    triggerResize();

    const observedElement = fixture.debugElement.query(
      By.css('#fake-component')
    ).nativeElement;
    expect(onResizeMock).toHaveBeenCalledTimes(1);
    expect(onResizeMock).toHaveBeenCalledWith({ target: observedElement });
  });

  it('should unobserve when destroyed', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    fixture = TestBed.createComponent(FakeExpandableComponent);
    component = fixture.componentInstance;

    component.toShow = true;
    fixture.detectChanges();
    component.toShow = false;
    fixture.detectChanges();
    triggerResize();

    expect(onResizeMock).not.toHaveBeenCalled();
  });
});
