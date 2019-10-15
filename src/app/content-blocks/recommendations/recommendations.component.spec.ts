import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationsComponent } from './recommendations.component';
import { CookieService } from '../../services/cookie/cookie.service';
import { mockService, ServiceMock } from '../../services/mocks/MockService';
import { RecommendationsService } from '../../services/recommendations.service';
import { of } from 'rxjs';

describe('RecommendationsComponent', () => {
  let component: RecommendationsComponent;
  let fixture: ComponentFixture<RecommendationsComponent>;
  let recommendationsService: ServiceMock<RecommendationsService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendationsComponent],
      providers: [
        {
          provide: RecommendationsService,
          useClass: mockService(RecommendationsService)
        }
      ]
    }).compileComponents();

    recommendationsService = TestBed.get(RecommendationsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display articles from recommendations service', async () => {
    const articles = [
      {
        id: 'abcd',
        indexHeadline: 'abcd',
        introText: 'abcd',
        linkUrl: 'abcd',
        defconSrc: '123123',
        imageSrc: '123123',
        strapImageSrc: '123123',
        imageSrcSet: '123123',
        strapImageSrcSet: '123123',
        lastPublishedTime: 123123,
        headlineFlags: []
      }
    ];
    recommendationsService.getRecommendations.mockReturnValue(of(articles));

    await component.ngOnInit();

    expect(recommendationsService.getRecommendations).toHaveBeenCalled();
  });
});
