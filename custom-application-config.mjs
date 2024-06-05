import { PERMISSIONS, entryPointUriPath } from './src/constants';

/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptionsForCustomApplication}
 */
const config = {
  name: 'Navigation App',
  entryPointUriPath,
  cloudIdentifier: 'gcp-eu',
  headers: {
    csp: {
      'connect-src': ['self'],
      'frame-src': ['self', 'https://app.csvbox.io/'],
    },
  },
  env: {
    development: {
      initialProjectKey: 'navigation-app',
    },
    production: {
      applicationId: '${env:APPLICATION_ID}',
      url: '${env:APP_URL}',
    },
  },
  oAuthScopes: {
    view: ['view_products'],
    manage: ['manage_products'],
  },
  icon: '${path:@commercetools-frontend/assets/application-icons/rocket.svg}',
  mainMenuLink: {
    defaultLabel: 'Template starter',
    labelAllLocales: [],
    permissions: [PERMISSIONS.View],
  },
  submenuLinks: [],
};

export default config;
