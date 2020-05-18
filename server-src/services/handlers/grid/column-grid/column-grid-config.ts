import { memoize } from "lodash-es";
import { Border } from "../../../../../common/__types__/IGridContainer";
import { IColumnGridConfig } from "./__types__/IColumnGridConfig";

const memoizeResolver = (...args: []) => args.join("|");

export const mobileColumnGridConfig = memoize(
  (rowGap: number): IColumnGridConfig => ({
    1: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto",
      gridColumnGap: "0px",
      gridRowGap: `${rowGap}px`,
      gridBlocks: [{ rowStart: 1, colStart: 1, border: [] }]
    },
    2: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto auto",
      gridColumnGap: "0px",
      gridRowGap: `${rowGap}px`,
      gridBlocks: [
        { rowStart: 1, colStart: 1, border: [] },
        { rowStart: 2, colStart: 1, border: [] }
      ]
    },
    3: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto auto auto",
      gridColumnGap: "0px",
      gridRowGap: `${rowGap}px`,
      gridBlocks: [
        { rowStart: 1, colStart: 1, border: [] },
        { rowStart: 2, colStart: 1, border: [] },
        { rowStart: 3, colStart: 1, border: [] }
      ]
    },
    4: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto auto auto auto",
      gridColumnGap: "0px",
      gridRowGap: `${rowGap}px`,
      gridBlocks: [
        { rowStart: 1, colStart: 1, border: [] },
        { rowStart: 2, colStart: 1, border: [] },
        { rowStart: 3, colStart: 1, border: [] },
        { rowStart: 4, colStart: 1, border: [] }
      ]
    },
    5: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto auto auto auto auto",
      gridColumnGap: "0px",
      gridRowGap: `${rowGap}px`,
      gridBlocks: [
        { rowStart: 1, colStart: 1, border: [] },
        { rowStart: 2, colStart: 1, border: [] },
        { rowStart: 3, colStart: 1, border: [] },
        { rowStart: 4, colStart: 1, border: [] },
        { rowStart: 5, colStart: 1, border: [] }
      ]
    },
    6: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto auto auto auto auto auto",
      gridColumnGap: "0px",
      gridRowGap: `${rowGap}px`,
      gridBlocks: [
        { rowStart: 1, colStart: 1, border: [] },
        { rowStart: 2, colStart: 1, border: [] },
        { rowStart: 3, colStart: 1, border: [] },
        { rowStart: 4, colStart: 1, border: [] },
        { rowStart: 5, colStart: 1, border: [] },
        { rowStart: 6, colStart: 1, border: [] }
      ]
    }
  }),
  memoizeResolver
);

export const tabletColumnGridConfig = memoize(
  (columnGap: number, rowGap: number, border: boolean): IColumnGridConfig => ({
    1: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto",
      gridColumnGap: `${columnGap}px`,
      gridRowGap: `${rowGap}px`,
      gridBlocks: [{ rowStart: 1, colStart: 1, border: [] }]
    },
    2: {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "auto",
      gridColumnGap: `${columnGap}px`,
      gridRowGap: `${rowGap}px`,
      gridBlocks: [
        { rowStart: 1, colStart: 1, border: border ? [Border.right] : [] },
        { rowStart: 1, colStart: 2, border: [] }
      ]
    },
    3: {
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "auto",
      gridColumnGap: `${columnGap}px`,
      gridRowGap: `${rowGap}px`,
      gridBlocks: [
        { rowStart: 1, colStart: 1, border: border ? [Border.right] : [] },
        { rowStart: 1, colStart: 2, border: border ? [Border.right] : [] },
        { rowStart: 1, colStart: 3, border: [] }
      ]
    },
    4: {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "auto auto",
      gridColumnGap: `${columnGap}px`,
      gridRowGap: `${rowGap}px`,
      gridBlocks: [
        { rowStart: 1, colStart: 1, border: border ? [Border.right] : [] },
        { rowStart: 1, colStart: 2, border: [] },
        { rowStart: 2, colStart: 1, border: border ? [Border.right] : [] },
        { rowStart: 2, colStart: 2, border: [] }
      ]
    },
    5: {
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "auto auto",
      gridColumnGap: `${columnGap}px`,
      gridRowGap: `${rowGap}px`,
      gridBlocks: [
        { rowStart: 1, colStart: 1, border: border ? [Border.right] : [] },
        { rowStart: 1, colStart: 2, border: border ? [Border.right] : [] },
        { rowStart: 1, colStart: 3, border: [] },
        { rowStart: 2, colStart: 1, border: border ? [Border.right] : [] },
        { rowStart: 2, colStart: 2, border: [] }
      ]
    },
    6: {
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "auto auto",
      gridColumnGap: `${columnGap}px`,
      gridRowGap: `${rowGap}px`,
      gridBlocks: [
        { rowStart: 1, colStart: 1, border: border ? [Border.right] : [] },
        { rowStart: 1, colStart: 2, border: border ? [Border.right] : [] },
        { rowStart: 1, colStart: 3, border: [] },
        { rowStart: 2, colStart: 1, border: border ? [Border.right] : [] },
        { rowStart: 2, colStart: 2, border: border ? [Border.right] : [] },
        { rowStart: 2, colStart: 3, border: [] }
      ]
    }
  }),
  memoizeResolver
);

export const desktopColumnGridConfig = memoize(
  (columnGap: number, rowGap: number, border: boolean): IColumnGridConfig => ({
    1: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto",
      gridColumnGap: `${columnGap}px`,
      gridRowGap: `${rowGap}px`,
      gridBlocks: [{ rowStart: 1, colStart: 1, border: [] }]
    },
    2: {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "auto",
      gridColumnGap: `${columnGap}px`,
      gridRowGap: `${rowGap}px`,
      gridBlocks: [
        { rowStart: 1, colStart: 1, border: border ? [Border.right] : [] },
        { rowStart: 1, colStart: 2, border: [] }
      ]
    },
    3: {
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "auto",
      gridColumnGap: `${columnGap}px`,
      gridRowGap: `${rowGap}px`,
      gridBlocks: [
        { rowStart: 1, colStart: 1, border: border ? [Border.right] : [] },
        { rowStart: 1, colStart: 2, border: border ? [Border.right] : [] },
        { rowStart: 1, colStart: 3, border: [] }
      ]
    },
    4: {
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      gridTemplateRows: "auto",
      gridColumnGap: `${columnGap}px`,
      gridRowGap: `${rowGap}px`,
      gridBlocks: [
        { rowStart: 1, colStart: 1, border: border ? [Border.right] : [] },
        { rowStart: 1, colStart: 2, border: border ? [Border.right] : [] },
        { rowStart: 1, colStart: 3, border: border ? [Border.right] : [] },
        { rowStart: 1, colStart: 4, border: [] }
      ]
    },
    5: {
      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
      gridTemplateRows: "auto",
      gridColumnGap: `${columnGap}px`,
      gridRowGap: `${rowGap}px`,
      gridBlocks: [
        { rowStart: 1, colStart: 1, border: border ? [Border.right] : [] },
        { rowStart: 1, colStart: 2, border: border ? [Border.right] : [] },
        { rowStart: 1, colStart: 3, border: border ? [Border.right] : [] },
        { rowStart: 1, colStart: 4, border: border ? [Border.right] : [] },
        { rowStart: 1, colStart: 5, border: [] }
      ]
    },
    6: {
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "auto auto",
      gridColumnGap: `${columnGap}px`,
      gridRowGap: `${rowGap}px`,
      gridBlocks: [
        { rowStart: 1, colStart: 1, border: border ? [Border.right] : [] },
        { rowStart: 1, colStart: 2, border: border ? [Border.right] : [] },
        { rowStart: 1, colStart: 3, border: [] },
        { rowStart: 2, colStart: 1, border: border ? [Border.right] : [] },
        { rowStart: 2, colStart: 2, border: border ? [Border.right] : [] },
        { rowStart: 2, colStart: 3, border: [] }
      ]
    }
  }),
  memoizeResolver
);
