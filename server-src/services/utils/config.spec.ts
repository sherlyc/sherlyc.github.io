import * as configJson from './__fixtures__/config.json';
import * as strapConfig from './__fixtures__/strapConfig.json';
import * as configForProduction from './__fixtures__/expectedConfigWithOverridenStraps.json';

jest.mock('../../config.json', () => configJson, { virtual: true });
jest.mock('../../strapConfig.json', () => strapConfig, { virtual: true });

describe('Config Service', () => {
  it('should load config based on environment variable', () => {
    jest.resetModules();
    process.env.SPADE_ENV = 'staging';
    const config = require('./config').default;
    expect(config).toEqual({ ...configJson['staging'], strapConfig });
  });

  it('should fall back to production configuration when environment variable is not present', () => {
    jest.resetModules();
    delete process.env.SPADE_ENV;
    const config = require('./config').default;
    expect(config).toEqual(configForProduction);
  });

  it('should fall back to production configuration when environment variable is not recognized', () => {
    jest.resetModules();
    process.env.SPADE_ENV = 'something';
    const config = require('./config').default;
    expect(config).toEqual({ ...configJson['production'], strapConfig });
  });

  it('should load strap overrides configuration based on environment', () => {
    jest.resetModules();
    process.env.SPADE_ENV = 'production';
    const config = require('./config').default;
    expect(config).toEqual(configForProduction);
  });
});
