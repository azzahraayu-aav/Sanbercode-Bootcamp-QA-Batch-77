import LoginPage from '../../pages/LoginPage'
import RecruitmentPage from '../../pages/RecruitmentPage'

describe('Fitur Recruitment OrangeHRM', () => {

    const loginPage = new LoginPage()
    const recruitmentPage = new RecruitmentPage()

        beforeEach(() => {
            cy.fixture('recruitmentData').then((data) => {

                loginPage.visit()
                loginPage.login(
                    data.username,
                    data.password
                )

                loginPage.verifyDashboard()

                cy.intercept(
                    'GET',
                    '**/api/v2/recruitment/candidates*'
                ).as('candidateList')

                recruitmentPage.openRecruitment()
            })

        })

            it('ORGHR_REC_001 - Akses halaman Recruitment', () => {
                cy.url().should('include', '/recruitment')
                cy.contains('Candidates').should('be.visible')
                cy.get('.oxd-table').should('exist')
            })

            it('ORGHR_REC_002 - Akses halaman Recruitment tab Candidates', () => {
                recruitmentPage.openCandidates()

                cy.wait('@candidateList')
                cy.contains('Candidates').should('be.visible')
            })

            it('ORGHR_REC_003 - Search data Candidates valid', () => {
                cy.fixture('recruitmentData').then((data) => {

                    recruitmentPage.inputCandidateName(
                        data.validCandidate
                    )

                    recruitmentPage.clickSearch()

                    cy.wait('@candidateList').its('response.body.data').should('have.length.greaterThan', 0)
                })

            })

            it('ORGHR_REC_004 - Reset Search Candidates', () => {
                recruitmentPage.inputCandidateName('Stacie Liu')
                recruitmentPage.clickSearch()

                cy.wait('@candidateList')

                recruitmentPage.clickReset()

                cy.wait('@candidateList')
                cy.get('.oxd-table-body .oxd-table-row').should('have.length.greaterThan', 1)
            })

            it('ORGHR_REC_005 - Search Candidate tidak valid', () => {
                cy.fixture('recruitmentData').then((data) => {

                    cy.intercept(
                        'GET',
                        '**/api/v2/recruitment/candidates?candidateName=*'
                    ).as('searchCandidate')

                    recruitmentPage.inputCandidateName(
                        data.invalidCandidate
                    )

                    recruitmentPage.clickSearch()

                    cy.wait('@searchCandidate').then((interception) => {
                        expect(interception.response.statusCode).to.eq(200)
                        expect(interception.request.url).to.contain(
                            encodeURIComponent(data.invalidCandidate)
                            )
                        })
                    })

            })

            it('ORGHR_REC_006 - Search tanpa filter', () => {
                recruitmentPage.clickSearch()

                cy.wait('@candidateList').its('response.statusCode').should('eq', 200)

                cy.get('.oxd-table-row').should('have.length.greaterThan', 0)
            })

            it('ORGHR_REC_007 - Akses halaman Add Candidate', () => {
                recruitmentPage.clickAdd()

                cy.url().should('include', 'addCandidate')
                cy.contains('Add Candidate').should('be.visible')
            })

            it('ORGHR_REC_008 - Kosongkan form Add Candidate', () => {
                recruitmentPage.clickAdd()
                recruitmentPage.clickSave()

                cy.contains('Required').should('exist')
            })

            it('ORGHR_REC_009 - Cancel Add Candidate', () => {
                recruitmentPage.clickAdd()
                recruitmentPage.clickCancel()

                cy.url().should('include', '/recruitment')
            })

            it('ORGHR_REC_010 - Input required field Add Candidate', () => {
                cy.fixture('recruitmentData').then((data) => {

                    recruitmentPage.clickAdd()

                    cy.intercept(
                        'POST',
                        '**/api/v2/recruitment/candidates'
                    ).as('saveCandidate')

                    cy.get('input[name="firstName"]').type(data.firstName)
                    cy.get('input[name="lastName"]').type(data.lastName)
                    // Email
                    cy.get('input[placeholder="Type here"]').first().type(data.email)

                    recruitmentPage.clickSave()

                    cy.wait('@saveCandidate').its('response.statusCode').should('be.oneOf', [200, 201])
                })
            })

            it('ORGHR_REC_011 - Akses halaman Recruitment tab Vacancies', () => {
                recruitmentPage.openVacancies()

                cy.contains('Vacancies').should('be.visible')
                cy.get('.oxd-table').should('exist')
            })

            it('ORGHR_REC_012 - Akses halaman Add Vacancy', () => {
                recruitmentPage.openVacancies()
                recruitmentPage.clickAdd()

                cy.url().should('include', 'addJobVacancy')
                cy.contains('Add Vacancy').should('be.visible')
            })
})