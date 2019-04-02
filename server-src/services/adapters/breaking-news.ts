import config from '../utils/config';
import { IRawBreakingNews } from './__types__/IRawBreakingNews';
import retry from '../utils/retry';
import http from '../utils/http';

async function apiCall(): Promise<IRawBreakingNews> {
  if (config.contentAPI === 'MOCKED') {
    return {
      id: '123',
      text: 'Buyer made $700k overnight',
      link:
        'https://www.stuff.co.nz/business/111688527/vendors-claim-real-estate-agent-acted-inappropriately-in-helping-buyer-flip-house',
      enabled: true
    } as IRawBreakingNews;
  }

  const response = await http.get<IRawBreakingNews>(
    `${config.contentAPI}/breakingnews`
  );
  return response.data;
}

export default () => retry(() => apiCall());
