import { init } from '../src/index.js';

describe('init test', () => {
  it('should echo Hello World', () => {
    expect(init()).toBe('Hello World');
  });
});
