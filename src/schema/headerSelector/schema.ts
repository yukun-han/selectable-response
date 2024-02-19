import type { HeaderSelectorSchemaType } from '../../types.js';

const schema: HeaderSelectorSchemaType = {
  type: 'object',
  properties: {
    headerKey: {
      type: 'string',
    },
    equals: {
      type: 'string',
    },
    matchReg: {
      type: 'string',
    },
  },
  required: ['headerKey'],
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
