import { ServiceMock } from 'src/app/services/mocks/MockService';
import { ExperimentService } from '../../services/experiment/experiment.service';
import { ExperimentContainerComponent } from './experiment-container.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { ContentBlockDirective } from '../../shared/directives/content-block/content-block.directive';
import { Component } from '@angular/core';
import { By, TransferState } from '@angular/platform-browser';
import { mockService } from '../../services/mocks/MockService';
import registry from '../content-blocks.registry';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { IExperimentContainer } from '../../../../common/__types__/IExperimentContainer';
import { RuntimeService } from 'src/app/services/runtime/runtime.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { AnalyticsEventsType } from '../../services/analytics/__types__/AnalyticsEventsType';
import { Experiments } from '../../../../common/Experiments';

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

  describe('when in server', () => {
    beforeEach(() => {
      runtimeService.isServer.mockReturnValue(true);
    });

    it('should not call experiment service', async () => {
      component.input = experimentContainer;

      await component.ngOnInit();

      expect(experimentService.getVariant).not.toHaveBeenCalled();
    });

    it('should render control variant', async () => {
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
  });

  describe('when in browser', () => {
    beforeEach(() => {
      runtimeService.isServer.mockReturnValue(false);
    });

    describe('when user is assigned to the container experiment', () => {
      it('should render variant that the user is assigned to and send analytics', async () => {
        const assignedExperiment = {
          name: 'ExperimentOne',
          variant: 'groupOne'
        };
        const container: IExperimentContainer = {
          type: ContentBlockType.ExperimentContainer,
          name: 'ExperimentOne',
          variants: {
            control: [controlVariantContentBlock] as IContentBlock[],
            groupOne: [otherVariantContentBlock] as IContentBlock[]
          }
        };
        (experimentService.getExperiment as jest.Mock).mockResolvedValue(
          assignedExperiment
        );
        component.input = container;

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

      it('should render control variant and send analytics', async () => {
        const assignedExperiment = {
          name: 'ExperimentOne',
          variant: 'control'
        };
        const container: IExperimentContainer = {
          type: ContentBlockType.ExperimentContainer,
          name: 'ExperimentOne',
          variants: {
            control: [controlVariantContentBlock] as IContentBlock[],
            groupOne: [otherVariantContentBlock] as IContentBlock[]
          }
        };
        (experimentService.getExperiment as jest.Mock).mockResolvedValue(
          assignedExperiment
        );
        component.input = container;

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
        expect(analyticsService.pushEvent).toHaveBeenCalledWith({
          type: AnalyticsEventsType.EXPERIMENT,
          experiment: 'ExperimentOne',
          variant: 'control'
        });
      });
    });

    describe('when user is not assigned to container experiment', () => {
      it('should render control and not send analytics when user is in a different experiment', async () => {
        const assignedExperiment = {
          name: 'ExperimentTwo',
          variant: 'groupTwo'
        };
        const container: IExperimentContainer = {
          type: ContentBlockType.ExperimentContainer,
          name: 'ExperimentOne',
          variants: {
            control: [controlVariantContentBlock] as IContentBlock[],
            groupOne: [otherVariantContentBlock] as IContentBlock[]
          }
        };
        (experimentService.getExperiment as jest.Mock).mockResolvedValue(
          assignedExperiment
        );
        component.input = container;

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
        expect(analyticsService.pushEvent).not.toHaveBeenCalled();
      });

      it('should render control and not send analytics when user is not assigned an experiment', async () => {
        const assignedExperiment = {
          name: Experiments.NotAssigned,
          variant: Experiments.NotAssigned
        };
        const container: IExperimentContainer = {
          type: ContentBlockType.ExperimentContainer,
          name: 'ExperimentOne',
          variants: {
            control: [controlVariantContentBlock] as IContentBlock[],
            groupOne: [otherVariantContentBlock] as IContentBlock[]
          }
        };
        (experimentService.getExperiment as jest.Mock).mockResolvedValue(
          assignedExperiment
        );
        component.input = container;

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
        expect(analyticsService.pushEvent).not.toHaveBeenCalled();
      });
    });

    it('should render control, not send analytics and log error when variant assigned is not specified by container', async () => {
      const assignedExperiment = {
        name: 'ExperimentOne',
        variant: 'GroupThree'
      };
      const container: IExperimentContainer = {
        type: ContentBlockType.ExperimentContainer,
        name: 'ExperimentOne',
        variants: {
          control: [controlVariantContentBlock] as IContentBlock[],
          groupOne: [otherVariantContentBlock] as IContentBlock[]
        }
      };
      (experimentService.getExperiment as jest.Mock).mockResolvedValue(
        assignedExperiment
      );
      component.input = container;

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
      expect(analyticsService.pushEvent).not.toHaveBeenCalled();
      expect(loggerService.error).toHaveBeenCalled();
    });
  });
});
