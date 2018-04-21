import { Angular2BlogPage } from './app.po';

describe('angular2-blog App', function() {
  let page: Angular2BlogPage;

  beforeEach(() => {
    page = new Angular2BlogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
