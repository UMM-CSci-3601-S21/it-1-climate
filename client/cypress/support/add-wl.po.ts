import {WordList} from 'src/app/wordRiver/word-list';

export class AddWordListPage {

  navigateTo() {
    return cy.visit('/packs/604cdf3cafacd4fba940b683/new');
  }

  getTitle() {
    return cy.get('.add-wl-title');
  }

  addWordListButton() {
    return cy.get('[data-test=addWlButton]');
    }

  selectMatSelectValue(select: Cypress.Chainable, value: string) {
    // Find and click the drop down
    return select.click()
    // Select and click the desired value from the resulting menu
      .get(`mat-option[value="${value}"]`).click();
  }
  getFormField(fieldName: string) {
    return cy.get(`mat-form-field [formcontrolname=${(fieldName)}]`);
  }

  addWordList(newWordList: WordList) {
    this.getFormField('name').type(newWordList.name);
    this.selectMatSelectValue(this.getFormField('enabled'), newWordList.enabled.toString());
    return this.addWordListButton().click();
  }
}
