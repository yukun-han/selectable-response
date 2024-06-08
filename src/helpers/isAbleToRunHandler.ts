import type { Request } from 'express';
import { query } from 'jsonpath';
import type { AllSelectorProps, SelectorBase } from '../types.js';

const notMatchSelector = (value: string, selector: SelectorBase): boolean => {
  let conditionsNotMatches = false;
  if (selector.equals) {
    conditionsNotMatches = !(value === selector.equals);
  } else {
    conditionsNotMatches = !new RegExp(selector.matchReg).test(value);
  }

  return conditionsNotMatches;
};

const isAbleToRunMiddleware = (selectors: AllSelectorProps[], req: Request): boolean => {
  let satisfySelectorsCondition = true;
  if (selectors) {
    for (const selector of selectors) {
      if ('bodyJsonPath' in selector) {
        const bodyConditions = query(req.body, selector.bodyJsonPath);
        const noBodyConditions = bodyConditions.length === 0;
        const noBodyConditionsEqual = bodyConditions.every(
          (result) => !(result === selector.equals),
        );
        if (noBodyConditions || noBodyConditionsEqual) {
          satisfySelectorsCondition = false;
        }
      }

      if ('headerKey' in selector) {
        const headerConditions = req.get(selector.headerKey);
        const noHeaderConditions = !headerConditions;

        if (noHeaderConditions || notMatchSelector(headerConditions, selector)) {
          satisfySelectorsCondition = false;
        }
      }

      if ('pathVariable' in selector) {
        const pathConditions = req.params[selector.pathVariable];
        const noPathConditions = !pathConditions;

        if (noPathConditions || notMatchSelector(pathConditions, selector)) {
          satisfySelectorsCondition = false;
        }
      }

      if ('queryParams' in selector) {
        const queryConditions = req.query[selector.queryParams];
        const noQueryConditions = !queryConditions;

        // TODO: may need to handle string array
        if (noQueryConditions || notMatchSelector(queryConditions as string, selector)) {
          satisfySelectorsCondition = false;
        }
      }
    }
  }
  return satisfySelectorsCondition;
};

export default isAbleToRunMiddleware;
