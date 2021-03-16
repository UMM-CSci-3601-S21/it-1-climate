import { xorBy } from 'cypress/types/lodash';
import { WordList } from 'src/app/wordRiver/word-list';
import { AddWordListPage } from '../support/add-wl.po';



describe('Add Word List', () => {
    const page = new AddWordListPage();

    beforeEach(() => {
        page.navigateTo();
    });

    it('Should have the correct title', () => {
        page.getTitle().should('have.text', 'New Word List');
    });

    it('Should enable and disable the add word list button', () => {
        page.addWordListButton().should('be.disabled');
        page.getFormField('name').type('test');
        page.addWordListButton().should('be.disabled');

        // Test the button disabled when no enabled option picked
        page.addWordListButton().should('be.disabled');
        // Select true for enabled
        page.getFormField('enabled').click().then(() => {
            cy.get('#true').click();
        });
        // Button should be enabled
        page.addWordListButton().should('be.enabled');
        // Switch to False and button should still be enabled
        page.getFormField('enabled').click().then(() => {
            cy.get('#false').click();
        });
        page.addWordListButton().should('be.enabled');
    });


    it('Should show error messages for invalid inputs', () => {
      //Before doing anything there shouldn't be an error
      cy.get('[data-test=nameError]').should('not.exist');

      //Just clicking the name field without entering anything should cause an error message
      page.getFormField('name').click().blur();
      cy.get('[data-test=nameError]').should('exist').and('be.visible');

      page.getFormField('name').clear().type('This is a very long name that goes beyond the 50 character limit');
      cy.get('[data-test=nameError]').should('exist').and('be.visible');

      //Entering a valid name should remove the error
      page.getFormField('name').clear().type('Iron Man Suits').blur();
      cy.get('[data-test=nameError]').should('not.exist');
    });

    describe('Adding a new Word List', () => {

        beforeEach(() => {
            cy.task('seed:database');
        });

        it('Should say that a word list was successfully added', () => {
            const wordList: WordList = {
                name: 'new word list',
                enabled: true,
                nouns: [],
                adjectives: [],
                verbs: [],
                misc: []
            };

            page.addWordList(wordList);

            cy.get('.mat-simple-snackbar').should('contain', `Added the ${wordList.name} word list successfully`);
        });
    });

});
