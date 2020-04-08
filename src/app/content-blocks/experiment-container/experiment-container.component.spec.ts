import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By, TransferState } from "@angular/platform-browser";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { LoggerService } from "src/app/services/logger/logger.service";
import { ServiceMock } from "src/app/services/mocks/MockService";
import { RuntimeService } from "src/app/services/runtime/runtime.service";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IExperimentContainer } from "../../../../common/__types__/IExperimentContainer";
import { ExperimentName } from "../../../../common/ExperimentName";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { ExperimentService } from "../../services/experiment/experiment.service";
import { mockService } from "../../services/mocks/MockService";
import { ContentBlockDirective } from "../../shared/directives/content-block/content-block.directive";
import registry from "../content-blocks.registry";
import { ExperimentContainerComponent } from "./experiment-container.component";

describe("ExperimentContainerComponent", () => {
  let component: ExperimentContainerComponent;
  let fixture: ComponentFixture<ExperimentContainerComponent>;
  let experimentService: ServiceMock<ExperimentService>;
  let runtimeService: ServiceMock<RuntimeService>;
  let loggerService: ServiceMock<LoggerService>;
  let analyticsService: ServiceMock<AnalyticsService>;

  @Component({
    selector: "app-control-variant-content-block",
    template: ""
  })
  class ControlVariantContentBlockComponent {}

  @Component({
    selector: "app-other-variant-content-block",
    template: ""
  })
  class OtherVariantContentBlockComponent {}

  beforeAll(() => {
    // @ts-ignore
    registry[
      "ControlVariantContentBlockComponent"
    ] = ControlVariantContentBlockComponent;
    // @ts-ignore
    registry[
      "OtherVariantContentBlockComponent"
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
    experimentService = TestBed.inject(ExperimentService) as ServiceMock<
      ExperimentService
    >;
    runtimeService = TestBed.inject(RuntimeService) as ServiceMock<
      RuntimeService
    >;
    loggerService = TestBed.inject(LoggerService) as ServiceMock<LoggerService>;
    analyticsService = TestBed.inject(AnalyticsService) as ServiceMock<
      AnalyticsService
    >;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentContainerComponent);
    component = fixture.componentInstance;
  });

  // @ts-ignore
  const controlVariantContentBlock = {
    type: "ControlVariantContentBlock"
  } as IContentBlock;
  // @ts-ignore
  const otherVariantContentBlock = {
    type: "OtherVariantContentBlock"
  } as IContentBlock;

  it("should create", () => {
    component.input = {
      type: ContentBlockType.ExperimentContainer,
      name: "ExperimentName",
      variants: {
        control: [controlVariantContentBlock] as IContentBlock[],
        red: [otherVariantContentBlock] as IContentBlock[]
      }
    };

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe("when in server", () => {
    beforeEach(() => {
      runtimeService.isServer.mockReturnValue(true);
    });

    const experimentContainer: IExperimentContainer = {
      type: ContentBlockType.ExperimentContainer,
      name: "ExperimentName",
      variants: {
        control: [controlVariantContentBlock] as IContentBlock[],
        red: [otherVariantContentBlock] as IContentBlock[]
      }
    };

    it("should not call experiment service", async () => {
      component.input = experimentContainer;

      await component.ngOnInit();

      expect(experimentService.getVariant).not.toHaveBeenCalled();
    });

    it("should render control variant and not send analytics", async () => {
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
      expect(analyticsService.pushEvent).not.toHaveBeenCalled();
    });
  });

  describe("when in browser", () => {
    beforeEach(() => {
      runtimeService.isServer.mockReturnValue(false);
    });

    describe("when user is assigned to the container experiment", () => {
      it("should render variant that the user is assigned to and send analytics", async () => {
        const assignedExperiment = {
          name: "ExperimentOne",
          variant: "groupOne"
        };
        component.input = {
          type: ContentBlockType.ExperimentContainer,
          name: "ExperimentOne",
          variants: {
            control: [controlVariantContentBlock] as IContentBlock[],
            groupOne: [otherVariantContentBlock] as IContentBlock[]
          }
        };
        (experimentService.getExperiment as jest.Mock).mockResolvedValue(
          assignedExperiment
        );

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
        expect(analyticsService.pushEvent).toHaveBeenCalledWith({
          type: AnalyticsEventsType.EXPERIMENT,
          experiment: "ExperimentOne",
          variant: "groupOne"
        });
      });

      it("should render control variant and send analytics", async () => {
        const assignedExperiment = {
          name: "ExperimentOne",
          variant: "control"
        };
        component.input = {
          type: ContentBlockType.ExperimentContainer,
          name: "ExperimentOne",
          variants: {
            control: [controlVariantContentBlock] as IContentBlock[],
            groupOne: [otherVariantContentBlock] as IContentBlock[]
          }
        };
        (experimentService.getExperiment as jest.Mock).mockResolvedValue(
          assignedExperiment
        );

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
          experiment: "ExperimentOne",
          variant: "control"
        });
      });
    });

    describe("when user is not assigned to container experiment", () => {
      it("should render control and not send analytics when user is in a different experiment", async () => {
        const assignedExperiment = {
          name: "ExperimentTwo",
          variant: "groupTwo"
        };
        component.input = {
          type: ContentBlockType.ExperimentContainer,
          name: "ExperimentOne",
          variants: {
            control: [controlVariantContentBlock] as IContentBlock[],
            groupOne: [otherVariantContentBlock] as IContentBlock[]
          }
        };
        (experimentService.getExperiment as jest.Mock).mockResolvedValue(
          assignedExperiment
        );

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

      it("should render control and not send analytics when user is not assigned an experiment", async () => {
        const assignedExperiment = {
          name: ExperimentName.NotAssigned,
          variant: ExperimentName.NotAssigned
        };
        component.input = {
          type: ContentBlockType.ExperimentContainer,
          name: "ExperimentOne",
          variants: {
            control: [controlVariantContentBlock] as IContentBlock[],
            groupOne: [otherVariantContentBlock] as IContentBlock[]
          }
        };
        (experimentService.getExperiment as jest.Mock).mockResolvedValue(
          assignedExperiment
        );

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

    it("should render control, not send analytics and log error when variant assigned is not specified by container", async () => {
      const assignedExperiment = {
        name: "ExperimentOne",
        variant: "GroupThree"
      };
      const container: IExperimentContainer = {
        type: ContentBlockType.ExperimentContainer,
        name: "ExperimentOne",
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
