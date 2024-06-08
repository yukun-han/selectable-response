module.exports = [
  {
    id: 'base',
    routes: [
      'ext-json:query-param',
      'ext-json:path-variable',
      'ext-json:header-key',
      'ext-json-post:body-json-path',
      'ext-json:normal',
      'ext-middleware:query-param',
      'ext-middleware:path-variable',
      'ext-middleware:header-key',
      'ext-middleware:normal',
    ],
  },
];
