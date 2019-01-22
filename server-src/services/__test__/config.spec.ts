import * as configJson from '../../config.json';

describe('Config Service', () => {
  it('should load config based on environment variable', () => {
    jest.resetModules();
    process.env.SPADE_ENV = 'production';
    const config = require('../config').default;
    expect(config).toEqual(configJson['production']);
  });

  it('should fall back to development configuration when environment variable is not present', () => {
    jest.resetModules();
    delete process.env.SPADE_ENV;
    const config = require('../config').default;
    expect(config).toEqual(configJson['development']);
  });

  it('should fall back to development configuration when environment variable is not recognized', () => {
    jest.resetModules();
    process.env.SPADE_ENV = 'something';
    const config = require('../config').default;
    expect(config).toEqual(configJson['development']);
  });
});
