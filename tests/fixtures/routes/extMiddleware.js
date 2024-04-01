module.exports = [
  {
    id: 'ext-middleware',
    url: '/api/ext-middleware/:id',
    method: 'GET',
    variants: [
      {
        id: 'query-param',
        type: 'extended-middleware',
        options: {
          selectors: [{ queryParams: 'r', equals: 'result' }],
          middleware: async (req, res) => {
            res.status(200).send({
              id: 'query-param',
              result: 'Query Param: r=result',
            });
          },
        },
      },
      {
        id: 'header-key',
        type: 'extended-middleware',
        options: {
          selectors: [{ headerKey: 'x-test-key', equals: 'need' }],
          middleware: async (req, res) => {
            res.status(200).send({
              id: 'header-key',
              result: 'Header [x-test-key, need]',
            });
          },
        },
      },
      {
        id: 'path-variable',
        type: 'extended-middleware',
        options: {
          selectors: [{ pathVariable: 'id', equals: '233' }],
          middleware: async (req, res) => {
            res.status(200).send({
              id: 'path-variable',
              result: 'Path Variable: 233',
            });
          },
        },
      },
      {
        id: 'normal',
        type: 'extended-middleware',
        options: {
          middleware: async (req, res) => {
            res.status(200).send({
              id: 'normal',
              result: 'John Doe',
            });
          },
        },
      },
    ],
  },
];
