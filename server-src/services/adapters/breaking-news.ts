import config from '../utils/config';
import { IRawBreakingNews } from './__types__/IRawBreakingNews';
import retry from '../utils/retry';
import http from '../utils/http';

async function apiCall(): Promise<IRawBreakingNews> {
  const response = await http.get<IRawBreakingNews>(
    `${config.contentAPI}/breakingnews`
  );
  return response.data;
}

export default () => retry(() => apiCall());
