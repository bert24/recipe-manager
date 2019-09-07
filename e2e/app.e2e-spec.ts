import { AppPage } from './app.po';

describe('recipe-manager Header', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display page title', () => {
    page.navigateTo();
    expect(page.getHeaderTitle()).toContain('RecipeManager');
  });
});

describe('recipe-manager Searcher', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display search field placeholder', () => {
    page.navigateTo();
    expect(page.getSearchFieldPh()).toBe('Search for recipes...');
  });
});
