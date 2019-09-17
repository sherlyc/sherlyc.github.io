import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RuntimeService } from '../../../services/runtime/runtime.service';
import { mockService, ServiceMock } from '../../../services/mocks/MockService';
import { ResizeObserverDirective } from './resize-observer.directive';

jest.mock('resize-observer-polyfill', () => ({
  default: class FakeResizeObserver {
    constructor(callback: Function) {
      console.log('FakeResizeObserver', callback);
    }

    observe(target: Element): void {
      console.log('observe', target);
    }

    unobserve(target: Element): void {
      console.log('unobserve', target);
    }
  }
}));

@Component({
  selector: 'app-fake-component',
  template:
    '<div appResizeObserver>fake data</div>'
})
class FakeExpandableComponent {
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
    runtimeService.isBrowser.mockReturnValue(true);
    fixture = TestBed.createComponent(FakeExpandableComponent);
    component = fixture.componentInstance;
  });

  it('should get the height of the element', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    fixture.detectChanges();
  });
});
