const { startServer, waitForServer } = require('../support/helper');

// biome-ignore lint/suspicious/noExplicitAny: testing code
let server: any;

beforeAll(async () => {
  server = await startServer();
  await waitForServer();
});

afterAll(async () => {
  await server.stop();
});
