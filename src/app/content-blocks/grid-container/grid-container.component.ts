import { Component, Input, OnInit } from "@angular/core";
import {
  IGridBlock,
  IGridConfig,
  IGridContainer
} from "../../../../common/__types__/IGridContainer";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import {
  gridBlockHandler,
  gridGapHandler
} from "../../shared/utils/grid-gap/grid-gap";

const media = {
  mobile: "@media only screen and (max-width: 63.999em)",
  tablet: "@media only screen and (min-width: 64em) and (max-width: 74.999em)",
  desktop: "@media only screen and (min-width: 75em)"
};

@Component({
  selector: "app-grid-container",
  templateUrl: "./grid-container.component.html"
})
export class GridContainerComponent implements IContentBlockComponent {
  @Input() input!: IGridContainer;

  getGridCss() {
    const { mobile, tablet, desktop } = this.input;
    return {
      display: "grid",
      "@media all": {
        display: "-ms-grid"
      },
      [media.mobile]: this.getGridDeviceCss(mobile),
      [media.tablet]: this.getGridDeviceCss(tablet),
      [media.desktop]: this.getGridDeviceCss(desktop)
    };
  }

  getGridDeviceCss(config: IGridConfig) {
    const templateColumns = gridGapHandler(
      config.gridTemplateColumns,
      config.gridGap
    );
    const templateRows = gridGapHandler(
      config.gridTemplateRows,
      config.gridGap
    );
    return {
      msGridColumns: templateColumns,
      gridTemplateColumns: templateColumns,
      msGridRows: templateRows,
      gridTemplateRows: templateRows,
      gridGap: "0"
    };
  }

  getCellCss(cellName: string) {
    const { mobile, tablet, desktop } = this.input;
    return {
      [media.mobile]: this.getCellDeviceCss(mobile.gridBlocks[cellName]),
      [media.tablet]: this.getCellDeviceCss(tablet.gridBlocks[cellName]),
      [media.desktop]: this.getCellDeviceCss(desktop.gridBlocks[cellName])
    };
  }

  private getCellDeviceCss(gridBlock: IGridBlock): any {
    const gridGapBlock = gridBlockHandler(gridBlock);
    return {
      msGridRow: gridGapBlock.rowStart,
      gridRowStart: gridGapBlock.rowStart,
      msGridRowSpan: gridGapBlock.rowSpan,
      gridRowEnd: `span ${gridGapBlock.rowSpan}`,
      msGridColumn: gridGapBlock.columnStart,
      gridColumnStart: gridGapBlock.columnStart,
      msGridColumnSpan: gridGapBlock.columnSpan,
      gridColumnEnd: `span ${gridGapBlock.columnSpan}`
    };
  }
}
