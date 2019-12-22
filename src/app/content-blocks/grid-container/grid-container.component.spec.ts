import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TransferState } from "@angular/platform-browser";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import registry from "../content-blocks.registry";
import { ContentBlockDirective } from "../../shared/directives/content-block/content-block.directive";
import { GlobalStyleDirective } from "../../shared/directives/global-style/global-style.directive";
import { GridContainerComponent } from "./grid-container.component";
import {
  Border,
  IGridContainer
} from "../../../../common/__types__/IGridContainer";

describe("GridContainerComponent", () => {
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
      gridGap: "20px",
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
      gridGap: "20px",
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
      gridGap: "20px",
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
      providers: [TransferState]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [FakeContentBlockComponent]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(GridContainerComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("applies the grid css", () => {
    component.input = containerInput;
    const expected = {
      display: "grid",
      "@media all": {
        display: "-ms-grid"
      },
      "@media only screen and (max-width: 63.999em)": {
        msGridColumns: "1fr",
        gridTemplateColumns: "1fr",
        msGridRows: "auto",
        gridTemplateRows: "auto",
        gridGap: "0"
      },
      "@media only screen and (min-width: 64em) and (max-width: 74.999em)": {
        msGridColumns: "1fr 20px 1fr 20px 1fr 20px 1fr",
        gridTemplateColumns: "1fr 20px 1fr 20px 1fr 20px 1fr",
        msGridRows: "auto",
        gridTemplateRows: "auto",
        gridGap: "0"
      },
      "@media only screen and (min-width: 75em)": {
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
      "@media only screen and (max-width: 63.999em)": {
        msGridRow: 1,
        gridRowStart: 1,
        msGridRowSpan: 1,
        gridRowEnd: "span 1",
        msGridColumn: 1,
        gridColumnStart: 1,
        msGridColumnSpan: 1,
        gridColumnEnd: "span 1"
      },
      "@media only screen and (min-width: 64em) and (max-width: 74.999em)": {
        msGridRow: 1,
        gridRowStart: 1,
        msGridRowSpan: 3,
        gridRowEnd: "span 3",
        msGridColumn: 1,
        gridColumnStart: 1,
        msGridColumnSpan: 3,
        gridColumnEnd: "span 3"
      },
      "@media only screen and (min-width: 75em)": {
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
      "@media only screen and (max-width: 63.999em)": {
        display: "none"
      },
      "@media only screen and (min-width: 64em) and (max-width: 74.999em)": {
        msGridRow: 4,
        gridRowStart: 4,
        msGridRowSpan: 1,
        gridRowEnd: "span 1",
        msGridColumn: 1,
        gridColumnStart: 1,
        msGridColumnSpan: 3,
        gridColumnEnd: "span 3"
      },
      "@media only screen and (min-width: 75em)": {
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
      "@media only screen and (max-width: 63.999em)": {
        display: "none"
      },
      "@media only screen and (min-width: 64em) and (max-width: 74.999em)": {
        msGridRow: 0,
        gridRowStart: 0,
        msGridRowSpan: 1,
        gridRowEnd: "span 1",
        msGridColumn: 1,
        gridColumnStart: 1,
        msGridColumnSpan: 3,
        gridColumnEnd: "span 3"
      },
      "@media only screen and (min-width: 75em)": {
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
      "@media only screen and (max-width: 63.999em)": {
        display: "none"
      },
      "@media only screen and (min-width: 64em) and (max-width: 74.999em)": {
        msGridRow: 1,
        gridRowStart: 1,
        msGridRowSpan: 3,
        gridRowEnd: "span 3",
        msGridColumn: 0,
        gridColumnStart: 0,
        msGridColumnSpan: 1,
        gridColumnEnd: "span 1"
      },
      "@media only screen and (min-width: 75em)": {
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
      "@media only screen and (max-width: 63.999em)": {
        display: "none"
      },
      "@media only screen and (min-width: 64em) and (max-width: 74.999em)": {
        msGridRow: 1,
        gridRowStart: 1,
        msGridRowSpan: 3,
        gridRowEnd: "span 3",
        msGridColumn: 4,
        gridColumnStart: 4,
        msGridColumnSpan: 1,
        gridColumnEnd: "span 1"
      },
      "@media only screen and (min-width: 75em)": {
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
});
