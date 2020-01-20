export interface IDictionary {
  [key: number]: number[][];
}

export interface ITemplateDictionary {
  [key: number]: string;
}

export const mobileGridConfig: IDictionary = {
  1: [[1, 1]],
  2: [[1, 1], [2, 1]],
  3: [[1, 1], [2, 1], [3, 1]],
  4: [[1, 1], [2, 1], [3, 1], [4, 1]],
  5: [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1]],
  6: [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1]]
}
export const tabletGridConfig: IDictionary = {
  1: [[1, 1]],
  2: [[1, 1], [1, 2]],
  3: [[1, 1], [1, 2], [1, 3]],
  4: [[1, 1], [1, 2], [2, 1], [2, 2]],
  5: [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2]],
  6: [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3]]
};

export const desktopGridConfig: IDictionary = {
  1: [[1, 1]],
  2: [[1, 1], [1, 2]],
  3: [[1, 1], [1, 2], [1, 3]],
  4: [[1, 1], [1, 2], [1, 3], [1, 4]],
  5: [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5]],
  6: [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3]]
};

export const templateColumnsTablet: ITemplateDictionary = {
  1 : "1fr",
  2 : "1fr 1fr",
  3 : "1fr 1fr 1fr",
  4 : "1fr 1fr",
  5 : "1fr 1fr 1fr",
  6 : "1fr 1fr 1fr"
}

export const templateRowsTablet: ITemplateDictionary = {
  1 : "auto",
  2 : "auto",
  3 : "auto",
  4 : "auto auto",
  5 : "auto auto",
  6 : "auto auto"
}

export const templateColumnsDesktop: ITemplateDictionary = {
  1 : "1fr",
  2 : "1fr 1fr",
  3 : "1fr 1fr 1fr",
  4 : "1fr 1fr 1fr 1fr",
  5 : "1fr 1fr 1fr 1fr 1fr",
  6 : "1fr 1fr 1fr"
}

export const templateRowsDesktop: ITemplateDictionary = {
  1 : "auto",
  2 : "auto",
  3 : "auto",
  4 : "auto",
  5 : "auto",
  6 : "auto auto"
}
