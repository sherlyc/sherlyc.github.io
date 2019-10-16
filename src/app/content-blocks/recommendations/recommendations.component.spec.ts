import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationsComponent } from './recommendations.component';
import { CookieService } from '../../services/cookie/cookie.service';
import { mockService, ServiceMock } from '../../services/mocks/MockService';

describe('RecommendationsComponent', () => {
  let component: RecommendationsComponent;
  let fixture: ComponentFixture<RecommendationsComponent>;
  let cookieService: ServiceMock<CookieService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendationsComponent],
      providers: [
        {
          provide: CookieService,
          useClass: mockService(CookieService)
        }
      ]
    }).compileComponents();

    cookieService = TestBed.get(CookieService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
