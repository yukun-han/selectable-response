import isAbleToRunHandler from '../helpers/isAbleToRunHandler.js';
import SelectorsSchema from '../schema/index.js';

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
        ...SelectorsSchema,
      },
      required: ['middleware'],
      additionalProperties: false,
    };
  }

  constructor(options, core) {
    super(options, core);
    this._options = options;
  }

  middleware(req, res, next) {
    if (isAbleToRunHandler(this._options.selectors, req)) {
      return super.middleware(req, res, next);
    }
    return next();
  }
}

export default ExtendedMiddlewareHandler;
