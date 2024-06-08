import { doFetch } from '../support/helper';

describe('extended json handler', () => {
  describe('get result', () => {
    it('should return result', async () => {
      const response = await doFetch('/api/ext-json/1');
      expect(response.body).toEqual({
        id: 'normal',
        result: 'John Doe',
      });
    });

    it('should return result by header key selector ', async () => {
      const response = await doFetch('/api/ext-json/2', {
        headers: { 'x-test-key': 'need' },
      });
      expect(response.body).toEqual({
        id: 'header-key',
        result: 'Header [x-test-key, need]',
      });
    });

    it('should return result by path variable selector ', async () => {
      const response = await doFetch('/api/ext-json/233');
      expect(response.body).toEqual({
        id: 'path-variable',
        result: 'Path Variable: 233',
      });
    });

    it('should return result by query param selector ', async () => {
      const response = await doFetch('/api/ext-json/3?r=result');
      expect(response.body).toEqual({
        id: 'query-param',
        result: 'Query Param: r=result',
      });
    });
  });

  describe('post', () => {
    it('should return result by body json path selector', async () => {
      const response = await doFetch('/api/ext-json/book', {
        method: 'POST',
        body: JSON.stringify({
          author: 'Herman Melville',
        }),
      });
      expect(response.body).toEqual({
        category: 'fiction',
        author: 'Herman Melville',
        title: 'Moby Dick',
        isbn: '0-553-21311-3',
        price: 8.99,
      });
    });
  });
});
