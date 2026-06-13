import LoginPage from '../../pages/LoginPage'

describe('Fitur Login OrangeHRM dengan Intercept & POM', () => {

    const loginPage = new LoginPage()
    let data

        before(() => {
            cy.fixture('loginData').then((loginData) => {
                data = loginData
            })
        })

        beforeEach(() => {
            loginPage.visit()
        })

            it('ORGHR_INTPOM_001 - Akses halaman Login', () => {
                cy.intercept('GET', '**/login').as('loginPage')
                cy.reload()
                cy.wait('@loginPage').its('response.statusCode').should('eq', 200)

                loginPage.usernameField().should('be.visible')
                loginPage.passwordField().should('be.visible')
            })

            it('ORGHR_INTPOM_002 - Input Username dan Password', () => {
                cy.intercept('GET', '**/messages').as('messages')
                cy.reload()
                cy.wait('@messages')

                loginPage.inputUsername(data.validUser.username)
                loginPage.inputPassword(data.validUser.password)

                loginPage.usernameField().should('have.value', data.validUser.username)
                loginPage.passwordField().should('have.value', data.validUser.password)
            })

            it('ORGHR_INTPOM_003 - Login dengan data valid', () => {
                cy.intercept('POST', '**/validate').as('loginValid')

                loginPage.login(
                    data.validUser.username,
                    data.validUser.password
                )

                cy.wait('@loginValid').its('response.statusCode').should('eq', 302)

                loginPage.verifyDashboard()
            })

            it('ORGHR_INTPOM_004 - Login username salah password benar', () => {
                cy.intercept('POST', '**/validate').as('invalidUser')

                loginPage.login(
                    data.invalidUsername.username,
                    data.invalidUsername.password
                )

                cy.wait('@invalidUser')

                loginPage.verifyInvalidCredentials()
            })

            it('ORGHR_INTPOM_005 - Login username benar password salah', () => {
                cy.intercept('POST', '**/validate').as('invalidPassword')

                loginPage.login(
                    data.invalidPassword.username,
                    data.invalidPassword.password
                )

                cy.wait('@invalidPassword')

                loginPage.verifyInvalidCredentials()
            })

            it('ORGHR_INTPOM_006 - Login akun belum terdaftar', () => {
                cy.intercept('POST', '**/validate').as('unregisteredUser')

                loginPage.login(
                    data.unregisteredUser.username,
                    data.unregisteredUser.password
                )

                cy.wait('@unregisteredUser')

                loginPage.verifyInvalidCredentials()
            })

            it('ORGHR_INTPOM_007 - Login tanpa mengisi field', () => {
                cy.intercept('GET', '**/messages').as('requiredField')
                cy.reload()
                cy.wait('@requiredField')

                loginPage.clickLogin()
                loginPage.verifyRequiredField()
            })

            it('ORGHR_INTPOM_008 - Akses OrangeHRM Inc', () => {
                cy.contains('OrangeHRM, Inc').should('have.attr', 'href')
            })

            it('ORGHR_INTPOM_009 - Akses Linkedin OrangeHRM', () => {
                cy.get('a[href*="linkedin"]').should('have.attr', 'href')
            })

            it('ORGHR_INTPOM_010 - Akses Facebook OrangeHRM', () => {
                cy.get('a[href*="facebook"]').should('have.attr', 'href')
            })

            it('ORGHR_INTPOM_011 - Akses Twitter OrangeHRM', () => {
                cy.get('a[href*="twitter"]').should('have.attr', 'href')
            })

            it('ORGHR_INTPOM_012 - Akses Youtube OrangeHRM', () => {
                cy.get('a[href*="youtube"]').should('have.attr', 'href')
            })

})