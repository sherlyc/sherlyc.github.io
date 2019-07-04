import { HeadlineFlagComponent } from './headline-flag.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeadlineFlags } from '../../../../../common/HeadlineFlags';
import { By } from '@angular/platform-browser';

describe('Headline Flag Component', () => {
  let component: HeadlineFlagComponent;
  let fixture: ComponentFixture<HeadlineFlagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [HeadlineFlagComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeadlineFlagComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show video flag', () => {
    component.flag = HeadlineFlags.VIDEO;
    fixture.detectChanges();

    const videoFlagElement = fixture.debugElement.query(By.css('.video-flag'))
      .nativeElement;

    expect(videoFlagElement).toBeTruthy();
  });

  it('should show photo flag', () => {
    component.flag = HeadlineFlags.PHOTO;
    fixture.detectChanges();

    const photoFlagElement = fixture.debugElement.query(By.css('.photo-flag'))
      .nativeElement;

    expect(photoFlagElement).toBeTruthy();
  });

  it('should show stuff nation flag', () => {
    component.flag = HeadlineFlags.STUFF_NATION;
    fixture.detectChanges();

    const stuffNationFlagElement = fixture.debugElement.query(
      By.css('.stuff-nation-flag')
    ).nativeElement;

    expect(stuffNationFlagElement).toBeTruthy();
  });

  it('should show sponsored flag', () => {
    component.flag = HeadlineFlags.SPONSORED;
    fixture.detectChanges();

    const sponsoredFlagElement = fixture.debugElement.query(
      By.css('.sponsored-flag')
    ).nativeElement;

    expect(sponsoredFlagElement).toBeTruthy();
  });

  it('should show advertisement flag', () => {
    component.flag = HeadlineFlags.ADVERTISEMENT;
    fixture.detectChanges();

    const advertisementFlagElement = fixture.debugElement.query(
      By.css('.advertisement-flag')
    ).nativeElement;

    expect(advertisementFlagElement).toBeTruthy();
  });
});
