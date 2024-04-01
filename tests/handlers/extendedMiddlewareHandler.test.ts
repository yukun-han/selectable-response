// @ts-ignore
const { startServer, doFetch, waitForServer } = require('../support/helper');

describe('extended middleware handler', () => {
  let server: any;

  beforeAll(async () => {
    server = await startServer();
    await waitForServer();
  });

  afterAll(async () => {
    await server.stop();
  });

  describe('get result', () => {
    it('should return result', async () => {
      const response = await doFetch('/api/ext-middleware/1');
      expect(response.body).toEqual({
        id: 'normal',
        result: 'John Doe',
      });
    });

    it('should return result by header key selector ', async () => {
      const response = await doFetch('/api/ext-middleware/2', {
        headers: { 'x-test-key': 'need' },
      });
      expect(response.body).toEqual({
        id: 'header-key',
        result: 'Header [x-test-key, need]',
      });
    });

    it('should return result by path variable selector ', async () => {
      const response = await doFetch('/api/ext-middleware/233');
      expect(response.body).toEqual({
        id: 'path-variable',
        result: 'Path Variable: 233',
      });
    });

    it('should return result by query param selector ', async () => {
      const response = await doFetch('/api/ext-middleware/3?r=result');
      expect(response.body).toEqual({
        id: 'query-param',
        result: 'Query Param: r=result',
      });
    });
  });
});
