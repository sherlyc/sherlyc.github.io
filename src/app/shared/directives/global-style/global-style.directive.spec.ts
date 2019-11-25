import { Component } from '@angular/core';
import { GlobalStyleDirective } from './global-style.directive';
import { GlobalStyleService } from '../../../services/global-style/global-style.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockService, ServiceMock } from '../../../services/mocks/MockService';

@Component({
  selector: 'app-fake-component',
  template: '<div [appGlobalStyle]="inputStyle"></div>'
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
        { provide: GlobalStyleService, useClass: mockService(GlobalStyleService) }
      ]
    }).compileComponents();
    globalStyleService = TestBed.get(GlobalStyleService);

    fixture = TestBed.createComponent(FakeComponent);
    component = fixture.componentInstance;
  });

  it('should inject Style via Global Style Service', () => {
    const mockResult = 'test';
    const mockStyle = {};

    globalStyleService.injectStyle.mockReturnValue(mockResult);
    const result = globalStyleService.injectStyle(mockStyle);

    component.inputStyle = mockStyle;
    fixture.detectChanges();

    expect(globalStyleService.injectStyle).toHaveBeenCalledWith(mockStyle);
    expect(result).toEqual(mockResult);
  });
});
