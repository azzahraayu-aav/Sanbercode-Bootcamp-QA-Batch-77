import LoginPage from '../../pages/LoginPage'

describe('Login OrangeHRM with POM', () => {

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

            it('ORGHR_POM_001 - Akses halaman login', () => {

                loginPage.usernameField().should('be.visible')
                loginPage.passwordField().should('be.visible')

            })

            it('ORGHR_POM_002 - Login dengan data valid', () => {

                loginPage.login(
                    data.validUser.username,
                    data.validUser.password
                )

                loginPage.verifyDashboard()

            })

            it('ORGHR_POM_003 - Login username salah password benar', () => {

                loginPage.login(
                    data.invalidUsername.username,
                    data.invalidUsername.password
                )

                loginPage.verifyInvalidCredentials()

            })

            it('ORGHR_POM_004 - Login username benar password salah', () => {

                loginPage.login(
                    data.invalidPassword.username,
                    data.invalidPassword.password
                )

                loginPage.verifyInvalidCredentials()

            })

            it('ORGHR_POM_005 - Login akun belum terdaftar', () => {

                loginPage.login(
                    data.unregisteredUser.username,
                    data.unregisteredUser.password
                )

                loginPage.verifyInvalidCredentials()

            })

            it('ORGHR_POM_006 - Login tanpa mengisi field', () => {

                loginPage.clickLogin()

                loginPage.verifyRequiredField()

            })

})