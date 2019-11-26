import { Component, Input, OnInit } from '@angular/core';
import * as cxs from 'cxs';
import {
  IGridBlock,
  IGridConfig,
  IGridContainer
} from '../../../common/__types__/IGridContainer';
import { IContentBlockComponent } from '../content-blocks/__types__/IContentBlockComponent';

@Component({
  selector: 'app-grid-container',
  templateUrl: './grid-container.component.html'
})
export class GridContainerComponent implements IContentBlockComponent, OnInit {
  @Input() input!: IGridContainer;

  style = {};

  ngOnInit(): void {
    const { mobile, tablet, desktop } = this.input;
    this.style = {
      ...this.gridCss(mobile),
      '@media only screen and (min-width: 64em)': this.gridCss(tablet),
      '@media only screen and (min-width: 75em)': this.gridCss(desktop)
    };
  }

  private gridCss(gridConfig: IGridConfig) {
    return {
      display: 'grid',
      gridTemplateColumns: gridConfig.gridTemplateColumns,
      gridGap: gridConfig.gridGap,
      ...this.gridBlocks(gridConfig.gridBlocks)
    };
  }

  private gridBlocks(gridBlocks: IGridBlock[]) {
    return gridBlocks.reduce(
      (prev: { [key: string]: string }, current: IGridBlock, index: number) => {
        const blockCssKey = ` div:nth-child(${index + 1})`;
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
      gridRowStart: gridBlock.rowStart,
      gridRowEnd: `span ${gridBlock.rowSpan}`,
      gridColumnStart: gridBlock.columnStart,
      gridColumnEnd: `span ${gridBlock.columnSpan}`
    };
  }
}
