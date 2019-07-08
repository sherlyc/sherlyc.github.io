import { HeadlineComponent } from './headline.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeadlineFlagComponent } from '../headline-flag/headline-flag.component';
import { HeadlineFlags } from '../../../../../common/HeadlineFlags';

describe('Headline Component', () => {
  let component: HeadlineComponent;
  let fixture: ComponentFixture<HeadlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [HeadlineComponent, HeadlineFlagComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeadlineComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input data', () => {
    const headline = 'Windy Wellington';
    component.headline = headline;
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('h3')).nativeElement.textContent
    ).toEqual(headline);
  });

  it('should render flags if provided', () => {
    component.flags = [
      HeadlineFlags.VIDEO,
      HeadlineFlags.PHOTO,
      HeadlineFlags.SPONSORED
    ];
    fixture.detectChanges();

    const headlineFlagComponents = fixture.debugElement.queryAll(
      By.directive(HeadlineFlagComponent)
    );

    expect(headlineFlagComponents.length).toEqual(3);
  });

  it('should not render flags if not provided', () => {
    component.flags = [];
    fixture.detectChanges();

    const headlineFlagComponents = fixture.debugElement.queryAll(
      By.directive(HeadlineFlagComponent)
    );

    expect(headlineFlagComponents.length).toEqual(0);
  });
});
