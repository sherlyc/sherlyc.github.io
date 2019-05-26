import midstripHandler from './midstrip-handler';
import * as rawMidStrip from '../../adapters/__fixtures__/raw-mid-strip.json';
import * as midstripHandlerOutput from '../__fixtures__/midstrip-handler-output.json';
import { getListAsset } from '../../adapters/jsonfeed';
import { IColumnContainer } from 'common/__types__/IColumnContainer';
import { IParams } from '../../__types__/IParams';
import { HandlerInputType } from '../__types__/HandlerInputType';

jest.mock('../../adapters/jsonfeed');

describe('MidStripHandler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  beforeEach(() => {
    jest.resetModules();
  });

  it('should get a list of Image Links', async () => {
    const totalArticles = 2;

    (getListAsset as jest.Mock).mockResolvedValue(rawMidStrip);

    const handlerRunnerMock = jest.fn();

    const columnContainer = (await midstripHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.MidStrip,
        totalArticles
      },
      params
    )) as IColumnContainer[];

    const imageLinkUnits = columnContainer[0].items;

    expect(imageLinkUnits.length).toBe(2);
    expect(columnContainer).toEqual(midstripHandlerOutput.TwoImageLink);
  });

  it('should get a list of Image links not exceeding number of requested item', async () => {
    const totalArticles = 1;
    (getListAsset as jest.Mock).mockResolvedValue(rawMidStrip);

    const handlerRunnerMock = jest.fn();

    const columnContainer = (await midstripHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.MidStrip,
        totalArticles
      },
      params
    )) as IColumnContainer[];

    const imageLinkUnits = columnContainer[0].items;

    expect(imageLinkUnits.length).toBe(1);
    expect(columnContainer).toEqual(midstripHandlerOutput.OneImageLink);
  });
});
