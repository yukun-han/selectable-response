import ExtendedJsonHandler from './handlers/extendedJsonHandler.js';
import ExtendedMiddlewareHandler from './handlers/extendedMiddlewareHandler.js';

export const init = () => 'Hello World';
export { ExtendedJsonHandler, ExtendedMiddlewareHandler };
export * from './schema/index.js';
