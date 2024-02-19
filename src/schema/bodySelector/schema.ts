import type { BodySelectorSchemaType } from '../../types.js';

const schema: BodySelectorSchemaType = {
  type: 'object',
  properties: {
    bodyJsonPath: {
      type: 'string',
    },
    equals: {
      anyOf: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }],
    },
  },
  required: ['bodyJsonPath', 'equals'],
  additionalProperties: false,
};

export default schema;
