import { Component, Input, OnInit } from "@angular/core";
import {
  IGridBlock,
  IGridConfig,
  IGridContainer
} from "../../../../common/__types__/IGridContainer";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import applyGripGap from "../../shared/utils/grid-gap/grid-gap";

@Component({
  selector: "app-grid-container",
  templateUrl: "./grid-container.component.html"
})
export class GridContainerComponent implements IContentBlockComponent, OnInit {
  @Input() input!: IGridContainer;

  style = {};

  ngOnInit(): void {
    const { mobile, tablet, desktop } = this.input;
    const mobileWithGap = applyGripGap(mobile);
    const tabletWithGap = applyGripGap(tablet);
    const desktopWithGap = applyGripGap(desktop);

    this.style = {
      ...this.gridCss(mobileWithGap),
      "@media only screen and (min-width: 64em)": this.gridCss(tabletWithGap),
      "@media only screen and (min-width: 75em)": this.gridCss(desktopWithGap)
    };
  }

  private gridCss(gridConfig: IGridConfig) {
    return {
      display: "grid",
      "@media all": {
        display: "-ms-grid"
      },

      msGridColumns: gridConfig.gridTemplateColumns,
      gridTemplateColumns: gridConfig.gridTemplateColumns,
      gridTemplateRows: gridConfig.gridTemplateRows,
      gridGap: gridConfig.gridGap,

      ...this.gridBlocks(gridConfig.gridBlocks)
    };
  }

  private gridBlocks(gridBlocks: IGridBlock[]) {
    return gridBlocks.reduce(
      (prev: { [key: string]: string }, current: IGridBlock, index: number) => {
        const blockCssKey = ` > :nth-child(${index + 1})`;
        return {
          ...prev,
          [blockCssKey]: this.gridBlockCss(current)
        };
      },
      {}
    );
  }

  private gridBlockCss(gridBlock: IGridBlock) {
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
