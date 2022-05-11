/* eslint-disable no-undef */
/// <reference types="cypress" />

import { iamsInUse, testProgrammeName } from '../../config/common'

describe('Misc tests', () => {
  beforeEach(() => {
    const user = 'cypressUser'
    cy.givePermissions(user, testProgrammeName, 'admin')
    cy.login(user)
    cy.visit('/')
  })

  it('Locale can be changed and translations work', () => {
    cy.visit(`/form/${testProgrammeName}`)
    cy.contains('Answers are saved automatically. ')
    cy.get('[data-cy=navBar-localeDropdown]').click()
    cy.get('[data-cy=navBar-localeOption-fi]').click()
    cy.contains('Vastaukset tallentuvat automaattisesti.')
  })

  it('CSV-download can be started on OverviewPage', () => {
    cy.get('[data-cy=csv-download]').should('contain', 'Download')
    cy.get('[data-cy=csv-download]').click()
  })

  it('CSV-download can be started on FormPage', () => {
    cy.visit(`/form/${testProgrammeName}`)
    cy.get('[data-cy=csv-download]').should('contain', 'Download')
    cy.get('[data-cy=csv-download]').click()
  })

  // eslint-disable-next-line no-unused-expressions
  !iamsInUse &&
    it('Access keys are pre-generated', () => {
      cy.get(`[data-cy=${testProgrammeName}-manage]`).click()
      cy.get(`[data-cy=${testProgrammeName}-viewlink] > input`).invoke('val').should('contain', '/access/')
      cy.get(`[data-cy=${testProgrammeName}-editlink] > input`).invoke('val').should('contain', '/access/')
    })

  /**
   * This feature only works for "superadmins".
   */
  it.skip('Access link can be reset/updated', () => {
    cy.get(`[data-cy=${testProgrammeName}-manage]`).click()
    cy.server()

    cy.get(`[data-cy=${testProgrammeName}-viewlink] > input`)
      .invoke('val')
      .then(text => {
        const initialLink = text
        cy.route('POST', `/api/programmes/${testProgrammeName}/tokens/*`).as('reset')
        cy.get(`[data-cy=${testProgrammeName}-viewlink-reset]`).click()
        cy.get('[data-cy=confirm-reset]').click()
        cy.wait('@reset')

        cy.get(`[data-cy=${testProgrammeName}-viewlink] > input`)
          .invoke('val')
          .then(text => {
            const newLink = text
            expect(initialLink).to.not.equal(newLink)
          })
      })
  })
})
