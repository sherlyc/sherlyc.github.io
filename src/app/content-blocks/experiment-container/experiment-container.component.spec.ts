import { ServiceMock } from 'src/app/services/mocks/MockService';
import { ExperimentService } from '../../services/experiment/experiment.service';
import { ExperimentContainerComponent } from './experiment-container.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { ContentBlockDirective } from '../../shared/directives/content-block/content-block.directive';
import { Component } from '@angular/core';
import { TransferState, By } from '@angular/platform-browser';
import { mockService } from '../../services/mocks/MockService';
import registry from '../content-blocks.registry';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { IExperimentContainer } from '../../../../common/__types__/IExperimentContainer';
import { RuntimeService } from 'src/app/services/runtime/runtime.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { AnalyticsEventsType } from '../../services/analytics/__types__/AnalyticsEventsType';

describe('ExperimentContainerComponent', () => {
  let component: ExperimentContainerComponent;
  let fixture: ComponentFixture<ExperimentContainerComponent>;
  let experimentService: ServiceMock<ExperimentService>;
  let runtimeService: ServiceMock<RuntimeService>;
  let loggerService: ServiceMock<LoggerService>;
  let analyticsService: ServiceMock<AnalyticsService>;

  @Component({
    selector: 'app-control-variant-content-block',
    template: ''
  })
  class ControlVariantContentBlockComponent {}

  @Component({
    selector: 'app-other-variant-content-block',
    template: ''
  })
  class OtherVariantContentBlockComponent {}

  beforeAll(() => {
    // @ts-ignore
    registry[
      'ControlVariantContentBlockComponent'
    ] = ControlVariantContentBlockComponent;
    // @ts-ignore
    registry[
      'OtherVariantContentBlockComponent'
    ] = OtherVariantContentBlockComponent;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [
        ExperimentContainerComponent,
        ContentBlockDirective,
        ControlVariantContentBlockComponent,
        OtherVariantContentBlockComponent
      ],
      providers: [
        {
          provide: TransferState,
          useClass: mockService(TransferState)
        },
        {
          provide: ExperimentService,
          useClass: mockService(ExperimentService)
        },
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        },
        {
          provide: LoggerService,
          useClass: mockService(LoggerService)
        },
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        }
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [
            ControlVariantContentBlockComponent,
            OtherVariantContentBlockComponent
          ]
        }
      })
      .compileComponents();
    experimentService = TestBed.get(ExperimentService);
    runtimeService = TestBed.get(RuntimeService);
    loggerService = TestBed.get(LoggerService);
    analyticsService = TestBed.get(AnalyticsService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentContainerComponent);
    component = fixture.componentInstance;
  });

  // @ts-ignore
  const controlVariantContentBlock = {
    type: 'ControlVariantContentBlock'
  } as IContentBlock;
  // @ts-ignore
  const otherVariantContentBlock = {
    type: 'OtherVariantContentBlock'
  } as IContentBlock;

  const experimentContainer: IExperimentContainer = {
    type: ContentBlockType.ExperimentContainer,
    name: 'ExperimentName',
    variants: {
      control: [controlVariantContentBlock] as IContentBlock[],
      red: [otherVariantContentBlock] as IContentBlock[]
    }
  };

  it('should create', () => {
    component.input = experimentContainer;

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render control variant', async () => {
    runtimeService.isBrowser.mockReturnValue(true);
    (experimentService.getVariant as jest.Mock).mockResolvedValue('control');
    component.input = experimentContainer;

    await component.ngOnInit();
    fixture.detectChanges();

    const controlVariantBlocks = fixture.debugElement.queryAll(
      By.directive(ControlVariantContentBlockComponent)
    );
    const otherVariantBlocks = fixture.debugElement.queryAll(
      By.directive(OtherVariantContentBlockComponent)
    );

    expect(controlVariantBlocks).toHaveLength(1);
    expect(otherVariantBlocks).toHaveLength(0);
  });

  it('should render other variant', async () => {
    runtimeService.isBrowser.mockReturnValue(true);
    (experimentService.getVariant as jest.Mock).mockResolvedValue('red');
    component.input = experimentContainer;

    await component.ngOnInit();
    fixture.detectChanges();

    const otherVariantBlocks = fixture.debugElement.queryAll(
      By.directive(OtherVariantContentBlockComponent)
    );
    const controlVariantBlocks = fixture.debugElement.queryAll(
      By.directive(ControlVariantContentBlockComponent)
    );

    expect(otherVariantBlocks).toHaveLength(1);
    expect(controlVariantBlocks).toHaveLength(0);
  });

  it('should not render any variant in server', async () => {
    runtimeService.isBrowser.mockReturnValue(false);
    component.input = experimentContainer;

    await component.ngOnInit();
    fixture.detectChanges();

    expect(component.contentBlocks).toHaveLength(0);
  });

  it('should log error when variant does not exist', async () => {
    runtimeService.isBrowser.mockReturnValue(true);
    (experimentService.getVariant as jest.Mock).mockResolvedValue(
      'invalidVariant'
    );
    component.input = { ...experimentContainer, variants: { control: [] } };

    await component.ngOnInit();
    fixture.detectChanges();

    expect(component.contentBlocks).toHaveLength(0);
    expect(loggerService.error).toHaveBeenCalled();
  });

  describe('Analytics', () => {
    it('should send analytics when experiment is displayed', async () => {
      runtimeService.isBrowser.mockReturnValue(true);
      (experimentService.getVariant as jest.Mock).mockResolvedValue('red');
      component.input = experimentContainer;

      await component.ngOnInit();

      const extra = new Map();
      extra.set('variant', 'red');
      extra.set('experiment', 'ExperimentName');
      expect(analyticsService.pushEvent).toHaveBeenCalledWith(
        AnalyticsEventsType.EXPERIMENT,
        extra
      );
    });
  });
});
