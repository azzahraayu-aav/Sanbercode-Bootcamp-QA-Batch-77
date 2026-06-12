describe('Fitur Login OrangeHRM', () => {
    
    beforeEach(() => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })
    
    it('ORGHR_LGN_001 - Akses halaman Login', () => {
    
      cy.url().should('include', '/auth/login')
    
      cy.get('input[name="username"]')
        .should('be.visible')
    
      cy.get('input[name="password"]')
        .should('be.visible')
    })
    
    it('ORGHR_LGN_002 - Input Username dan Password', () => {
    
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
    
      cy.get('input[name="username"]').type('Admin')
      cy.get('input[name="password"]').type('admin123')
    
      cy.get('button[type="submit"]').click()
    
      cy.url().should('include', '/dashboard')
    })
    
    it('ORGHR_LGN_004 - Login Username salah Password benar', () => {
    
      cy.get('input[name="username"]').type('Admin123')
      cy.get('input[name="password"]').type('admin123')
    
      cy.get('button[type="submit"]').click()
    
      cy.contains('Invalid credentials')
        .should('be.visible')
    })
    
    it('ORGHR_LGN_005 - Login Username benar Password salah', () => {
    
      cy.get('input[name="username"]').type('Admin')
      cy.get('input[name="password"]').type('salah123')
    
      cy.get('button[type="submit"]').click()
    
      cy.contains('Invalid credentials')
        .should('be.visible')
    })
    
    it('ORGHR_LGN_006 - Login akun belum terdaftar', () => {
    
      cy.get('input[name="username"]').type('UserTesting')
      cy.get('input[name="password"]').type('UserTesting123')
    
      cy.get('button[type="submit"]').click()
    
      cy.contains('Invalid credentials')
        .should('be.visible')
    })
    
    it('ORGHR_LGN_007 - Login tanpa mengisi field', () => {
    
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