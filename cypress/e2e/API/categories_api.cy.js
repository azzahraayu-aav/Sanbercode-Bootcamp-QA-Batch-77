describe('Platzi Categories API Automation Testing', () => {

  let categoryId

    it('API_CAT_001 - Get All Categories', () => {
        cy.request('GET', 'https://api.escuelajs.co/api/v1/categories')
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
        })
    })

    it('API_CAT_002 - Get Category By ID 3', () => {
        cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/3')
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.id).to.eq(3)
        })
    })

    it('API_CAT_003 - Get Category By ID 4', () => {
        cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/4')
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.id).to.eq(4)
        })
    })

    it('API_CAT_004 - Get Category By Slug Furniture', () => {
        cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/slug/furniture')
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.slug).to.eq('furniture')
        })
    })

    it('API_CAT_005 - Create Category', () => {
        cy.request('POST',
        'https://api.escuelajs.co/api/v1/categories',
        {
            name: 'Kategori ZAH',
            image: 'https://placeimg.com/640/480/any'
        })
        .then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.name).to.eq('Kategori ZAH')

            categoryId = response.body.id
        })
    })

    it('API_CAT_006 - Get Created Category', () => {
        cy.request('GET',
        `https://api.escuelajs.co/api/v1/categories/75`)
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.id).to.eq(categoryId)
        })
    })

    it('API_CAT_007 - Update Category Name', () => {
        cy.request('PUT',
        `https://api.escuelajs.co/api/v1/categories/2`,
        {
            name: 'Updated Kategori AAV',
            image: 'https://placeimg.com/640/480/any'
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.name)
            .to.eq('Updated Kategori AAV')
        })
    })

    it('API_CAT_008 - Verify Updated Category', () => {
        cy.request('GET',
        `https://api.escuelajs.co/api/v1/categories/2`)
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.name)
            .to.eq('Updated Kategori AAV')
        })
    })

    it('API_CAT_009 - Get Products From Category 1', () => {
        cy.request('GET',
        'https://api.escuelajs.co/api/v1/categories/1/products')
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
        })
    })

    it('API_CAT_010 - Get Products From Category 2', () => {
        cy.request('GET',
        'https://api.escuelajs.co/api/v1/categories/2/products')
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
        })
    })

    it('API_CAT_011 - Delete Category', () => {
        cy.request('DELETE',
        `https://api.escuelajs.co/api/v1/categories/74`)
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('API_CAT_012 - Verify Deleted Category', () => {
        cy.request({
        method: 'GET',
        url: `https://api.escuelajs.co/api/v1/categories/74`,
        failOnStatusCode: false
        })
        .then((response) => {
        expect(response.status).to.be.oneOf([404, 400])
        })
    })

})