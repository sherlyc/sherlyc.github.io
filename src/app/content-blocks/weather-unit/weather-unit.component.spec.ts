import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherUnitComponent } from './weather-unit.component';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { By, TransferState } from '@angular/platform-browser';
import { WeatherLocations } from '../../../../common/WeatherLocations';
import { StoreService, StorageKeys } from '../../services/store/store.service';
import { mockService, ServiceMock } from '../../services/mocks/MockService';
import { RuntimeService } from '../../services/runtime/runtime.service';

describe('WeatherUnitComponent', () => {
  let component: WeatherUnitComponent;
  let fixture: ComponentFixture<WeatherUnitComponent>;
  let storeService: ServiceMock<StoreService>;
  let runtimeService: ServiceMock<RuntimeService>;
  let storeServiceGetSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherUnitComponent],
      providers: [
        {
          provide: TransferState,
          useClass: mockService(TransferState)
        },
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        }
      ]
    }).compileComponents();

    runtimeService = TestBed.get(RuntimeService);
    storeService = TestBed.get(StoreService);
    runtimeService.isBrowser.mockReturnValue(true);
    storeServiceGetSpy = jest.spyOn(storeService, 'get');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherUnitComponent);
    component = fixture.componentInstance;

    component.input = {
      type: ContentBlockType.WeatherUnit
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display region list when weather label is clicked', () => {
    component.isDropdownOpen = false;
    expect(
      fixture.debugElement.query(By.css('.weatherLocationList'))
    ).toBeFalsy();

    fixture.debugElement.query(By.css('.weatherLabel')).nativeElement.click();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.weatherLocationList'))
    ).toBeTruthy();
  });

  it('should hide region list when weather label is clicked and region list is already displayed', () => {
    component.isDropdownOpen = true;
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.weatherLocationList'))
    ).toBeTruthy();

    fixture.debugElement.query(By.css('.weatherLabel')).nativeElement.click();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.weatherLocationList'))
    ).toBeFalsy();
  });

  it('should display tick for selected location', () => {
    component.regions = [
      {
        name: 'Auckland',
        locations: [WeatherLocations.Auckland]
      }
    ];
    component.isDropdownOpen = true;
    component.selectedLocation = WeatherLocations.Auckland;
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.weatherLocationTickSymbol'))
    ).toBeTruthy();
  });

  it('should not display tick for non selected location', () => {
    component.regions = [
      {
        name: 'Auckland',
        locations: [WeatherLocations.Auckland]
      }
    ];
    component.isDropdownOpen = true;
    component.selectedLocation = '';
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.weatherLocationTickSymbol'))
    ).toBeFalsy();
  });

  it('should save last selected location', () => {
    const storeServiceSetSpy = jest.spyOn(storeService, 'set');
    component.regions = [
      {
        name: 'Auckland',
        locations: [WeatherLocations.Auckland]
      }
    ];
    component.isDropdownOpen = true;
    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('.weatherLocationItem'))
      .nativeElement.click();

    expect(storeServiceSetSpy).toHaveBeenCalledWith(
      StorageKeys.WeatherLocation,
      'Auckland'
    );
  });

  it('should load last selected location', () => {
    component.selectedLocation = WeatherLocations.Auckland;
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.weatherLocationInfo'))
    ).toBeTruthy();
  });

  it('should collapse location list after selecting a location', () => {
    component.isDropdownOpen = true;
    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('.weatherLocationItem'))
      .nativeElement.click();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.weatherLocationList'))
    ).toBeFalsy();
    expect(
      fixture.debugElement.query(By.css('.weatherLocationInfo'))
    ).toBeTruthy();
  });
});
