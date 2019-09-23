/* istanbul ignore file */
export const environment = {
  production: true,
  serverBase: 'http://localhost:4000',
  version: process.env.SPADE_VERSION || 'SNAPSHOT',
  backendUrl: '/api/content'
};
