import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { CopyrightComponent } from '../../shared/components/copyright/copyright.component';
import { mockService, ServiceMock } from 'src/app/services/mocks/MockService';
import { AnalyticsEventsType } from '../../services/analytics/__types__/AnalyticsEventsType';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { ConfigService } from '../../services/config/config.service';
import { IEnvironmentDefinition } from '../../services/config/__types__/IEnvironmentDefinition';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Subject } from 'rxjs';

describe('Header', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;
  let configService: ServiceMock<ConfigService>;
  let authenticationService: ServiceMock<AuthenticationService>;
  const profileUrl = 'https://my.stuff.co.nz/publicprofile';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, CopyrightComponent],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        },
        {
          provide: ConfigService,
          useClass: mockService(ConfigService)
        },
        {
          provide: AuthenticationService,
          useClass: mockService(AuthenticationService)
        }
      ]
    }).compileComponents();
    analyticsService = TestBed.get(AnalyticsService);
    configService = TestBed.get(ConfigService);
    authenticationService = TestBed.get(AuthenticationService);
    authenticationService.authenticationStateChange = new Subject<any>();

    configService.getConfig.mockReturnValue({
      loginLibrary: {
        authProvider: 'https://my.stuff.co.nz'
      }
    } as IEnvironmentDefinition);
    fixture = TestBed.createComponent(HeaderComponent);
  });

  it('should display navigation when hamburger menu is clicked', () => {
    fixture.detectChanges();

    let navigation = fixture.debugElement.query(By.css('.navigation'));
    expect(navigation).toBeFalsy();

    fixture.componentInstance.toggleMenu();
    fixture.detectChanges();

    navigation = fixture.debugElement.query(By.css('.navigation'));
    expect(navigation).toBeTruthy();
  });

  describe('Analytics', () => {
    it('should push analytics event when hamburger menu is opened', () => {
      fixture.componentInstance.navigationVisible = false;
      fixture.detectChanges();

      fixture.debugElement.query(By.css('.menu')).nativeElement.click();

      expect(analyticsService.pushEvent).toHaveBeenCalledWith({
        type: AnalyticsEventsType.MENU_NAV_OPENED
      });
    });

    it('should push analytics event when stuff logo is clicked', () => {
      fixture.debugElement.query(By.css('.title')).nativeElement.click();

      expect(analyticsService.pushEvent).toHaveBeenCalledWith({
        type: AnalyticsEventsType.STUFF_LOGO_CLICKED
      });
    });

    it('should push analytics event when menu section is clicked', () => {
      fixture.componentInstance.navigationVisible = true;
      fixture.detectChanges();
      fixture.debugElement
        .query(By.css('.section-Homed'))
        .nativeElement.click();

      expect(analyticsService.pushEvent).toHaveBeenCalledWith({
        type: AnalyticsEventsType.MENU_NAV_SECTION_CLICKED,
        section: 'Homed'
      });
    });
  });

  describe('User authentication', () => {
    it('should show a Login text when the user is not logged in', () => {
      fixture.componentInstance.navigationVisible = true;
      fixture.componentInstance.isLoggedIn = false;
      fixture.detectChanges();

      const text = fixture.debugElement.query(By.css('.user')).nativeElement
        .textContent;

      expect(text).toBe('Login');
    });

    it('should initiate a login when user clicks on login', () => {
      fixture.componentInstance.navigationVisible = true;
      fixture.componentInstance.isLoggedIn = false;
      fixture.detectChanges();

      fixture.debugElement.query(By.css('.user')).nativeElement.click();

      fixture.detectChanges();

      expect(authenticationService.login).toHaveBeenCalled();
    });

    it('should show an avatar when the user is logged in', () => {
      fixture.componentInstance.navigationVisible = true;
      fixture.componentInstance.isLoggedIn = true;
      fixture.detectChanges();

      const user = fixture.debugElement.query(By.css('.user'));

      expect(user).toBeTruthy();
      expect(user.nativeElement.getAttribute('href')).toBe(profileUrl);
    });
  });
});
