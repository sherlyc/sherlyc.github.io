import gridGap from './grid-gap';
import { IGridConfig } from '../../../../common/__types__/IGridContainer';

describe('grip gap helper', () => {
  const gridConfig = {
    gridTemplateColumns: '1fr 1fr 1fr 1fr 200px',
    gridTemplateRows: 'auto auto auto',
    gridGap: '20px',
    gridBlocks: [
      {
        rowStart: 0,
        rowSpan: 0,
        columnStart: 0,
        columnSpan: 0
      }
    ]
  } as IGridConfig;

  const expectedConfig = {
    gridTemplateColumns: '1fr 20px 1fr 20px 1fr 20px 1fr 20px 200px',
    gridTemplateRows: 'auto 20px auto 20px auto',
    gridGap: '0',
    gridBlocks: [
      {
        rowStart: 0,
        rowSpan: 0,
        columnStart: 0,
        columnSpan: 0
      }
    ]
  } as IGridConfig;

  it('should add grip gap to grid template rows and columns', () => {
    expect(gridGap(gridConfig)).toEqual(expectedConfig);
  });

  it('should handle grid blocks', () => {
    const config = {
      ...gridConfig,
      gridBlocks: [
        {
          rowStart: 1,
          rowSpan: 2,
          columnStart: 1,
          columnSpan: 2
        }
      ]
    } as IGridConfig;

    const expected = {
      ...expectedConfig,
      gridBlocks: [
        {
          rowStart: 1,
          rowSpan: 3,
          columnStart: 1,
          columnSpan: 3
        }
      ]
    };

    expect(gridGap(config)).toEqual(expected);
  });

  it('should handle more than one grid blocks', () => {
    const config = {
      ...gridConfig,
      gridBlocks: [
        {
          rowStart: 1,
          rowSpan: 2,
          columnStart: 1,
          columnSpan: 2
        },
        {
          rowStart: 3,
          rowSpan: 3,
          columnStart: 1,
          columnSpan: 2
        }
      ]
    } as IGridConfig;

    const expected = {
      ...expectedConfig,
      gridBlocks: [
        {
          rowStart: 1,
          rowSpan: 3,
          columnStart: 1,
          columnSpan: 3
        },
        {
          rowStart: 5,
          rowSpan: 5,
          columnStart: 1,
          columnSpan: 3
        }
      ]
    };

    expect(gridGap(config)).toEqual(expected);
  });
});
