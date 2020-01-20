export interface IColumnGridConfig {
  [key: number]: number[][];
}

export interface IColumnGridTemplate {
  [key: number]: string;
}

export const mobileGridConfig: IColumnGridConfig = {
  1: [[1, 1]],
  2: [
    [1, 1],
    [2, 1]
  ],
  3: [
    [1, 1],
    [2, 1],
    [3, 1]
  ],
  4: [
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1]
  ],
  5: [
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1]
  ],
  6: [
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
    [6, 1]
  ]
};

export const tabletGridConfig: IColumnGridConfig = {
  1: [[1, 1]],
  2: [
    [1, 1],
    [1, 2]
  ],
  3: [
    [1, 1],
    [1, 2],
    [1, 3]
  ],
  4: [
    [1, 1],
    [1, 2],
    [2, 1],
    [2, 2]
  ],
  5: [
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 1],
    [2, 2]
  ],
  6: [
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 1],
    [2, 2],
    [2, 3]
  ]
};

export const desktopGridConfig: IColumnGridConfig = {
  1: [[1, 1]],
  2: [
    [1, 1],
    [1, 2]
  ],
  3: [
    [1, 1],
    [1, 2],
    [1, 3]
  ],
  4: [
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4]
  ],
  5: [
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5]
  ],
  6: [
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 1],
    [2, 2],
    [2, 3]
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
