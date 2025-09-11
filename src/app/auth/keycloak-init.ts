import { ProvideKeycloakOptions } from 'keycloak-angular';

export const keycloakOptions: ProvideKeycloakOptions = {
  config: {
    url: 'http://localhost:8080',
    realm: 'collabHub',
    clientId: 'collab-hub-frontend',
  },
  initOptions: {
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
    redirectUri: 'http://localhost:4200',
  },
};
