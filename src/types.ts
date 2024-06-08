import type { JSONSchemaType } from 'ajv';

export type SelectorBase<Props = Record<string, string>> = Props & {
  equals: string;
  matchReg: string;
};

type BodySelectorProps = {
  bodyJsonPath: string;
  equals: string | number | boolean;
};
type HeaderSelectorProps = SelectorBase<{
  headerKey: string;
}>;
type PathSelectorProps = SelectorBase<{
  pathVariable: string;
}>;
type QuerySelectorProps = SelectorBase<{
  queryParams: string;
}>;

export type AllSelectorProps =
  | BodySelectorProps
  | HeaderSelectorProps
  | PathSelectorProps
  | QuerySelectorProps;

export type BodySelectorSchemaType = JSONSchemaType<BodySelectorProps>;
export type HeaderSelectorSchemaType = JSONSchemaType<HeaderSelectorProps>;
export type PathSelectorSchemaType = JSONSchemaType<PathSelectorProps>;
export type QuerySelectorSchemaType = JSONSchemaType<QuerySelectorProps>;

export type MockServerCore = {
  logger: object;
};

export type MockServerOptions = Record<string, unknown> & {
  selectors: AllSelectorProps[];
};
