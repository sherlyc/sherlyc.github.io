import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By, TransferState } from "@angular/platform-browser";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import {
  Border,
  GridContainerVariation,
  IGridContainer
} from "../../../../common/__types__/IGridContainer";
import { DeviceService } from "../../services/device/device.service";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { ContentBlockDirective } from "../../shared/directives/content-block/content-block.directive";
import { GlobalStyleDirective } from "../../shared/directives/global-style/global-style.directive";
import registry from "../content-blocks.registry";
import { GridContainerComponent } from "./grid-container.component";
import { MediaQuery } from "./__types__/MediaQuery";

describe("GridContainerComponent", () => {
  let deviceService: ServiceMock<DeviceService>;
  let component: GridContainerComponent;
  let fixture: ComponentFixture<GridContainerComponent>;

  const input = ({
    type: "FakeContentBlock"
  } as unknown) as IContentBlock;

  @Component({
    selector: "app-fake-content-block",
    template: ""
  })
  class FakeContentBlockComponent {}

  const containerInput: IGridContainer = {
    type: ContentBlockType.GridContainer,
    items: {
      "first-block": [input]
    },
    mobile: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto",
      gridColumnGap: "20px",
      gridRowGap: "10px",
      gridBlocks: {
        "first-block": {
          rowStart: 1,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 1,
          border: []
        }
      }
    },
    tablet: {
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      gridTemplateRows: "auto",
      gridColumnGap: "20px",
      gridRowGap: "10px",
      gridBlocks: {
        "first-block": {
          rowStart: 1,
          rowSpan: 2,
          columnStart: 1,
          columnSpan: 2,
          border: [Border.bottom, Border.top, Border.right, Border.left]
        }
      }
    },
    desktop: {
      gridTemplateColumns: "1fr 1fr 1fr 1fr 200px",
      gridTemplateRows: "auto",
      gridColumnGap: "20px",
      gridRowGap: "10px",
      gridBlocks: {
        "first-block": {
          rowStart: 1,
          rowSpan: 2,
          columnStart: 1,
          columnSpan: 2,
          border: []
        }
      }
    }
  };

  beforeEach(async () => {
    // @ts-ignore
    registry["FakeContentBlockComponent"] = FakeContentBlockComponent;

    await TestBed.configureTestingModule({
      declarations: [
        GlobalStyleDirective,
        GridContainerComponent,
        ContentBlockDirective,
        FakeContentBlockComponent
      ],
      providers: [
        TransferState,
        {
          provide: DeviceService,
          useClass: mockService(DeviceService)
        }
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [FakeContentBlockComponent]
        }
      })
      .compileComponents();

    deviceService = TestBed.inject(DeviceService) as ServiceMock<DeviceService>;
    fixture = TestBed.createComponent(GridContainerComponent);
    component = fixture.componentInstance;

    deviceService.isGridSupported.mockReturnValue(true);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("applies the grid css", () => {
    component.input = containerInput;
    const expected = {
      display: "grid",
      [MediaQuery.All]: {
        display: "-ms-grid"
      },
      [MediaQuery.Mobile]: {
        msGridColumns: "1fr",
        gridTemplateColumns: "1fr",
        msGridRows: "auto",
        gridTemplateRows: "auto",
        gridGap: "0"
      },
      [MediaQuery.Tablet]: {
        msGridColumns: "1fr 20px 1fr 20px 1fr 20px 1fr",
        gridTemplateColumns: "1fr 20px 1fr 20px 1fr 20px 1fr",
        msGridRows: "auto",
        gridTemplateRows: "auto",
        gridGap: "0"
      },
      [MediaQuery.Desktop]: {
        msGridColumns: "1fr 20px 1fr 20px 1fr 20px 1fr 20px 200px",
        gridTemplateColumns: "1fr 20px 1fr 20px 1fr 20px 1fr 20px 200px",
        msGridRows: "auto",
        gridTemplateRows: "auto",
        gridGap: "0"
      }
    };
    fixture.detectChanges();
    expect(fixture.componentInstance.getGridCss()).toEqual(expected);
  });

  it("applies the cell css", () => {
    component.input = containerInput;
    const expected = {
      [MediaQuery.Mobile]: {
        msGridRow: 1,
        gridRowStart: 1,
        msGridRowSpan: 1,
        gridRowEnd: "span 1",
        msGridColumn: 1,
        gridColumnStart: 1,
        msGridColumnSpan: 1,
        gridColumnEnd: "span 1"
      },
      [MediaQuery.Tablet]: {
        msGridRow: 1,
        gridRowStart: 1,
        msGridRowSpan: 3,
        gridRowEnd: "span 3",
        msGridColumn: 1,
        gridColumnStart: 1,
        msGridColumnSpan: 3,
        gridColumnEnd: "span 3"
      },
      [MediaQuery.Desktop]: {
        msGridRow: 1,
        gridRowStart: 1,
        msGridRowSpan: 3,
        gridRowEnd: "span 3",
        msGridColumn: 1,
        gridColumnStart: 1,
        msGridColumnSpan: 3,
        gridColumnEnd: "span 3"
      }
    };
    fixture.detectChanges();
    expect(fixture.componentInstance.getCellCss("first-block")).toEqual(
      expected
    );
  });

  it("applies the border bottom css", () => {
    component.input = containerInput;
    const expected = {
      [MediaQuery.Mobile]: {
        display: "none"
      },
      [MediaQuery.Tablet]: {
        msGridRow: 4,
        gridRowStart: 4,
        msGridRowSpan: 1,
        gridRowEnd: "span 1",
        msGridColumn: 1,
        gridColumnStart: 1,
        msGridColumnSpan: 3,
        gridColumnEnd: "span 3"
      },
      [MediaQuery.Desktop]: {
        display: "none"
      }
    };
    fixture.detectChanges();
    expect(
      fixture.componentInstance.getBorderCellCss({
        name: "first-block",
        position: Border.bottom
      })
    ).toEqual(expected);
  });

  it("applies the border top css", () => {
    component.input = containerInput;
    const expected = {
      [MediaQuery.Mobile]: {
        display: "none"
      },
      [MediaQuery.Tablet]: {
        msGridRow: 0,
        gridRowStart: 0,
        msGridRowSpan: 1,
        gridRowEnd: "span 1",
        msGridColumn: 1,
        gridColumnStart: 1,
        msGridColumnSpan: 3,
        gridColumnEnd: "span 3"
      },
      [MediaQuery.Desktop]: {
        display: "none"
      }
    };
    fixture.detectChanges();
    expect(
      fixture.componentInstance.getBorderCellCss({
        name: "first-block",
        position: Border.top
      })
    ).toEqual(expected);
  });

  it("applies the border left css", () => {
    component.input = containerInput;
    const expected = {
      [MediaQuery.Mobile]: {
        display: "none"
      },
      [MediaQuery.Tablet]: {
        msGridRow: 1,
        gridRowStart: 1,
        msGridRowSpan: 3,
        gridRowEnd: "span 3",
        msGridColumn: 0,
        gridColumnStart: 0,
        msGridColumnSpan: 1,
        gridColumnEnd: "span 1"
      },
      [MediaQuery.Desktop]: {
        display: "none"
      }
    };
    fixture.detectChanges();
    expect(
      fixture.componentInstance.getBorderCellCss({
        name: "first-block",
        position: Border.left
      })
    ).toEqual(expected);
  });

  it("applies the border right css", () => {
    component.input = containerInput;
    const expected = {
      [MediaQuery.Mobile]: {
        display: "none"
      },
      [MediaQuery.Tablet]: {
        msGridRow: 1,
        gridRowStart: 1,
        msGridRowSpan: 3,
        gridRowEnd: "span 3",
        msGridColumn: 4,
        gridColumnStart: 4,
        msGridColumnSpan: 1,
        gridColumnEnd: "span 1"
      },
      [MediaQuery.Desktop]: {
        display: "none"
      }
    };
    fixture.detectChanges();
    expect(
      fixture.componentInstance.getBorderCellCss({
        name: "first-block",
        position: Border.right
      })
    ).toEqual(expected);
  });

  describe("layout fallback", () => {
    const gridBlocks = {
      "first-block": {
        rowStart: 1,
        rowSpan: 1,
        columnStart: 1,
        columnSpan: 1,
        border: []
      }
    };

    it("should assign mobile to tablet layout if it is not specified", () => {
      const mobileConfig = {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto",
        gridColumnGap: "20px",
        gridRowGap: "10px",
        gridBlocks
      };
      const desktopConfig = {
        gridTemplateColumns: "2fr",
        gridTemplateRows: "auto",
        gridColumnGap: "2px",
        gridRowGap: "2px",
        gridBlocks
      };
      component.input = {
        ...containerInput,
        mobile: mobileConfig,
        tablet: undefined,
        desktop: desktopConfig
      };

      fixture.detectChanges();

      expect(fixture.componentInstance.layouts).toEqual({
        mobile: mobileConfig,
        tablet: mobileConfig,
        desktop: desktopConfig
      });
    });

    it("should assign tablet to desktop layout if it is not specified", () => {
      const mobileConfig = {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto",
        gridColumnGap: "20px",
        gridRowGap: "10px",
        gridBlocks
      };
      const tabletConfig = {
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gridTemplateRows: "auto",
        gridColumnGap: "20px",
        gridRowGap: "10px",
        gridBlocks
      };
      component.input = {
        ...containerInput,
        mobile: mobileConfig,
        tablet: tabletConfig,
        desktop: undefined
      };

      fixture.detectChanges();

      expect(fixture.componentInstance.layouts).toEqual({
        mobile: mobileConfig,
        tablet: tabletConfig,
        desktop: tabletConfig
      });
    });

    it("should assign mobile layout for tablet and desktop when both are not specified", () => {
      const mobileConfig = {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto",
        gridColumnGap: "20px",
        gridRowGap: "10px",
        gridBlocks
      };
      component.input = {
        ...containerInput,
        mobile: mobileConfig,
        tablet: undefined,
        desktop: undefined
      };

      fixture.detectChanges();

      expect(fixture.componentInstance.layouts).toEqual({
        mobile: mobileConfig,
        tablet: mobileConfig,
        desktop: mobileConfig
      });
    });
  });

  it("should set variation class when specified", () => {
    component.input = {
      ...containerInput,
      variation: GridContainerVariation.GrayBackground
    };

    fixture.detectChanges();

    const grid: HTMLDivElement = fixture.debugElement.query(By.css("div"))
      .nativeElement;
    expect(grid.className).toContain(
      `variation-${component.input.variation}`.toLowerCase()
    );
  });

  it("should not set variation class when not specified", () => {
    component.input = {
      ...containerInput,
      variation: undefined
    };

    fixture.detectChanges();

    const grid = fixture.debugElement.query(By.css("div")).nativeElement;
    expect(grid.className).not.toContain(`variation`);
  });

  describe("when CSS Grid is not supported", () => {
    beforeEach(() => {
      deviceService.isGridSupported.mockReturnValueOnce(false);
    });

    it("generates table layout", () => {
      component.input = containerInput;
      fixture.detectChanges();
      const expected = [
        [
          {
            border: [],
            columnSpan: 2,
            columnStart: 1,
            key: "first-block",
            rowSpan: 2,
            rowStart: 1,
            width: 40
          }
        ]
      ];
      expect(fixture.componentInstance.table).toEqual(expected);
    });

    it("should set variation class when specified", () => {
      component.input = {
        ...containerInput,
        variation: GridContainerVariation.GrayBackground
      };

      fixture.detectChanges();

      const table: HTMLTableElement = fixture.debugElement.query(
        By.css("table")
      ).nativeElement;
      expect(table.className).toContain(
        `variation-${component.input.variation}`.toLowerCase()
      );
    });

    it("should not set variation class when not specified", () => {
      component.input = {
        ...containerInput,
        variation: undefined
      };

      fixture.detectChanges();

      const table: HTMLTableElement = fixture.debugElement.query(
        By.css("table")
      ).nativeElement;
      expect(table.className).not.toContain("variation");
    });
  });
});
