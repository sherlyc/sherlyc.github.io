import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RuntimeService } from '../../../services/runtime/runtime.service';
import { mockService, ServiceMock } from '../../../services/mocks/MockService';
import { ResizeDirective } from './resize.directive';
import { By } from '@angular/platform-browser';
import { ResizeObserverService } from '../../../services/resize-observer/resize-observer.service';

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
  let resizeObserverService: ServiceMock<ResizeObserverService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FakeExpandableComponent, ResizeDirective],
      providers: [
        { provide: RuntimeService, useClass: mockService(RuntimeService) },
        { provide: ResizeObserverService, useClass: mockService(ResizeObserverService) }
      ]
    }).compileComponents();
    runtimeService = TestBed.get(RuntimeService);
    resizeObserverService = TestBed.get(ResizeObserverService);
  });

  it('should observe an element when initialized', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    fixture = TestBed.createComponent(FakeExpandableComponent);
    component = fixture.componentInstance;
    component.toShow = true;
    fixture.detectChanges();

    expect(resizeObserverService.observe).toHaveBeenCalled();
  });

  it('should call the resizeCallBack when resized', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    fixture = TestBed.createComponent(FakeExpandableComponent);
    component = fixture.componentInstance;
    component.toShow = true;
    fixture.detectChanges();

    const observedElement = fixture.debugElement.query(
      By.css('#fake-component')
    ).nativeElement;

    const directiveInstance = fixture.debugElement.query(By.directive(ResizeDirective)).injector.get(ResizeDirective);
    directiveInstance.resize.emit({ target: observedElement });
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

    expect(resizeObserverService.unobserve).toHaveBeenCalled();
  });
});
