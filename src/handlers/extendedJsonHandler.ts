import isAbleToRunHandler from '../helpers/isAbleToRunHandler.js';
import SelectorsSchema from '../schema/index.js';

const Json = require('@mocks-server/core/src/variant-handlers/handlers/Json');

class ExtendedJsonHandler extends Json {
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
        ...SelectorsSchema,
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

  static get id() {
    return 'extended-json';
  }

  constructor(options, core) {
    super(options, core);
    this._options = options;
  }

  middleware(req, res, next) {
    if (isAbleToRunHandler(this._options.selectors, req)) {
      return super.middleware(req, res);
    }
    return next();
  }
}

export default ExtendedJsonHandler;
