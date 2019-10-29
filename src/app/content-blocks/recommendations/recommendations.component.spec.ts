import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IBasicArticleSection } from '../../../../common/__types__/IBasicArticleSection';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { IRecommendations } from '../../../../common/__types__/IRecommendations';
import { FeatureSwitchService } from '../../services/feature-switch/feature-switch.service';
import { mockService, ServiceMock } from '../../services/mocks/MockService';
import { RecommendationsService } from '../../services/recommendations/recommendations.service';
import { RuntimeService } from '../../services/runtime/runtime.service';
import { RecommendationsComponent } from './recommendations.component';

describe('RecommendationsComponent', () => {
  let component: RecommendationsComponent;
  let fixture: ComponentFixture<RecommendationsComponent>;
  let recommendationsService: ServiceMock<RecommendationsService>;
  let featureSwitchService: ServiceMock<FeatureSwitchService>;
  let runtimeService: ServiceMock<RuntimeService>;

  const recommendationsData: IRecommendations = {
    type: ContentBlockType.Recommendations,
    displayName: 'Recommended for You',
    displayNameColor: 'darkblue',
    totalBasicArticlesUnit: 2,
    totalBasicArticleTitleUnit: 3
  };

  const mockContentBlocks = new Array(5).fill(({
    type: 'FakeContentBlock'
  } as any) as IContentBlock);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecommendationsComponent],
      providers: [
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        },
        {
          provide: RecommendationsService,
          useClass: mockService(RecommendationsService)
        },
        {
          provide: FeatureSwitchService,
          useClass: mockService(FeatureSwitchService)
        }
      ]
    })
      .overrideComponent(RecommendationsComponent, {
        set: {
          template: ''
        }
      })
      .compileComponents();

    runtimeService = TestBed.get(RuntimeService);
    recommendationsService = TestBed.get(RecommendationsService);
    featureSwitchService = TestBed.get(FeatureSwitchService);

    fixture = TestBed.createComponent(RecommendationsComponent);
    component = fixture.componentInstance;
    component.input = recommendationsData;
  });

  describe('when in browser', () => {
    beforeEach(() => {
      runtimeService.isBrowser.mockReturnValue(true);
      recommendationsService.getRecommendations.mockReturnValue(
        of(mockContentBlocks)
      );
    });

    describe('when RecommendationDisplay feature flag is on', () => {
      beforeEach(() => {
        featureSwitchService.getFeature.mockResolvedValue(true);
      });

      it('calls recommendations service', () => {
        fixture.detectChanges();
        expect(recommendationsService.getRecommendations).toHaveBeenCalledWith(
          recommendationsData.totalBasicArticlesUnit,
          recommendationsData.totalBasicArticleTitleUnit
        );
      });

      it('wraps articles in a basic article section', async () => {
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.contentBlocks).toEqual([
          {
            type: ContentBlockType.BasicArticleSection,
            displayName: recommendationsData.displayName,
            displayNameColor: recommendationsData.displayNameColor,
            items: mockContentBlocks
          } as IBasicArticleSection
        ]);
      });

      it('should render when recommended articles loaded', async () => {
        expect(component.contentBlocks.length).toBe(0);
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.contentBlocks.length).toBe(1);
      });

      it('should not render when no recommended articles returned', async () => {
        (recommendationsService.getRecommendations as jest.Mock).mockReturnValueOnce(
          of([])
        );
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.contentBlocks.length).toBe(0);
      });
    });

    describe('when RecommendationDisplay feature flag is off', () => {
      beforeEach(() => {
        featureSwitchService.getFeature.mockResolvedValue(false);
      });

      it('calls recommendations service', () => {
        fixture.detectChanges();
        expect(recommendationsService.getRecommendations).toHaveBeenCalledWith(
          recommendationsData.totalBasicArticlesUnit,
          recommendationsData.totalBasicArticleTitleUnit
        );
      });

      it('should not render', async () => {
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.contentBlocks.length).toBe(0);
      });
    });
  });

  describe('when in server', () => {
    beforeEach(() => {
      runtimeService.isBrowser.mockReturnValue(false);
    });

    it('should skip execution', async () => {
      (runtimeService.isBrowser as jest.Mock).mockReturnValueOnce(false);
      fixture.detectChanges();
      await fixture.whenStable();
      expect(featureSwitchService.getFeature).not.toHaveBeenCalled();
      expect(recommendationsService.getRecommendations).not.toHaveBeenCalled();
      expect(component.contentBlocks).toEqual([]);
    });
  });
});
