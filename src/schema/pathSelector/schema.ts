import type { PathSelectorSchemaType } from '../types.js';

const schema: PathSelectorSchemaType = {
  type: 'object',
  properties: {
    pathVariable: {
      type: 'string',
    },
    equals: {
      type: 'string',
    },
    matchReg: {
      type: 'string',
    },
  },
  required: ['pathVariable'],
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
