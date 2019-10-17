import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IRecommendations } from '../../../../common/__types__/IRecommendations';
import { mockService, ServiceMock } from '../../services/mocks/MockService';
import { RecommendationsService } from '../../services/recommendations/recommendations.service';
import { RuntimeService } from '../../services/runtime/runtime.service';
import { ContentBlockDirective } from '../../shared/directives/content-block/content-block.directive';
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecommendationsComponent, ContentBlockDirective],
      providers: [
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        },
        RecommendationsService
      ]
    }).compileComponents();

    runtime = TestBed.get(RuntimeService);
    isBrowserSpy = jest.spyOn(runtime, 'isBrowser').mockReturnValue(true);
    recommendationsService = TestBed.get(RecommendationsService);
    getRecommendationsSpy = jest
      .spyOn(recommendationsService, 'getRecommendations')
      .mockReturnValue(of([]));

    fixture = TestBed.createComponent(RecommendationsComponent);
    component = fixture.componentInstance;
    component.input = recommendationsData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls recommendations service to get data', () => {
    expect(getRecommendationsSpy).toHaveBeenCalledWith(
      recommendationsData.totalBasicArticlesUnit,
      recommendationsData.totalBasicArticleTitleUnit
    );
  });
});
