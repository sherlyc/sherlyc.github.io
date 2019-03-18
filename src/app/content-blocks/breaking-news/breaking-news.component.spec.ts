import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakingNewsComponent } from './breaking-news.component';
import { By } from '@angular/platform-browser';
import { CookieService } from '../../services/cookie/cookie.service';
import { CookieServiceMock } from '../../services/cookie/cookie.service.mock';

describe('BreakingNewsComponent', () => {
  let component: BreakingNewsComponent;
  let fixture: ComponentFixture<BreakingNewsComponent>;
  let cookieServiceMock: CookieServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreakingNewsComponent],
      providers: [
        {
          provide: CookieService,
          useClass: CookieServiceMock
        }
      ]
    }).compileComponents();
    cookieServiceMock = TestBed.get(CookieService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakingNewsComponent);
    component = fixture.componentInstance;

    component.input = {
      type: 'BreakingNews',
      id: 'whatever',
      text: 'breaking_news_text',
      link: 'breaking_news_link'
    };
    fixture.detectChanges();
    jest.spyOn(component, 'onClickOrDismiss');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show breaking news', async () => {
    expect(fixture.debugElement.query(By.css('.breaking-news'))).toBeTruthy();
  });

  it('should disappear when dismiss button is clicked', () => {
    fixture.debugElement.query(By.css('.dismiss')).nativeElement.click();
    fixture.detectChanges();
    expect(component.onClickOrDismiss).toHaveBeenCalled();
    expect(cookieServiceMock.set).toHaveBeenCalled();
    expect(fixture.debugElement.query(By.css('.breaking-news'))).toBeFalsy();
  });

  it('should disappear when the link is clicked', () => {
    fixture.debugElement.query(By.css('.link')).nativeElement.click();
    fixture.detectChanges();
    expect(component.onClickOrDismiss).toHaveBeenCalled();
    expect(cookieServiceMock.set).toHaveBeenCalled();
    expect(fixture.debugElement.query(By.css('.breaking-news'))).toBeFalsy();
  });
});
