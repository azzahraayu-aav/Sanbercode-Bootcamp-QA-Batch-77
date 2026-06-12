describe('Fitur Login OrangeHRM dengan Intercepting Network Requests', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

    it('ORGHR_LGN_001 - Akses halaman Login', () => {

        cy.intercept('GET', '**/login').as('loginPage')

        cy.reload()

        cy.wait('@loginPage').its('response.statusCode').should('eq', 200)

        cy.url().should('include', '/auth/login')

        cy.get('input[name="username"]')
        .should('be.visible')

        cy.get('input[name="password"]')
        .should('be.visible')
    })

    it('ORGHR_LGN_002 - Input Username dan Password', () => {

        cy.intercept('GET', '**/messages').as('messages')

        cy.reload()

        cy.wait('@messages')

        cy.get('input[name="username"]')
        .type('Admin')

        cy.get('input[name="password"]')
        .type('admin123')

        cy.get('input[name="username"]')
        .should('have.value', 'Admin')

        cy.get('input[name="password"]')
        .should('have.value', 'admin123')
    })

    it('ORGHR_LGN_003 - Login dengan data valid', () => {

        cy.intercept('POST', '**/validate').as('loginValid')

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')

        cy.get('button[type="submit"]').click()

        cy.wait('@loginValid')
        .its('response.statusCode')
        .should('eq', 302)

        cy.url().should('include', '/dashboard')
    })

    it('ORGHR_LGN_004 - Login Username salah Password benar', () => {

        cy.intercept('POST', '**/validate').as('invalidUser')

        cy.get('input[name="username"]').type('Admin123')
        cy.get('input[name="password"]').type('admin123')

        cy.get('button[type="submit"]').click()

        cy.wait('@invalidUser')

        cy.contains('Invalid credentials')
        .should('be.visible')
    })

    it('ORGHR_LGN_005 - Login Username benar Password salah', () => {

        cy.intercept('POST', '**/validate').as('invalidPassword')

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('salah123')

        cy.get('button[type="submit"]').click()

        cy.wait('@invalidPassword')

        cy.contains('Invalid credentials')
        .should('be.visible')
    })

    it('ORGHR_LGN_006 - Login akun belum terdaftar', () => {

        cy.intercept('POST', '**/validate').as('unregisteredUser')

        cy.get('input[name="username"]').type('UserTesting')
        cy.get('input[name="password"]').type('UserTesting123')

        cy.get('button[type="submit"]').click()

        cy.wait('@unregisteredUser')

        cy.contains('Invalid credentials')
        .should('be.visible')
    })

    it('ORGHR_LGN_007 - Login tanpa mengisi field', () => {

        cy.intercept('GET', '**/messages').as('requiredField')

        cy.reload()

        cy.wait('@requiredField')

        cy.get('button[type="submit"]').click()

        cy.contains('Required')
        .should('be.visible')
    })

    it('ORGHR_LGN_008 - Akses OrangeHRM Inc', () => {
    
      cy.contains('OrangeHRM, Inc')
        .should('have.attr', 'href')
    })
    
    it('ORGHR_LGN_009 - Akses Linkedin OrangeHRM', () => {
    
    cy.get('a[href*="linkedin"]')
      .should('have.attr', 'href')
    })
    
    it('ORGHR_LGN_010 - Akses Facebook OrangeHRM', () => {
    
    cy.get('a[href*="facebook"]')
      .should('have.attr', 'href')
    })
    
    it('ORGHR_LGN_011 - Akses Twitter OrangeHRM', () => {
    
    cy.get('a[href*="twitter"]')
      .should('have.attr', 'href')
    })
    
    it('ORGHR_LGN_012 - Akses Youtube OrangeHRM', () => {
    
    cy.get('a[href*="youtube"]')
      .should('have.attr', 'href')
    })

})