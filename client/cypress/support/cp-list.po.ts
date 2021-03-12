import {ContextPack} from 'src/app/wordRiver/context-pack';

export class CpListPage {

    navigateTo() {
        return cy.visit('/packs');
    }

    getCpCards() {
        return cy.get('.context-pack-display app-cp-card');
    }

    clickViewCp(pack: Cypress.Chainable<JQuery<HTMLElement>>) {
        return pack.find<HTMLButtonElement>('[data-test=viewContextPackButton]').click();
    }

    addCpButton() {
        return cy.get('[data-test=addCpButton]');
    }
}
