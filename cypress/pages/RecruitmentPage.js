class RecruitmentPage {

    recruitmentMenu() {
        return cy.contains('Recruitment')
    }

    candidatesTab() {
        return cy.contains('Candidates')
    }

    vacanciesTab() {
        return cy.contains('Vacancies')
    }

    addButton() {
        return cy.contains('Add')
    }

    searchButton() {
        return cy.contains('button', 'Search')
    }

    resetButton() {
        return cy.contains('button', 'Reset')
    }

    saveButton() {
        return cy.contains('button', 'Save')
    }

    cancelButton() {
        return cy.contains('button', 'Cancel')
    }

    candidateNameField() {
        return cy.get('input[placeholder="Type for hints..."]').first()
    }

    openRecruitment() {
        this.recruitmentMenu().click()
    }

    openCandidates() {
        this.candidatesTab().click()
    }

    openVacancies() {
        this.vacanciesTab().click()
    }

    inputCandidateName(name) {
        this.candidateNameField().clear().type(name)
    }

    clickSearch() {
        this.searchButton().click()
    }

    clickReset() {
        this.resetButton().click()
    }

    clickAdd() {
        this.addButton().click()
    }

    clickSave() {
        this.saveButton().click()
    }

    clickCancel() {
        this.cancelButton().click()
    }
}

export default RecruitmentPage