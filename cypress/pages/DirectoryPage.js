class DirectoryPage {

    visitDirectory() {
        cy.get('a[href="/web/index.php/directory/viewDirectory"]').click()
    }

    collapseButton() {
        return cy.get('i.bi-caret-down-fill').parent()
    }

    employeeNameField() {
        return cy.get('input[placeholder="Type for hints..."]').first()
    }

    jobTitleDropdown() {
        return cy.get('.oxd-select-text').eq(0)
    }

    locationDropdown() {
        return cy.get('.oxd-select-text').eq(1)
    }

    searchButton() {
        return cy.contains('button', 'Search')
    }

    resetButton() {
        return cy.contains('button', 'Reset')
    }

    collapseButton() {
        return cy.get('button').find('i.bi-caret-up-fill')
    }

    inputEmployeeName(name) {
    this.employeeNameField().clear().type(name)
    }

    selectJobTitle(jobTitle) {
        this.jobTitleDropdown().click()
        cy.contains('.oxd-select-option', jobTitle).click()
    }

    selectLocation(location) {
        this.locationDropdown().click()
        cy.contains('.oxd-select-option', location).click()
    }

    clickSearch() {
        this.searchButton().click()
    }

    clickSearch() {
        cy.contains('button', 'Search').click()
    }

    clickReset() {
        this.resetButton().click()
    }

    clickDirectoryResult() {
        cy.get('.oxd-sheet').first().click()
    }

    clickBackDetail() {
        cy.get('.bi-arrow-right').last().click({ force: true })
    }

    verifyDirectoryPage() {
        cy.url().should('include', '/directory/viewDirectory')
        cy.contains('Directory').should('be.visible')
    }
}

export default DirectoryPage