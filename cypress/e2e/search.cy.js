describe('Artist Search Page', () => {
  beforeEach(() => {
    cy.mockArtistSearch('Beatles');
    cy.visit('/');
  });

  it('should load the search form', () => {
    cy.get('form').should('be.visible');
    cy.get('label').should('contain', 'Recherchez un artiste');
    cy.get('input[id="inputSearch"]').should('be.visible');
    cy.get('button').should('contain', 'Lycos !');
  });

  it('should search for artists and display results', () => {
    cy.get('input[id="inputSearch"]').type('Beatles');
    cy.get('button').click();
    cy.wait('@artistSearch');
    cy.contains('h5', 'Beatles').should('be.visible');
    cy.contains('button', 'Plus d\'infos').should('be.visible');
  });

  it('should display multiple artist results', () => {
    cy.get('input[id="inputSearch"]').type('Beatles');
    cy.get('button').click();
    cy.wait('@artistSearch');
    cy.get('.card-title').should('have.length.greaterThan', 0);
  });

  it('should clear the input after search', () => {
    cy.get('input[id="inputSearch"]').type('Beatles');
    cy.get('button').click();
    cy.wait('@artistSearch');
    cy.get('input[id="inputSearch"]').should('have.value', '');
  });
});
