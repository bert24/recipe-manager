import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getHeaderTitle() {
    return element(by.id('logo-span')).getText();
  }

  getSearchFieldPh() {
    return element(by.css('.search-field')).getAttribute('placeholder');
  }
}
