class LoginPage {

    visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.url().should('include', '/auth/login')

    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible')
    }

    usernameField() {
        return cy.get('input[name="username"]')
    }

    passwordField() {
        return cy.get('input[name="password"]')
    }

    loginButton() {
        return cy.get('button[type="submit"]')
    }

    inputUsername(username) {
        this.usernameField().type(username)
    }

    inputPassword(password) {
        this.passwordField().type(password)
    }

    clickLogin() {
        this.loginButton().click()
    }

    login(username, password) {
        this.inputUsername(username)
        this.inputPassword(password)
        this.clickLogin()
    }

    verifyDashboard() {
        cy.url().should('include', '/dashboard')
    }

    verifyInvalidCredentials() {
        cy.contains('Invalid credentials').should('be.visible')
    }

    verifyRequiredField() {
        cy.contains('Required').should('be.visible')
    }
}

export default LoginPage