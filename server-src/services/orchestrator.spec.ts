import orchestrator from './orchestrator';
import * as handlerRunner from './handlers/runner';

describe('Orchestrator', () => {
  it('should log and throw error when content block throws error', async () => {
    const error = new Error('content block failed');
    jest.spyOn(handlerRunner, 'default').mockRejectedValue(error);
    await expect(orchestrator({ apiRequestId: '123' })).rejects.toEqual(error);
  });
});
