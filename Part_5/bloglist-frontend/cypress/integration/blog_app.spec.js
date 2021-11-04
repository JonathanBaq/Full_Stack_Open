describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'root',
      name: 'Test Superuser',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    const user2 = {
      username: 'tan',
      name: 'Test tan',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Blogs')
  })

  it('login form is shown', function () {
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('Login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function () {
      cy.contains('Create New Blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Jonathan')
      cy.get('#url').type('abcbc.fi')
      cy.get('#create-button').click()
      cy.get('#blogs')
        .contains('a blog created by cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.contains('Create New Blog').click()
        cy.get('#title').type('another blog created by cypress (10)')
        cy.get('#author').type('Jonathan')
        cy.get('#url').type('anbcbc.fi')
        cy.get('#create-button').click()
      })

      it('blogs can be liked', function () {
        cy.contains('another blog created by cypress')
          .get('#view-button').click()
          .get('#like-button').click()

        cy.get('#blog')
          .contains('Likes: 1')
      })

      it('other users cannot delete blogs they did not create', function () {
        cy.contains('Logout').click()
        cy.contains('Login').click()
        cy.get('#username').type('tan')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
        cy.get('#view-button').click()
        cy.get('#blog').should('not.have.text', 'delete')
      })

      it('blogs are ordered according to most likes', function () {
        cy.get('#view-button').click()
        for (let n = 0; n < 10; n++) {
          cy.get('#like-button').click()
        }
        cy.contains('Create New Blog').click()
        cy.get('#title').type('yet another blog created by cypress (5)')
        cy.get('#author').type('Jonathan')
        cy.get('#url').type('yanbcbc.fi')
        cy.get('#create-button').click()
        cy.contains('view').click()
        cy.contains('hide').click()
        for (let n = 0; n < 6; n++) {
          cy.contains('like').click()
        }
        cy.get('#blog').contains('another blog created by cypress (10)')
      })
    })
  })
})