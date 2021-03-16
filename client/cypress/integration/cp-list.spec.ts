import { CpListPage } from '../support/cp-list.po';

const page = new CpListPage();

describe('Cp List', () => {

    before(() => {
        cy.task('seed:database');
    });

    beforeEach(() => {
        page.navigateTo();
    });

    it('Should have 13 context packs', () => {
        page.getCpCards().should('have.length', 13);
    });

    it('Should click "View Context Pack" on a context pack and lead to a valid URL', () => {
        page.getCpCards().first().then((card) => {
            const cpName = card.find('.cp-card-name').text();
            const cpEnabled = card.find('.cp-card-enabled').text();

            page.clickViewCp(page.getCpCards().first());

            cy.url().should('match', /\/packs\/[0-9a-fA-F]{24}/);

            cy.get('#icon').first().should('be.visible');
            cy.get('.cp-card-name').first().should('have.text', cpName);
            cy.get('.cp-card-enabled').first().should('have.value', cpEnabled);

        });
    });

    it('Should click "View Context Pack" on a context pack and have one word list', () => {
      page.getCpCards().first().then((card) => {
          const cpName = card.find('.cp-card-name').text();
          const cpEnabled = card.find('.cp-card-enabled').text();

          page.clickViewCp(page.getCpCards().first());

          cy.url().should('match', /\/packs\/[0-9a-fA-F]{24}/);

         page.getWlCard().should('have.length', 1);

      });
    });

    it('Should click add context pack and go to the right URL',() => {
        page.addCpButton().click();
        cy.url().should(url => expect(url.endsWith('/packs/new')).to.be.true);
        cy.get('.add-cp-title').should('have.text', 'New Context Pack');
    });
});
