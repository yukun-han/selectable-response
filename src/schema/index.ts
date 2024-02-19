import type { JSONSchemaType } from 'ajv';
import BodySelectorSchema from './bodySelector/schema.js';
import HeaderSelectorSchema from './headerSelector/schema.js';
import PathSelectorSchema from './pathSelector/schema.js';
import QuerySelectorSchema from './querySelector/schema.js';
import type { SelectorBase } from './types.js';

const SelectorsSchema: JSONSchemaType<SelectorBase[]> = {
  type: 'array',
  items: {
    anyOf: [BodySelectorSchema, HeaderSelectorSchema, PathSelectorSchema, QuerySelectorSchema],
  },
};

export default SelectorsSchema;
