import { CpListPage } from '../support/cp-list.po';

const page = new CpListPage();

describe('Cp List', () => {

    before(() => {
        cy.task('seed:database');
    });

    beforeEach(() => {
        page.navigateTo();
    });

    it('Should have 23 context packs', () => {
        page.getCpCards().should('have.length', 23);
    });

    it('Should click "View Context Pack" on a context pack and lead to a valid URL', () => {
        page.getCpCards().first().then((card) => {
            const cpName = card.find('.cp-card-name').text();
            const cpEnabled = card.find('.cp-card-enabled').text();

            page.clickViewCp(page.getCpCards().first());

            cy.url().should('match', /\/packs\/[0-9a-fA-F]{24}/);

            cy.get('.cp-card-name').first().should('have.text', cpName);
            cy.get('.cp-card-enabled').first().should('have.value', cpEnabled);
        });
    });
});
