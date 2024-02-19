import type { NextFunction, Request, Response } from 'express';
import isAbleToRunHandler from '../helpers/isAbleToRunHandler.js';
import selectorsSchema from '../schema/index.js';
import type { MockServerCore, MockServerOptions } from '../types.js';

const Middleware = require('@mocks-server/core/src/variant-handlers/handlers/Middleware');

class ExtendedMiddlewareHandler extends Middleware {
  static get id() {
    return 'extended-middleware';
  }

  static get validationSchema() {
    return {
      type: 'object',
      properties: {
        middleware: {
          instanceof: 'Function',
        },
        selectors: selectorsSchema,
      },
      required: ['middleware'],
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

export default ExtendedMiddlewareHandler;
