import { Component } from '@angular/core';
import { GlobalStyleDirective } from './global-style.directive';
import { GlobalStyleService } from '../../../services/global-style/global-style.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockService, ServiceMock } from '../../../services/mocks/MockService';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-fake-component',
  template: '<div class="something" [appGlobalStyle]="inputStyle"></div>'
})
class FakeComponent {
  inputStyle!: object;
}

describe('Global Style Directive', () => {
  let fixture: ComponentFixture<FakeComponent>;
  let component: FakeComponent;
  let globalStyleService: ServiceMock<GlobalStyleService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FakeComponent, GlobalStyleDirective],
      providers: [
        {
          provide: GlobalStyleService,
          useClass: mockService(GlobalStyleService)
        }
      ]
    }).compileComponents();

    globalStyleService = TestBed.get(GlobalStyleService);
    fixture = TestBed.createComponent(FakeComponent);
    component = fixture.componentInstance;
  });

  it('should add classname generated by Global Style Service', () => {
    const mockStyle = { display: 'grid' };
    component.inputStyle = mockStyle;
    globalStyleService.injectStyle.mockReturnValue('s_01 s_02');
    fixture.detectChanges();

    const classNames = fixture.debugElement.query(By.css('.something'))
      .nativeElement.className;
    expect(classNames).toContain('s_01 s_02');
  });
});
