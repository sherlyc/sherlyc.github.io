import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Component } from '@angular/core';
import { LoggerService } from '../../../services/logger/logger.service';
import { ContentBlockDirective } from './content-block.directive';
import { IContentBlock } from '../../../../../common/__types__/IContentBlock';
import registry from '../../../content-blocks/content-blocks.registry';
import { mockService } from '../../../services/mocks/MockService';

@Component({
  selector: 'app-fake-content-block',
  template: ''
})
class FakeContentBlockComponent {}

@Component({
  selector: 'app-test-directive',
  template: '<ng-container [appContentBlock]="input"></ng-container>'
})
class TestDirectiveComponent {
  input!: IContentBlock;
}

describe('ContentBlockDirective', () => {
  let component: TestDirectiveComponent;
  let fixture: ComponentFixture<TestDirectiveComponent>;

  beforeEach(async () => {
    // @ts-ignore
    registry['FakeContentBlockComponent'] = FakeContentBlockComponent;

    await TestBed.configureTestingModule({
      declarations: [
        ContentBlockDirective,
        TestDirectiveComponent,
        FakeContentBlockComponent
      ],
      providers: [
        { provide: LoggerService, useClass: mockService(LoggerService) }
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [FakeContentBlockComponent]
        }
      })
      .compileComponents();
    fixture = TestBed.createComponent(TestDirectiveComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture = TestBed.createComponent(TestDirectiveComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render FakeContentBlock', () => {
    // @ts-ignore
    component.input = {
      type: 'FakeContentBlock'
    } as IContentBlock;

    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.directive(FakeContentBlockComponent))
    ).toBeTruthy();
  });

  it('should not render any content block when no registered component is found', () => {
    // @ts-ignore
    component.input = {
      type: 'UnregisteredContentBlock'
    } as IContentBlock;

    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).toEqual('');
  });
});