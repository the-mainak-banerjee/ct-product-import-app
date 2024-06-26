// Make sure to import the helper functions from the `ssr` entry point.
import { entryPointUriPathToPermissionKeys } from '@commercetools-frontend/application-shell/ssr';

export const entryPointUriPath = 'navigation-app';

export const PERMISSIONS = entryPointUriPathToPermissionKeys(entryPointUriPath);

export const REDIRECT_CONTAINER = 'Redirect';

export const MAX_QUERY_LIMIT = 500;
