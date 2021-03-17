import  {Word}  from 'src/app/wordRiver/word';

export class AddWordPage {

  navigateTo() {
    return cy.visit('packs/604cdf3cbb468a7463ad4d85/Woods/nouns');
  }

  getTitle() {
    return cy.get('.add-word-title');
  }

  addWordButton() {
    return cy.get('[data-test=addWordButton]');
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

  addWord(newWord: Word) {
    this.getFormField('word').type(newWord.word);
    this.getFormField('forms').type(this.arrayToWord(newWord.forms));
    return this.addWordButton().click();
  }

  arrayToWord(array: Array<string>): string {
      let forms = '';
      for(const form of array) {
          forms += form + ',';
      }
      return forms;
  }
}
