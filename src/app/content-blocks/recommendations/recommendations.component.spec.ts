import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IBasicArticleSection } from '../../../../common/__types__/IBasicArticleSection';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { IRecommendations } from '../../../../common/__types__/IRecommendations';
import { mockService, ServiceMock } from '../../services/mocks/MockService';
import { RecommendationsService } from '../../services/recommendations/recommendations.service';
import { RuntimeService } from '../../services/runtime/runtime.service';
import { RecommendationsComponent } from './recommendations.component';

jest.mock('../../services/recommendations/recommendations.service');

describe('RecommendationsComponent', () => {
  let component: RecommendationsComponent;
  let fixture: ComponentFixture<RecommendationsComponent>;
  let recommendationsService: ServiceMock<RecommendationsService>;
  let getRecommendationsSpy: jest.SpyInstance;
  let runtime: ServiceMock<RuntimeService>;
  let isBrowserSpy: jest.SpyInstance;

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
        RecommendationsService
      ]
    })
      .overrideComponent(RecommendationsComponent, {
        set: {
          template: ''
        }
      })
      .compileComponents();

    runtime = TestBed.get(RuntimeService);
    isBrowserSpy = jest.spyOn(runtime, 'isBrowser').mockReturnValue(true);
    recommendationsService = TestBed.get(RecommendationsService);
    getRecommendationsSpy = jest
      .spyOn(recommendationsService, 'getRecommendations')
      .mockReturnValue(of(mockContentBlocks));

    fixture = TestBed.createComponent(RecommendationsComponent);
    component = fixture.componentInstance;
    component.input = recommendationsData;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls recommendations service', () => {
    fixture.detectChanges();
    expect(getRecommendationsSpy).toHaveBeenCalledWith(
      recommendationsData.totalBasicArticlesUnit,
      recommendationsData.totalBasicArticleTitleUnit
    );
  });

  it('wraps articles in a basic article section', () => {
    fixture.detectChanges();
    expect(component.contentBlocks).toEqual([
      {
        type: ContentBlockType.BasicArticleSection,
        displayName: recommendationsData.displayName,
        displayNameColor: recommendationsData.displayNameColor,
        items: mockContentBlocks
      } as IBasicArticleSection
    ]);
  });

  it('should be hidden before articles are loaded', () => {
    expect(component.hidden).toBe(true);
    fixture.detectChanges();
    expect(component.hidden).toBe(false);
  });
});
