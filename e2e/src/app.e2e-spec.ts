import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display application name', () => {
    page.navigateTo();
    expect(page.getLogoText()).toEqual('Welcome to Stuff Homepage and Section page');
  });
});
