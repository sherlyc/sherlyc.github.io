import config from '../utils/config';
import { IRawBreakingNews } from './__types__/IRawBreakingNews';
import retry from '../utils/retry';
import http from '../utils/http';
import { IParams } from '../__types__/IParams';

async function apiCall(params: IParams): Promise<IRawBreakingNews> {
  if (config.contentAPI === 'MOCKED') {
    return {
      id: '123',
      text:
        '$1 billion budget blowout in Aucklands City Rail Link, officials admit... read more',
      link:
        'https://www.stuff.co.nz/business/111688527/vendors-claim-real-estate-agent-acted-inappropriately-in-helping-buyer-flip-house',
      enabled: true
    } as IRawBreakingNews;
  }

  const response = await http(params).get<IRawBreakingNews>(
    `${config.contentAPI}/breakingnews`
  );
  return response.data;
}

export default (params: IParams) => retry(() => apiCall(params), params);
