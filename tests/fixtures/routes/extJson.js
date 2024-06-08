module.exports = [
  {
    id: 'ext-json',
    url: '/api/ext-json/:id',
    method: 'GET',
    variants: [
      {
        id: 'query-param',
        type: 'extended-json',
        options: {
          selectors: [{ queryParams: 'r', matchReg: 'r.*' }],
          status: 200,
          body: {
            id: 'query-param',
            result: 'Query Param: r=result',
          },
        },
      },
      {
        id: 'header-key',
        type: 'extended-json',
        options: {
          selectors: [{ headerKey: 'x-test-key', equals: 'need' }],
          status: 200,
          body: {
            id: 'header-key',
            result: 'Header [x-test-key, need]',
          },
        },
      },
      {
        id: 'path-variable',
        type: 'extended-json',
        options: {
          selectors: [{ pathVariable: 'id', equals: '233' }],
          status: 200,
          body: {
            id: 'path-variable',
            result: 'Path Variable: 233',
          },
        },
      },
      {
        id: 'normal',
        type: 'extended-json',
        options: {
          status: 200,
          body: {
            id: 'normal',
            result: 'John Doe',
          },
        },
      },
    ],
  },
  {
    id: 'ext-json-post',
    url: '/api/ext-json/book',
    method: 'POST',
    variants: [
      {
        id: 'body-json-path',
        type: 'extended-json',
        options: {
          selectors: [{ bodyJsonPath: '$.author', equals: 'Herman Melville' }],
          status: 200,
          body: {
            category: 'fiction',
            author: 'Herman Melville',
            title: 'Moby Dick',
            isbn: '0-553-21311-3',
            price: 8.99,
          },
        },
      },
    ],
  },
];
