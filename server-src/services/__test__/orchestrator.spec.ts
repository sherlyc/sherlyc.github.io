import orchestrate from '../orchestrator';
import * as homepage from './fixtures/homepage.json';
import * as jsonfeed from './fixtures/jsonfeed.json';
import axios from 'axios';

jest.mock('axios');

describe('Orchestrator', () => {
  it('should provide homepage content blocks', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ status: 200, data: jsonfeed });
    await expect(orchestrate()).resolves.toEqual(homepage);
  });

  it('should throw an error when jsonfeed retriever fails', async () => {
    const error = new Error('Http error');
    (axios.get as jest.Mock).mockRejectedValue(error);
    await expect(orchestrate()).rejects.toEqual(error);
  });
});
