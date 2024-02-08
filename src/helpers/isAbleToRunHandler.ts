import { query } from 'jsonpath';

const notMatchSelector = (value, selector) => {
  let conditionsNotMatches: boolean;
  if (selector.equals) {
    conditionsNotMatches = !(value === selector.equals);
  } else {
    conditionsNotMatches = !new RegExp(selector.matchReg).test(value);
  }

  return conditionsNotMatches;
};

const isAbleToRunMiddleware = (selectors, req) => {
  let satisfySelectorsCondition = true;
  if (selectors) {
    for (const selector of selectors) {
      if ('bodyJsonPath' in selector) {
        const bodyConditions = query(req.body, selector.bodyJsonPath);
        const noBodyConditions = bodyConditions.length === 0;
        const noBodyConditionsEqual = bodyConditions.every((result) => !(result === selector.equals));
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

        if (noQueryConditions || notMatchSelector(queryConditions, selector)) {
          satisfySelectorsCondition = false;
        }
      }
    }
  }
  return satisfySelectorsCondition;
};

export default isAbleToRunMiddleware;
