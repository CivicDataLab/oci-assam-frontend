describe('Test datasets Page', () => {
  beforeEach(() => {
    cy.visit('/datasets');
  });

  it('has a search form', () => {
    cy.contains('form');
    cy.contains('Search');
  });
});
