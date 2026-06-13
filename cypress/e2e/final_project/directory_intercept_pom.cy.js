import LoginPage from '../../pages/LoginPage'
import DirectoryPage from '../../pages/DirectoryPage'

describe('Fitur Directory OrangeHRM dengan Intercept & POM', () => {

    const loginPage = new LoginPage()
    const directoryPage = new DirectoryPage()

    let data

        before(() => {
            cy.fixture('directoryData').then((directoryData) => {
                data = directoryData
            })
        })

        beforeEach(() => {
            loginPage.visit()
            loginPage.login(
                'Admin',
                'admin123'
            )

            cy.url().should('include', '/dashboard')
        })

            it('ORGHR_DIR_001 - Akses halaman Directory', () => {
                cy.intercept(
                    'GET',
                    '**/directory/**'
                ).as('directoryPage')

                directoryPage.visitDirectory()

                cy.wait('@directoryPage')

                directoryPage.verifyDirectoryPage()
            })

            it('ORGHR_DIR_002 - Minimize Search Directory', () => {
                directoryPage.visitDirectory()
                directoryPage.employeeNameField().should('be.visible')
                directoryPage.collapseButton().click()
                directoryPage.employeeNameField().should('not.be.visible')
            })

            it('ORGHR_DIR_003 - Search Employee Name valid', () => {
                cy.intercept(
                    'GET',
                    '**/api/v2/directory/employees*'
                ).as('searchEmployee')

                directoryPage.visitDirectory()
                directoryPage.inputEmployeeName(
                    data.employeeName
                )

                directoryPage.clickSearch()

                cy.wait('@searchEmployee').then((interception) => {
                    expect(interception.response.statusCode).to.eq(200)
                })

                cy.get('.oxd-sheet').should('have.length.at.least', 1)
            })

            it('ORGHR_DIR_004 - Search Employee Name tidak valid', () => {
                cy.intercept(
                    'GET',
                    '**/api/v2/directory/employees*'
                ).as('searchInvalid')

                directoryPage.visitDirectory()
                directoryPage.inputEmployeeName(
                    data.invalidEmployeeName
                )

                cy.wait('@searchInvalid')
                cy.contains('Gaada').should('not.exist')
            })

            it('ORGHR_DIR_005 - Search Job Title', () => {
                cy.intercept(
                    'GET',
                    '**/api/v2/directory/employees*'
                ).as('searchJobTitle')

                directoryPage.visitDirectory()
                directoryPage.selectJobTitle(
                    data.jobTitle
                )

                directoryPage.clickSearch()

                cy.wait('@searchJobTitle').then((interception) => {
                    expect(interception.response.statusCode).to.eq(200)
                    expect(interception.response.body.data.length).to.be.greaterThan(0)
                    })

                cy.get('.oxd-sheet').should('have.length.greaterThan', 0)
            })

            it('ORGHR_DIR_006 - Search Location', () => {
                cy.intercept(
                    'GET',
                    '**/api/v2/directory/employees*'
                ).as('searchLocation')

                directoryPage.visitDirectory()
                directoryPage.selectLocation(
                    data.location
                )

                directoryPage.clickSearch()

                cy.wait('@searchLocation').its('response.statusCode').should('eq', 200)
                cy.get('.oxd-sheet').should('exist').and('be.visible').and('have.length.greaterThan', 0)
            })

            it('ORGHR_DIR_007 - Search dengan seluruh filter', () => {
                cy.intercept(
                    'GET',
                    '**/api/v2/directory/employees*'
                ).as('fullSearch')

                directoryPage.visitDirectory()
                directoryPage.inputEmployeeName(
                    data.employeeName
                )

                directoryPage.selectJobTitle(
                    data.jobTitle
                )

                directoryPage.selectLocation(
                    data.location
                )

                directoryPage.clickSearch()

                cy.wait('@fullSearch').then((interception) => {
                    expect(interception.response.statusCode).to.eq(200)
                    expect(interception.response.body.data.length).to.be.greaterThan(0)
                    })
            })

            it('ORGHR_DIR_008 - Search tanpa filter', () => {
                cy.intercept(
                    'GET',
                    '**/api/v2/directory/employees*'
                ).as('emptySearch')

                directoryPage.visitDirectory()
                directoryPage.clickSearch()

                cy.wait('@emptySearch').its('response.statusCode').should('eq', 200)
                cy.get('.oxd-sheet').should('exist')
            })

            it('ORGHR_DIR_009 - Reset seluruh field', () => {
                cy.intercept(
                    'GET',
                    '**/api/v2/directory/employees*'
                ).as('resetAll')

                directoryPage.visitDirectory()
                directoryPage.inputEmployeeName(data.employeeName)
                directoryPage.selectJobTitle(data.jobTitle)
                directoryPage.selectLocation(data.location)
                directoryPage.clickReset()
                directoryPage.employeeNameField().should('have.value', '')

                cy.get('.oxd-sheet').should('exist')
            })

            it('ORGHR_DIR_010 - Lihat detail Directory', () => {
                directoryPage.visitDirectory()
                directoryPage.inputEmployeeName(
                    data.employeeName
                )

                directoryPage.clickSearch()
                directoryPage.clickDirectoryResult()

                cy.url().should('include', 'directory')
            })

            it('ORGHR_DIR_011 - Tutup detail Directory', () => {
                directoryPage.visitDirectory()
                directoryPage.inputEmployeeName(
                    data.employeeName
                )

                directoryPage.clickSearch()
                directoryPage.clickDirectoryResult()
                directoryPage.clickBackDetail()
                directoryPage.verifyDirectoryPage()
            })

            it('ORGHR_DIR_012 - Scroll seluruh Directory', () => {
                directoryPage.visitDirectory()
                cy.scrollTo('bottom')
                cy.get('.oxd-sheet').should('exist')
            })

            it('ORGHR_DIR_013 - Akses OrangeHRM Inc', () => {
                directoryPage.visitDirectory()
                cy.contains('OrangeHRM, Inc').should('have.attr', 'href')
            })

})