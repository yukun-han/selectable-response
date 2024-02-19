import type { NextFunction, Request, Response } from 'express';
import isAbleToRunHandler from '../helpers/isAbleToRunHandler.js';
import selectorsSchema from '../schema/index.js';
import type { MockServerCore, MockServerOptions } from '../types.js';

const Json = require('@mocks-server/core/src/variant-handlers/handlers/Json');

class ExtendedJsonHandler extends Json {
  static get id() {
    return 'extended-json';
  }

  static get validationSchema() {
    return {
      type: 'object',
      properties: {
        headers: {
          type: 'object',
        },
        status: {
          type: 'number',
        },
        selectors: selectorsSchema,
        body: {
          oneOf: [
            {
              type: 'object',
            },
            {
              type: 'array',
            },
          ],
        },
      },
      required: ['status', 'body'],
      additionalProperties: false,
    };
  }

  constructor(options: MockServerOptions, core: MockServerCore) {
    super(options, core);
    this._options = options;
  }

  middleware(req: Request, res: Response, next: NextFunction) {
    if (isAbleToRunHandler(this._options.selectors, req)) {
      return super.middleware(req, res, next);
    }
    return next();
  }
}

export default ExtendedJsonHandler;
