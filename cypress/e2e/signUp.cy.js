describe('empty data and click submit', () => {
  it('passes', () => {
    cy.visit('https://demo.realworld.io/#/register');
    cy.get('.btn-primary').click();
    cy.get('.ng-binding.ng-scope').contains("email can't be blank");

  })
});

describe('email already been taken', () => {
  const userName = 'userName Testing';
  const msg = 'email has already been taken';
  it('show error message', () =>{
    cy.visit('https://demo.realworld.io/#/register');
    cy.get('input[type=text]').type(userName);
    cy.get('input[type=email]').type('email_signup@yopmail.com');
    cy.get('input[type=password]').type('123456');
    cy.get('.btn-primary').click();
    cy.get('.ng-binding.ng-scope').contains(msg);
  })
});

describe('Sign Up with valid data', () => {
  const userName = 'userName Testing success +7';
  const email = 'sign+up_email7@yopmail.com'
  it('success', () =>{
    cy.visit('https://demo.realworld.io/#/register');
    cy.get('input[type=text]').type(userName);
    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').type('123456');
    cy.get('.btn-primary').click();
    cy.get('li:nth-child(4) a').contains(userName);
  })
})