module.exports = {
  preset: 'jest-puppeteer',
  roots: ['<rootDir>/test'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  }
};
