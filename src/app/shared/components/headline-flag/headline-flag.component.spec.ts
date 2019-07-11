import { HeadlineFlagComponent } from './headline-flag.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeadlineFlags } from '../../../../../common/HeadlineFlags';
import { By } from '@angular/platform-browser';
import { mockService, ServiceMock } from '../../../services/mocks/MockService';
import { FeatureSwitchService } from '../../../services/feature-switch/feature-switch.service';

describe('Headline Flag Component', () => {
  let component: HeadlineFlagComponent;
  let fixture: ComponentFixture<HeadlineFlagComponent>;
  let featureSwitchService: ServiceMock<FeatureSwitchService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: FeatureSwitchService,
          useClass: mockService(FeatureSwitchService)
        }
      ],
      declarations: [HeadlineFlagComponent]
    }).compileComponents();

    featureSwitchService = TestBed.get(FeatureSwitchService);
    fixture = TestBed.createComponent(HeadlineFlagComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it.each([
    [HeadlineFlags.ADVERTISEMENT, '.advertisement-flag'],
    [HeadlineFlags.SPONSORED, '.sponsored-flag'],
    [HeadlineFlags.STUFF_NATION, '.stuff-nation-flag'],
    [HeadlineFlags.PHOTO, '.photo-flag'],
    [HeadlineFlags.VIDEO, '.video-flag']
  ])(
    'should show %s when feature switch is on',
    async (headlineFlag, headlineFlagSelector) => {
      featureSwitchService.getFeature.mockReturnValue(true);
      component.flag = headlineFlag as HeadlineFlags;

      await component.ngOnInit();
      fixture.detectChanges();

      const advertisementFlagElement = fixture.debugElement.query(
        By.css(headlineFlagSelector)
      );

      expect(advertisementFlagElement).toBeTruthy();
    }
  );

  it.each([
    [HeadlineFlags.ADVERTISEMENT, '.advertisement-flag'],
    [HeadlineFlags.SPONSORED, '.sponsored-flag'],
    [HeadlineFlags.STUFF_NATION, '.stuff-nation-flag'],
    [HeadlineFlags.PHOTO, '.photo-flag'],
    [HeadlineFlags.VIDEO, '.video-flag']
  ])(
    'should not show %s when feature switch is off',
    async (headlineFlag, headlineFlagSelector) => {
      featureSwitchService.getFeature.mockReturnValue(false);
      component.flag = headlineFlag as HeadlineFlags;

      await component.ngOnInit();
      fixture.detectChanges();

      const advertisementFlagElement = fixture.debugElement.query(
        By.css(headlineFlagSelector)
      );

      expect(advertisementFlagElement).toBeFalsy();
    }
  );
});
