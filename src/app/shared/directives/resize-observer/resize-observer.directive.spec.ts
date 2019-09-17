import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RuntimeService } from '../../../services/runtime/runtime.service';
import { mockService, ServiceMock } from '../../../services/mocks/MockService';
import { ResizeObserverDirective } from './resize-observer.directive';
import { By } from '@angular/platform-browser';

const constructorMock = jest.fn();
const observeMock = jest.fn();
const unobserveMock = jest.fn();
const resizeMock = jest.fn();

jest.mock('resize-observer-polyfill', () => ({
  default: class FakeResizeObserver {
    constructor(callback: Function) {
      constructorMock(callback);
    }

    observe(target: Element): void {
      observeMock(target);
    }

    unobserve(target: Element): void {
      unobserveMock(target);
    }
  }
}));

@Component({
  selector: 'app-fake-component',
  template: `
    <div *ngIf="shouldShow">
      <div id="fake-component" appResizeObserver (resize)="onResize($event)">
        fake data
      </div>
    </div>
  `
})
class FakeExpandableComponent {
  shouldShow = false;

  onResize(entry: ResizeObserverEntry) {
    console.log('lol');
    resizeMock(entry);
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

  it('should start observing target element when initialise', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    fixture = TestBed.createComponent(FakeExpandableComponent);
    component = fixture.componentInstance;
    component.shouldShow = true;
    fixture.detectChanges();

    expect(constructorMock).toHaveBeenCalledWith(expect.any(Function));
    expect(observeMock).toHaveBeenCalledWith(
      fixture.debugElement.query(By.css('#fake-component')).nativeElement
    );
  });
});
