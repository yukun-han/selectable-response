import BodySelectorSchema from './bodySelector/schema.js';
import HeaderSelectorSchema from './headerSelector/schema.js';
import PathSelectorSchema from './pathSelector/schema.js';
import QuerySelectorSchema from './querySelector/schema.js';

const SelectorsSchema = {
  selectors: {
    type: 'array',
    items: {
      anyOf: [BodySelectorSchema, HeaderSelectorSchema, PathSelectorSchema, QuerySelectorSchema],
    },
  },
};

export default SelectorsSchema;
