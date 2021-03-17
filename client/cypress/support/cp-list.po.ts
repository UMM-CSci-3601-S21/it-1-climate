

export class CpListPage {

    navigateTo() {
        return cy.visit('/packs');
    }

    getCpCards() {
        return cy.get('.context-pack-display app-cp-card');
    }



    clickNounsButton(pack: Cypress.Chainable<JQuery<HTMLElement>>) {
      return pack.find<HTMLButtonElement>('[data-test=addNounButton]').click();
    }

    clickAdjectivesButton(pack: Cypress.Chainable<JQuery<HTMLElement>>) {
        return pack.find<HTMLButtonElement>('[data-test=addAdjectiveButton]').click();
    }

    clickVerbsButton(pack: Cypress.Chainable<JQuery<HTMLElement>>) {
        return pack.find<HTMLButtonElement>('[data-test=addVerbButton]').click();
    }

    clickMiscButton(pack: Cypress.Chainable<JQuery<HTMLElement>>) {
        return pack.find<HTMLButtonElement>('[data-test=addMiscButton]').click();
    }

    clickViewCp(pack: Cypress.Chainable<JQuery<HTMLElement>>) {
        return pack.find<HTMLButtonElement>('[data-test=viewContextPackButton]').click();
    }

    addCpButton() {
        return cy.get('[data-test=addCpButton]');
    }

  getWlCard() {
    return cy.get('.word-list-container app-wl-card');
  }
}
