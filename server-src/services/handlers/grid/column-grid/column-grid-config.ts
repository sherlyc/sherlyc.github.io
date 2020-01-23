import { Border } from "../../../../../common/__types__/IGridContainer";

export interface IColumnGridConfig {
  [key: number]: Array<{
    rowStart: number;
    colStart: number;
    border: Border[];
  }>;
}

export interface IColumnGridTemplate {
  [key: number]: string;
}

export const mobileGridConfig: IColumnGridConfig = {
  1: [{ rowStart: 1, colStart: 1, border: [] }],
  2: [
    { rowStart: 1, colStart: 1, border: [] },
    { rowStart: 2, colStart: 1, border: [] }
  ],
  3: [
    { rowStart: 1, colStart: 1, border: [] },
    { rowStart: 2, colStart: 1, border: [] },
    { rowStart: 3, colStart: 1, border: [] }
  ],
  4: [
    { rowStart: 1, colStart: 1, border: [] },
    { rowStart: 2, colStart: 1, border: [] },
    { rowStart: 3, colStart: 1, border: [] },
    { rowStart: 4, colStart: 1, border: [] }
  ],
  5: [
    { rowStart: 1, colStart: 1, border: [] },
    { rowStart: 2, colStart: 1, border: [] },
    { rowStart: 3, colStart: 1, border: [] },
    { rowStart: 4, colStart: 1, border: [] },
    { rowStart: 5, colStart: 1, border: [] }
  ],
  6: [
    { rowStart: 1, colStart: 1, border: [] },
    { rowStart: 2, colStart: 1, border: [] },
    { rowStart: 3, colStart: 1, border: [] },
    { rowStart: 4, colStart: 1, border: [] },
    { rowStart: 5, colStart: 1, border: [] },
    { rowStart: 6, colStart: 1, border: [] }
  ]
};

export const tabletGridConfig: IColumnGridConfig = {
  1: [{ rowStart: 1, colStart: 1, border: [] }],
  2: [
    { rowStart: 1, colStart: 1, border: [Border.right] },
    { rowStart: 1, colStart: 2, border: [] }
  ],
  3: [
    { rowStart: 1, colStart: 1, border: [Border.right] },
    { rowStart: 1, colStart: 2, border: [Border.right] },
    { rowStart: 1, colStart: 3, border: [] }
  ],
  4: [
    { rowStart: 1, colStart: 1, border: [Border.right] },
    { rowStart: 1, colStart: 2, border: [] },
    { rowStart: 2, colStart: 1, border: [Border.right] },
    { rowStart: 2, colStart: 2, border: [] }
  ],
  5: [
    { rowStart: 1, colStart: 1, border: [Border.right] },
    { rowStart: 1, colStart: 2, border: [Border.right] },
    { rowStart: 1, colStart: 3, border: [] },
    { rowStart: 2, colStart: 1, border: [Border.right] },
    { rowStart: 2, colStart: 2, border: [] }
  ],
  6: [
    { rowStart: 1, colStart: 1, border: [Border.right] },
    { rowStart: 1, colStart: 2, border: [Border.right] },
    { rowStart: 1, colStart: 3, border: [] },
    { rowStart: 2, colStart: 1, border: [Border.right] },
    { rowStart: 2, colStart: 2, border: [Border.right] },
    { rowStart: 2, colStart: 3, border: [] }
  ]
};

export const desktopGridConfig: IColumnGridConfig = {
  1: [{ rowStart: 1, colStart: 1, border: [] }],
  2: [
    { rowStart: 1, colStart: 1, border: [Border.right] },
    { rowStart: 1, colStart: 2, border: [] }
  ],
  3: [
    { rowStart: 1, colStart: 1, border: [Border.right] },
    { rowStart: 1, colStart: 2, border: [Border.right] },
    { rowStart: 1, colStart: 3, border: [] }
  ],
  4: [
    { rowStart: 1, colStart: 1, border: [Border.right] },
    { rowStart: 1, colStart: 2, border: [Border.right] },
    { rowStart: 1, colStart: 3, border: [Border.right] },
    { rowStart: 1, colStart: 4, border: [] }
  ],
  5: [
    { rowStart: 1, colStart: 1, border: [Border.right] },
    { rowStart: 1, colStart: 2, border: [Border.right] },
    { rowStart: 1, colStart: 3, border: [Border.right] },
    { rowStart: 1, colStart: 4, border: [Border.right] },
    { rowStart: 1, colStart: 5, border: [] }
  ],
  6: [
    { rowStart: 1, colStart: 1, border: [Border.right] },
    { rowStart: 1, colStart: 2, border: [Border.right] },
    { rowStart: 1, colStart: 3, border: [] },
    { rowStart: 2, colStart: 1, border: [Border.right] },
    { rowStart: 2, colStart: 2, border: [Border.right] },
    { rowStart: 2, colStart: 3, border: [] }
  ]
};

export const templateColumnsTablet: IColumnGridTemplate = {
  1: "1fr",
  2: "1fr 1fr",
  3: "1fr 1fr 1fr",
  4: "1fr 1fr",
  5: "1fr 1fr 1fr",
  6: "1fr 1fr 1fr"
};

export const templateRowsTablet: IColumnGridTemplate = {
  1: "auto",
  2: "auto",
  3: "auto",
  4: "auto auto",
  5: "auto auto",
  6: "auto auto"
};

export const templateColumnsDesktop: IColumnGridTemplate = {
  1: "1fr",
  2: "1fr 1fr",
  3: "1fr 1fr 1fr",
  4: "1fr 1fr 1fr 1fr",
  5: "1fr 1fr 1fr 1fr 1fr",
  6: "1fr 1fr 1fr"
};

export const templateRowsDesktop: IColumnGridTemplate = {
  1: "auto",
  2: "auto",
  3: "auto",
  4: "auto",
  5: "auto",
  6: "auto auto"
};
