import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ContentBlockComponent } from './content-block.component';
import registry from '../content-blocks.registry';
import { Component } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { LoggerServiceMock } from '../../services/logger-service.mock';

@Component({
  selector: 'app-fake-content-block',
  template: ''
})
class FakeContentBlockComponent {}

describe('ContentBlockComponent', () => {
  let component: ContentBlockComponent;
  let fixture: ComponentFixture<ContentBlockComponent>;

  beforeEach(async () => {
    // @ts-ignore
    registry['FakeContentBlockComponent'] = FakeContentBlockComponent;

    await TestBed.configureTestingModule({
      declarations: [ContentBlockComponent, FakeContentBlockComponent],
      providers: [{ provide: LoggerService, useClass: LoggerServiceMock }]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [FakeContentBlockComponent]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(ContentBlockComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render FakeContentBlock', () => {
    component.input = {
      // @ts-ignore
      type: 'FakeContentBlock'
    };

    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.directive(FakeContentBlockComponent))
    ).toBeTruthy();
  });

  it('should not render any content block when no registered component is found', () => {
    component.input = {
      // @ts-ignore
      type: 'UnregisteredContentBlock'
    };

    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).toEqual('');
  });
});
