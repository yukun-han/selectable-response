import type { JSONSchemaType } from 'ajv';

type DualEqualityConditions<Props> = Props & {
  equals: string;
  matchReg: string;
};

type BodySelectorProps = {
  bodyJsonPath: string;
  equals: string | number | boolean;
};
type HeaderSelectorProps = DualEqualityConditions<{
  headerKey: string;
}>;
type PathSelectorProps = DualEqualityConditions<{
  pathVariable: string;
}>;
type QuerySelectorProps = DualEqualityConditions<{
  queryParams: string;
}>;

export type BodySelectorSchemaType = JSONSchemaType<BodySelectorProps>;
export type HeaderSelectorSchemaType = JSONSchemaType<HeaderSelectorProps>;
export type PathSelectorSchemaType = JSONSchemaType<PathSelectorProps>;
export type QuerySelectorSchemaType = JSONSchemaType<QuerySelectorProps>;
