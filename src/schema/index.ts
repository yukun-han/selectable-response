const SelectorsSchema = {
  selectors: {
    type: 'array',
    items: {
      anyOf: [
        {
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
        },
        {
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
          oneOf: [
            {
              required: ['headerKey', 'equals'],
            },
            {
              required: ['headerKey', 'matchReg'],
            },
          ],
        },
        {
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
          oneOf: [
            {
              required: ['pathVariable', 'equals'],
            },
            {
              required: ['pathVariable', 'matchReg'],
            },
          ],
        },
        {
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
          oneOf: [
            {
              required: ['queryParams', 'equals'],
            },
            {
              required: ['queryParams', 'matchReg'],
            },
          ],
        },
      ],
    },
  },
};

export default SelectorsSchema;
