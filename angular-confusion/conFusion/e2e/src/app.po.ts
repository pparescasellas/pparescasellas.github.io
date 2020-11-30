import { browser, by, element } from 'protractor';

export class AppPage {
    navigateTo(link: string): Promise<unknown> {
        return browser.get(link) as Promise<unknown>;
    }

    getParagraphTest(selector: string) {
        return element(by.css(selector)).getText();
    }

    getElement(selector: string) {
        return element(by.css(selector));
    }

    getAllElements(selector: string) {
        return element.all(by.css(selector));
    }
}
