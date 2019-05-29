import { HeadlineComponent } from './headline.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('Headline Component', () => {
  let component: HeadlineComponent;
  let fixture: ComponentFixture<HeadlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [HeadlineComponent]
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
});