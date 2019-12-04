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

  it("applies the grid configuration", () => {
    component.input = {
      type: ContentBlockType.GridContainer,
      items: new Array(4).fill(input),
      mobile: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto",
        gridGap: "20px",
        gridBlocks: [
          {
            rowStart: 1,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          }
        ]
      },
      tablet: {
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gridTemplateRows: "auto auto",
        gridGap: "20px",
        gridBlocks: [
          {
            rowStart: 1,
            rowSpan: 2,
            columnStart: 1,
            columnSpan: 2
          }
        ]
      },
      desktop: {
        gridTemplateColumns: "1fr 1fr 1fr 1fr 200px",
        gridTemplateRows: "auto auto",
        gridGap: "20px",
        gridBlocks: [
          {
            rowStart: 1,
            rowSpan: 2,
            columnStart: 1,
            columnSpan: 2
          }
        ]
      }
    };
    fixture.detectChanges();
    expect(fixture.componentInstance.style).toMatchInlineSnapshot(`
      Object {
        " > :nth-child(1)": Object {
          "gridColumnEnd": "span 1",
          "gridColumnStart": 1,
          "gridRowEnd": "span 1",
          "gridRowStart": 1,
          "msGridColumn": 1,
          "msGridColumnSpan": 1,
          "msGridRow": 1,
          "msGridRowSpan": 1,
        },
        "@media all": Object {
          "display": "-ms-grid",
        },
        "@media only screen and (min-width: 64em)": Object {
          " > :nth-child(1)": Object {
            "gridColumnEnd": "span 3",
            "gridColumnStart": 1,
            "gridRowEnd": "span 3",
            "gridRowStart": 1,
            "msGridColumn": 1,
            "msGridColumnSpan": 3,
            "msGridRow": 1,
            "msGridRowSpan": 3,
          },
          "@media all": Object {
            "display": "-ms-grid",
          },
          "display": "grid",
          "gridGap": "0",
          "gridTemplateColumns": "1fr 20px 1fr 20px 1fr 20px 1fr",
          "gridTemplateRows": "auto 20px auto",
          "msGridColumn": "1fr 20px 1fr 20px 1fr 20px 1fr",
        },
        "@media only screen and (min-width: 75em)": Object {
          " > :nth-child(1)": Object {
            "gridColumnEnd": "span 3",
            "gridColumnStart": 1,
            "gridRowEnd": "span 3",
            "gridRowStart": 1,
            "msGridColumn": 1,
            "msGridColumnSpan": 3,
            "msGridRow": 1,
            "msGridRowSpan": 3,
          },
          "@media all": Object {
            "display": "-ms-grid",
          },
          "display": "grid",
          "gridGap": "0",
          "gridTemplateColumns": "1fr 20px 1fr 20px 1fr 20px 1fr 20px 200px",
          "gridTemplateRows": "auto 20px auto",
          "msGridColumn": "1fr 20px 1fr 20px 1fr 20px 1fr 20px 200px",
        },
        "display": "grid",
        "gridGap": "0",
        "gridTemplateColumns": "1fr",
        "gridTemplateRows": "auto",
        "msGridColumn": "1fr",
      }
    `);
  });
});
