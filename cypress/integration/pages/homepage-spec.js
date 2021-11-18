describe('Test Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the hero title', () => {
    cy.contains('Find, Share and Publish Quality Data with Datahub');
  });

  it('checks that a search form exists', () => {
    cy.get('form').contains('Search');
  });

  it('shows the recent datasets', () => {
    cy.contains('Recent Datasets');
  });

  it('returns the expected number of recent datasets', () => {
    cy.get('.recent')
      .find('div')
      .should(($div) => {
        expect($div).to.have.length.of.at.least(2);
      });
  });
});
