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

  layouts!: {
    mobile: IGridConfig;
    tablet: IGridConfig;
    desktop: IGridConfig;
  };

  private static getBorderCss(gridBlock: IGridBlock, type: Border) {
    const hasBorder = gridBlock.border.includes(type);
    return hasBorder
      ? GridContainerComponent.getCellCss(calculateBorderCell(type, gridBlock))
      : hideCell;
  }

  private static getGridCssForDevice(config: IGridConfig) {
    const templateColumns = calculateGridGap(
      config.gridTemplateColumns,
      config.gridColumnGap
    );

    const templateRows = calculateGridGap(
      config.gridTemplateRows,
      config.gridRowGap
    );

    return {
      msGridColumns: templateColumns,
      gridTemplateColumns: templateColumns,
      msGridRows: templateRows,
      gridTemplateRows: templateRows,
      gridGap: "0"
    };
  }

  private static getCellCss(gridBlock: IGridBlock): any {
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

  ngOnInit(): void {
    this.assignLayouts();
    this.createBorderCells();
  }

  private createBorderCells() {
    const { mobile, tablet, desktop } = this.layouts;

    Object.keys(this.input.items).forEach((itemKey) => {
      const allBordersForCell = Object.keys(
        [
          desktop.gridBlocks[itemKey],
          tablet.gridBlocks[itemKey],
          mobile.gridBlocks[itemKey]
        ]
          .map((grid) => grid.border || [])
          .reduce((final, item) => [...final, ...item], [])
          .reduce((final, item) => ({ ...final, [item]: true }), {})
      );
      this.borderCells.push(
        ...allBordersForCell.map((borderPosition: string) => ({
          name: itemKey,
          position: borderPosition as Border
        }))
      );
    });
  }

  private assignLayouts() {
    const { mobile, tablet = mobile, desktop = tablet } = this.input;
    this.layouts = { mobile, tablet, desktop };
  }

  getBorderCellCss(borderCell: { name: string; position: Border }) {
    const { mobile, tablet, desktop } = this.layouts;
    return {
      [media.mobile]: GridContainerComponent.getBorderCss(
        calculateCellGap(mobile.gridBlocks[borderCell.name]),
        borderCell.position
      ),
      [media.tablet]: GridContainerComponent.getBorderCss(
        calculateCellGap(tablet.gridBlocks[borderCell.name]),
        borderCell.position
      ),
      [media.desktop]: GridContainerComponent.getBorderCss(
        calculateCellGap(desktop.gridBlocks[borderCell.name]),
        borderCell.position
      )
    };
  }

  getGridCss() {
    const { mobile, tablet, desktop } = this.layouts;
    return {
      display: "grid",
      "@media all": {
        display: "-ms-grid"
      },
      [media.mobile]: GridContainerComponent.getGridCssForDevice(mobile),
      [media.tablet]: GridContainerComponent.getGridCssForDevice(tablet),
      [media.desktop]: GridContainerComponent.getGridCssForDevice(desktop)
    };
  }

  getCellCss(cellName: string) {
    const { mobile, tablet, desktop } = this.layouts;

    const mobileGap = calculateCellGap(mobile.gridBlocks[cellName]);
    const tabletGap = calculateCellGap(tablet.gridBlocks[cellName]);
    const desktopGap = calculateCellGap(desktop.gridBlocks[cellName]);

    return {
      [media.mobile]: GridContainerComponent.getCellCss(mobileGap),
      [media.tablet]: GridContainerComponent.getCellCss(tabletGap),
      [media.desktop]: GridContainerComponent.getCellCss(desktopGap)
    };
  }
}
