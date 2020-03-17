import { Component, Input, OnInit } from "@angular/core";
import {
  Border,
  IGridBlock,
  IGridConfig,
  IGridContainer
} from "../../../../common/__types__/IGridContainer";
import { DeviceService } from "../../services/device/device.service";
import {
  calculateBorderCell,
  calculateCellGap,
  calculateGridGap
} from "../../shared/utils/grid-helper/grid-helper";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { MediaQuery } from "./__types__/MediaQuery";

const hideCell = { display: "none" };

@Component({
  selector: "app-grid-container",
  styleUrls: ["./grid-container.component.scss"],
  templateUrl: "./grid-container.component.html"
})
export class GridContainerComponent implements IContentBlockComponent, OnInit {
  @Input() input!: IGridContainer;

  keys: string[] = [];

  borderCells: Array<{
    name: string;
    position: Border;
  }> = [];

  layouts!: {
    mobile: IGridConfig;
    tablet: IGridConfig;
    desktop: IGridConfig;
  };

  grid!: {
    grid: Partial<CSSStyleDeclaration>;
    cells: {
      key: string;
      style: Partial<CSSStyleDeclaration>;
    }[];
    borders: {
      className: Border;
      style: Partial<CSSStyleDeclaration>;
    }[];
  };

  table!: any;

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

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.assignLayouts();
    if (this.deviceService.isGridSupported()) {
      this.keys = Object.getOwnPropertyNames(this.input.items);
      this.createBorderCells();
      this.grid = this.getGridContent();
    } else {
      this.table = this.getTableContent();
    }
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

  getGridContent() {
    return {
      grid: this.getGridCss(),
      cells: this.keys.map((key) => ({
        key,
        style: this.getCellCss(key)
      })),
      borders: this.borderCells.map((border) => ({
        className: border.position,
        style: this.getBorderCellCss(border)
      }))
    };
  }

  getTableContent() {
    const { desktop } = this.layouts;
    const totalColumns = desktop.gridTemplateColumns.split(" ").length;
    return Object.keys(desktop.gridBlocks).reduce((table, key) => {
      const cell = desktop.gridBlocks[key];
      const rowNumber = cell.rowStart - 1;
      const colNumber = cell.columnStart - 1;
      table[rowNumber] = table[rowNumber] || [];
      table[rowNumber][colNumber] = {
        ...cell,
        key,
        width: (cell.columnSpan * 100) / totalColumns
      };
      return table;
    }, [] as any[]);
  }
}
