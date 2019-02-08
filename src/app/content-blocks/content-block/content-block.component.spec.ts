import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ContentBlockComponent } from './content-block.component';
import registry from '../content-blocks.registry';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fake-content-block',
  template: ''
})
class FakeContentBlockComponent {}

describe('ContentBlockComponent', () => {
  let component: ContentBlockComponent;
  let fixture: ComponentFixture<ContentBlockComponent>;

  beforeEach(async () => {
    Object.keys(registry).forEach((prop) => {
      delete registry[prop];
    });
    registry['FakeContentBlock'] = FakeContentBlockComponent;

    await TestBed.configureTestingModule({
      declarations: [ContentBlockComponent, FakeContentBlockComponent]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: Object.values(registry)
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
    console.warn(fixture.debugElement.nativeElement);
    expect(
      fixture.debugElement.query(By.directive(FakeContentBlockComponent))
    ).toBeTruthy();
  });
});
