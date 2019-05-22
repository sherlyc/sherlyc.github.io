import { IParams } from './__types__/IParams';
import { experimentService } from './experiment';

describe('Experiment service should', () => {
  const response = { variant: 'A' };

  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  it('return experiment data when experiment name and segment is provided', async () => {
    expect(await experimentService('backgroundColor', 20, params)).toEqual(
      response
    );
  });
});
