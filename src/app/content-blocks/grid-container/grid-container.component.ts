import { Component, Input, OnInit } from "@angular/core";
import {
  Border,
  IGridBlock,
  IGridConfig,
  IGridContainer
} from "../../../../common/__types__/IGridContainer";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import {
  calculateBorderCell,
  calculateCellGap,
  calculateGridGap
} from "../../shared/utils/grid-helper/grid-helper";

const media = {
  mobile: "@media only screen and (max-width: 63.999em)",
  tablet: "@media only screen and (min-width: 64em) and (max-width: 74.999em)",
  desktop: "@media only screen and (min-width: 75em)"
};

const hideCell = { display: "none" };

@Component({
  selector: "app-grid-container",
  styleUrls: ["./grid-container.component.scss"],
  templateUrl: "./grid-container.component.html"
})
export class GridContainerComponent implements IContentBlockComponent, OnInit {
  @Input() input!: IGridContainer;

  borderCells: Array<{
    name: string;
    position: Border;
  }> = [];

  ngOnInit(): void {
    this.applyBorder();
  }

  private applyBorder() {
    Object.keys(this.input.items).forEach((itemKey) => {
      const allBordersForCell = Object.keys(
        [
          this.input.desktop.gridBlocks[itemKey],
          this.input.tablet.gridBlocks[itemKey],
          this.input.mobile.gridBlocks[itemKey]
        ]
          .map((grid) => grid.border || [])
          .reduce((final, item) => [...final, ...item], [])
          .reduce((final, item) => ({ ...final, [item]: true }), {})
      );

      console.log(itemKey, allBordersForCell);
      this.borderCells.push(
        ...allBordersForCell.map((borderPosition: string) => ({
          name: itemKey,
          position: borderPosition as Border
        }))
      );
    });
  }

  getBorderCellCss(borderCell: { name: string; position: Border }) {
    const { mobile, tablet, desktop } = this.input;
    return {
      [media.mobile]: this.getBorderCellDeviceCss(
        calculateCellGap(mobile.gridBlocks[borderCell.name]),
        borderCell.position
      ),
      [media.tablet]: this.getBorderCellDeviceCss(
        calculateCellGap(tablet.gridBlocks[borderCell.name]),
        borderCell.position
      ),
      [media.desktop]: this.getBorderCellDeviceCss(
        calculateCellGap(desktop.gridBlocks[borderCell.name]),
        borderCell.position
      )
    };
  }

  private getBorderCellDeviceCss(gridBlock: IGridBlock, type: Border) {
    const hasBorder = (gridBlock.border || []).includes(type);
    return hasBorder
      ? this.getCellDeviceCss(calculateBorderCell[type](gridBlock))
      : hideCell;
  }

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

  private getGridDeviceCss(config: IGridConfig) {
    const templateColumns = calculateGridGap(
      config.gridTemplateColumns,
      config.gridGap
    );
    const templateRows = calculateGridGap(
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

    const mobileGap = calculateCellGap(mobile.gridBlocks[cellName]);
    const tabletGap = calculateCellGap(tablet.gridBlocks[cellName]);
    const desktopGap = calculateCellGap(desktop.gridBlocks[cellName]);

    return {
      [media.mobile]: this.getCellDeviceCss(mobileGap),
      [media.tablet]: this.getCellDeviceCss(tabletGap),
      [media.desktop]: this.getCellDeviceCss(desktopGap)
    };
  }

  private getCellDeviceCss(gridBlock: IGridBlock): any {
    return {
      msGridRow: gridBlock.rowStart,
      gridRowStart: gridBlock.rowStart,
      msGridRowSpan: gridBlock.rowSpan,
      gridRowEnd: `span ${gridBlock.rowSpan}`,
      msGridColumn: gridBlock.columnStart,
      gridColumnStart: gridBlock.columnStart,
      msGridColumnSpan: gridBlock.columnSpan,
      gridColumnEnd: `span ${gridBlock.columnSpan}`
    };
  }
}
