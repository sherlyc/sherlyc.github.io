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
import { MediaQuery } from "./__types__/MediaQuery";

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

  private static getBorderCellDeviceCss(gridBlock: IGridBlock, type: Border) {
    const hasBorder = gridBlock.border.includes(type);
    return hasBorder
      ? GridContainerComponent.getCellDeviceCss(
          calculateBorderCell(type, gridBlock)
        )
      : hideCell;
  }

  private static getGridDeviceCss(config: IGridConfig) {
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

  private static getCellDeviceCss(gridBlock: IGridBlock): any {
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
      [MediaQuery.Mobile]: GridContainerComponent.getBorderCellDeviceCss(
        calculateCellGap(mobile.gridBlocks[borderCell.name]),
        borderCell.position
      ),
      [MediaQuery.Tablet]: GridContainerComponent.getBorderCellDeviceCss(
        calculateCellGap(tablet.gridBlocks[borderCell.name]),
        borderCell.position
      ),
      [MediaQuery.Desktop]: GridContainerComponent.getBorderCellDeviceCss(
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
      [MediaQuery.Mobile]: GridContainerComponent.getGridDeviceCss(mobile),
      [MediaQuery.Tablet]: GridContainerComponent.getGridDeviceCss(tablet),
      [MediaQuery.Desktop]: GridContainerComponent.getGridDeviceCss(desktop)
    };
  }

  getCellCss(cellName: string) {
    const { mobile, tablet, desktop } = this.layouts;

    const mobileGap = calculateCellGap(mobile.gridBlocks[cellName]);
    const tabletGap = calculateCellGap(tablet.gridBlocks[cellName]);
    const desktopGap = calculateCellGap(desktop.gridBlocks[cellName]);

    return {
      [MediaQuery.Mobile]: GridContainerComponent.getCellDeviceCss(mobileGap),
      [MediaQuery.Tablet]: GridContainerComponent.getCellDeviceCss(tabletGap),
      [MediaQuery.Desktop]: GridContainerComponent.getCellDeviceCss(desktopGap)
    };
  }
}
