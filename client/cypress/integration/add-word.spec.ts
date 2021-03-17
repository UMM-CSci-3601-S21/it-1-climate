import { Word } from 'src/app/wordRiver/word';
import { AddWordPage } from '../support/add-word.po';



describe('Add Word', () => {
    const page = new AddWordPage();

    beforeEach(() => {
        page.navigateTo();
    });

    it('Should have the correct title', () => {
        page.getTitle().should('have.text', 'New Word');
    });

    it('Should enable and disable the add word button', () => {
        page.addWordButton().should('be.disabled');
        page.getFormField('word').type('test');
        page.addWordButton().should('be.disabled');

        // Test the button disabled when no enabled option picked
        page.addWordButton().should('be.disabled');
        // Select true for enabled
        page.getFormField('forms').click().type('test, tests');
        });

    it('Should show error messages for invalid inputs', () => {
        //Before doing anything there shouldn't be an error
        cy.get('[data-test=wordError]').should('not.exist');

        //Just clicking the name field without entering anything should cause an error message
        page.getFormField('word').click().blur();
        cy.get('[data-test=wordError]').should('exist').and('be.visible');

        page.getFormField('word').clear().type('This is a very long word that goes beyond the 50 character limit');
        cy.get('[data-test=wordError]').should('exist').and('be.visible');

        //Entering a valid name should remove the error
        page.getFormField('word').clear().type('bus').blur();
        cy.get('[data-test=wordError]').should('not.exist');
    });

    describe('Adding a new Word', () => {

        beforeEach(() => {
            cy.task('seed:database');
        });

        it('Should say that a word was successfully added', () => {
            const word: Word = {
                word: 'bus',
                forms: ['bus','buses']
            };

            page.addWord(word);

            cy.get('.mat-simple-snackbar').should('contain', `Added ${word.word} successfully`);
        });
    });
  });
