import { AppPage } from './app.po';
import {browser} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Ristorante Con Fusion message', () => {
    page.navigateTo('/');
    expect(page.getParagraphText('app-root h1')).toEqual('Ristorante Con Fusion');
  });

  it('should navigate to aboutus by clicking on the link', () =>{
    page.navigateTo('/');

    let navlink = page.getAllElements('a').get(1);
    navlink.click();

    expect(page.getParagraphText('h3')).toBe('About Us');
  });

  it("should enter a new comment for the new dish",() =>{
    page.navigateTo('/dishdetail/0');

    let newAuthor = page.getElement("input[type=text]");
    newAuthor.sendKeys('Test Author');

    let newComment = page.getElement('textarea');
    newComment.sendKeys('Test Comment');

    let newSubmitButton = page.getElement('button[type=submit]');
    newSubmitButton.click();

    browser.pause();
  });

});
