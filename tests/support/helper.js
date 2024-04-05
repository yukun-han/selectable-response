const path = require('node:path');
const crossFetch = require('cross-fetch');
const waitOn = require('wait-on');
const Core = require('@mocks-server/core');
const { assign } = require('radash');
const { ExtendedJsonHandler, ExtendedMiddlewareHandler } = require('../../src/index');

const SERVER_PORT = 3100;
const SERVER_URL = `http://127.0.0.1:${SERVER_PORT}`;

const createCore = () => {
  return new Core({
    server: {
      port: SERVER_PORT,
    },
    config: {
      readArguments: false,
      readEnvironment: false,
      readFile: false,
    },
    files: {
      enabled: true,
      watch: false,
      path: path.resolve(__dirname, '..', 'fixtures'),
    },
    mock: { collections: { selected: 'base' } },
    variantHandlers: {
      register: [ExtendedJsonHandler, ExtendedMiddlewareHandler],
    },
    log: 'info',
  });
};

const startServer = () => {
  const core = createCore();
  return core.init().then(() => {
    return core.start().then(() => {
      return Promise.resolve(core);
    });
  });
};

const doFetch = (uri, options = {}) => {
  const requestOptions = assign(
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
    options,
  );

  return crossFetch(`${SERVER_URL}${uri}`, {
    ...requestOptions,
  }).then((res) => {
    return res
      .json()
      .then((processedRes) => ({
        body: processedRes,
        status: res.status,
        headers: res.headers,
      }))
      .catch(() => {
        return { status: res.status, headers: res.headers };
      });
  });
};

const waitForServer = () => {
  return waitOn({ resources: [`tcp:127.0.0.1:${SERVER_PORT}`] });
};

module.exports = {
  startServer,
  doFetch,
  waitForServer,
};
