import type { JSONSchemaType } from 'ajv';
import type { AllSelectorProps } from '../types.js';
import bodySelectorSchema from './bodySelector/schema.js';
import headerSelectorSchema from './headerSelector/schema.js';
import pathSelectorSchema from './pathSelector/schema.js';
import querySelectorSchema from './querySelector/schema.js';

const selectorsSchema: JSONSchemaType<AllSelectorProps[]> = {
  type: 'array',
  items: {
    anyOf: [bodySelectorSchema, headerSelectorSchema, pathSelectorSchema, querySelectorSchema],
  },
};

export default selectorsSchema;
export { bodySelectorSchema, headerSelectorSchema, pathSelectorSchema, querySelectorSchema };
