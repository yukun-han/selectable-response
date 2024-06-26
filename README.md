# selectable-response

![NPM License](https://img.shields.io/npm/l/%40yukun-han%2Fselectable-response)
![NPM Version](https://img.shields.io/npm/v/%40yukun-han%2Fselectable-response)
![NPM Type Definitions](https://img.shields.io/npm/types/%40yukun-han%2Fselectable-response)

![Branches](./tests/badges/badge-branches.svg)
![Functions](./tests/badges/badge-functions.svg)
![Lines](./tests/badges/badge-lines.svg)
![Statements](./tests/badges/badge-statements.svg)

[![Build and test](https://github.com/yukun-han/selectable-response/actions/workflows/build-and-test.yaml/badge.svg)](https://github.com/yukun-han/selectable-response/actions/workflows/build-and-test.yaml)
[![Publish to github packages](https://github.com/yukun-han/selectable-response/actions/workflows/publish-github-packages.yaml/badge.svg)](https://github.com/yukun-han/selectable-response/actions/workflows/publish-github-packages.yaml)
[![Publish to npm](https://github.com/yukun-han/selectable-response/actions/workflows/publish-npm.yaml/badge.svg)](https://github.com/yukun-han/selectable-response/actions/workflows/publish-npm.yaml)

Customized variant handlers for Mocks Server to return response by selectors.

Extended official `json` and `middleware` variant handlers to allow only returning response when given request selectors are satisfied.

## Features

- Developed by TypeScript
- Testing converge > 90%
- Supports ESM and CJS
- Developed following official [instruction](https://www.mocks-server.org/docs/variant-handlers/development/)

## Installation

```sh
// npm
npm install @yukun-han/selectable-response

// yarn
yarn add @yukun-han/selectable-response
```

## Usage

Extended variant handlers now have: `extended-json`, `extended-middleware`.

Selector Conditions now support:

- header: `headerKey`
- path: `pathVariable`
- query: `queryParams`
- body: `bodyJsonPath` - [jsonpath](https://github.com/dchester/jsonpath#readme) is used to parse body value

Comparing operators now support:

- `equals`: tests if condition equals given value by `Object.is`
- `matchReg`: tests if condition could pass given Regex

## Example

Take `extended-json` with `headerKey` as an example.

1. Registered in config

    ```js
    {
      variantHandlers: {
          register: [ExtendedJsonHandler],
        }
    }
    ```

2. Use in routes

    ```js
    {
      id: 'ext-json',
      url: '/api/ext-json/header-key',
      method: 'GET',
      variants: [
        {
          id: 'header-key',
          type: 'extended-json',  // declare type as `extended-json`
          options: {
            selectors: [{ headerKey: 'x-test-key', equals: 'need' }],  // declare header selector condition
            status: 200 // will only return if request condition satisfied
            body: 'OK'
          },
        },
      ]
    }
    ```

3. Send request and verify

    ```js
    // satisfy
    const response = await fetch('/api/ext-json/header-key', {
        headers: { 'x-test-key': 'need' },
      });
    response.status // => 200

    // could not satisfy
    const response = await fetch('/api/ext-json/header-key');
    response.status // => 404, could not found this endpoint
    ```

## Thanks

Thanks [Javier Brea](https://github.com/javierbrea) and [Mocks Server](https://www.mocks-server.org/). 🍻
