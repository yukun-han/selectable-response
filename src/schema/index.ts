import type { JSONSchemaType } from 'ajv';
import bodySelectorSchema from './bodySelector/schema.js';
import headerSelectorSchema from './headerSelector/schema.js';
import pathSelectorSchema from './pathSelector/schema.js';
import querySelectorSchema from './querySelector/schema.js';
import type { SelectorBase } from './types.js';

const selectorsSchema: JSONSchemaType<SelectorBase[]> = {
  type: 'array',
  items: {
    anyOf: [bodySelectorSchema, headerSelectorSchema, pathSelectorSchema, querySelectorSchema],
  },
};

export default selectorsSchema;
