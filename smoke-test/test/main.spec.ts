import config from './environment-config';
jest.setTimeout(60000);

const getPage = async () => {
  const { username, password } = config;
  await page.authenticate({ username, password });
  return page;
};

describe('Mobile Homepage', () => {
  beforeAll(async () => {
    const authenticatedPage = await getPage();
    await authenticatedPage.goto(config.url, { waitUntil: 'networkidle0' });
  });

  it('should have correct title', async () => {
    const title = await page.title();
    expect(title).toBe('Latest breaking news NZ | Stuff.co.nz | New Zealand');
  });
});
