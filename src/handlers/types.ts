import { AllSelectorProps } from '../schema/types.js';

export type MockServerCore = {
  logger: any;
};

export type MockServerOptions = Record<string, any> & {
  selectors: AllSelectorProps[];
};
