import type { QuerySelectorSchemaType } from '../../types.js';

const schema: QuerySelectorSchemaType = {
  type: 'object',
  properties: {
    queryParams: {
      type: 'string',
    },
    equals: {
      type: 'string',
    },
    matchReg: {
      type: 'string',
    },
  },
  required: ['queryParams'],
  oneOf: [
    {
      required: ['equals'],
    },
    {
      required: ['matchReg'],
    },
  ],
};

export default schema;
