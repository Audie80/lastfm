describe('Artist Page', () => {
  const ARTIST_MBID = 'b10bbbfc-cf9e-42e0-be17-e2c3e1d2600d';

  beforeEach(() => {
    cy.mockArtistInfo(ARTIST_MBID);
    cy.mockTopAlbums(ARTIST_MBID);
    cy.visit(`/artist/${ARTIST_MBID}`);
  });

  it('should load the artist page with info', () => {
    cy.wait(['@artistInfo', '@topAlbums']);
    cy.contains('h1', 'Beatles').should('be.visible');
  });

  it('should display artist biography', () => {
    cy.wait(['@artistInfo', '@topAlbums']);
    cy.get('.text-justify').should('be.visible');
    cy.get('.text-justify').should('contain', 'Beatles were an English rock band');
  });

  it('should display top albums with images', () => {
    cy.wait(['@artistInfo', '@topAlbums']);
    cy.get('.card-columns .card').should('have.length.greaterThan', 0);
    cy.get('.card-img-top').should('be.visible');
    cy.contains('h5', 'Abbey Road').should('be.visible');
    cy.contains('h5', 'Let It Be').should('be.visible');
  });

  it('should have back button to return to search', () => {
    cy.wait(['@artistInfo', '@topAlbums']);
    cy.contains('button', 'Retour à la recherche').should('be.visible');
  });

  it('should navigate back to search page when clicking back button', () => {
    cy.wait(['@artistInfo', '@topAlbums']);
    cy.contains('button', 'Retour à la recherche').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('should have dark background theme', () => {
    cy.wait(['@artistInfo', '@topAlbums']);
    cy.get('.bg-dark').should('be.visible');
  });

  it('should display album cards with proper structure', () => {
    cy.wait(['@artistInfo', '@topAlbums']);
    cy.get('.card').each(($card) => {
      cy.wrap($card).find('.card-img-top').should('be.visible');
      cy.wrap($card).find('.card-title').should('be.visible');
      cy.wrap($card).contains('button', 'Plus d\'infos').should('be.visible');
    });
  });
});
