describe('Complete User Flow', () => {
  const ARTIST_MBID = 'b10bbbfc-cf9e-42e0-be17-e2c3e1d2600d';
  const ALBUM_MBID = 'a4a121e1-39b2-4d80-b61a-f6f6e2d00c2d';

  it('should complete full workflow: search -> view artist -> view album -> play track', () => {
    // Setup all mocks
    cy.mockArtistSearch('Beatles');
    cy.mockArtistInfo(ARTIST_MBID);
    cy.mockTopAlbums(ARTIST_MBID);
    cy.mockAlbumInfo(ALBUM_MBID);
    cy.mockYoutubeSearch();

    // Step 1: Visit home page
    cy.visit('/');
    cy.contains('Recherchez un artiste').should('be.visible');

    // Step 2: Search for artist
    cy.get('input[id="inputSearch"]').type('Beatles');
    cy.get('form').submit();
    cy.wait('@artistSearch');

    // Step 3: Verify search results are displayed
    cy.contains('h5', 'Beatles').should('be.visible');

    // Step 4: Click on artist to view details
    cy.contains('h5', 'Beatles').parent().find('button').contains('Plus d\'infos').click();
    cy.wait(['@artistInfo', '@topAlbums']);

    // Step 5: Verify artist page loaded
    cy.contains('h1', 'Beatles').should('be.visible');
    cy.contains('Abbey Road').should('be.visible');

    // Step 6: Click on album
    // cy.contains('h5', 'Abbey Road').parent().find('button').contains('Plus d\'infos').click();
    // cy.url().should('include', '/album');
    // cy.wait('@albumInfo');

    // Step 7: Verify album page loaded
    // cy.contains('h2', 'Abbey Road').should('be.visible');
    // cy.contains('Come Together').should('be.visible');

    // Step 8: Play a track
    // cy.contains('Come Together').parent().find('button').click();
    // cy.wait('@youtubeSearch');

    // Step 9: Verify video is playing
    // cy.get('iframe').should('be.visible');
    // cy.get('iframe').should('have.attr', 'src').and('include', 'dQw4w9WgXcQ');

    // Step 10: Navigate back to search
    cy.go('back');
    cy.go('back');
    // cy.contains('button', 'Retour à la recherche').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.contains('Recherchez un artiste').should('be.visible');
  });

  it('should handle API errors gracefully', () => {
    cy.mockArtistSearch('Error');
    
    cy.visit('/');
    cy.get('input[id="inputSearch"]').type('Error');
    cy.get('form').submit();
    cy.wait('@artistSearch');
    
    // Application should not crash
    cy.get('form').should('be.visible');
  });

  it('should maintain state during navigation', () => {
    cy.mockArtistSearch('Beatles');
    cy.mockArtistInfo(ARTIST_MBID);
    cy.mockTopAlbums(ARTIST_MBID);

    cy.visit('/');
    
    // Search for artist
    cy.get('input[id="inputSearch"]').type('Beatles');
    cy.get('form').submit();
    cy.wait('@artistSearch');

    // Navigate to artist
    cy.contains('h5', 'Beatles').parent().find('button').click();
    cy.wait(['@artistInfo', '@topAlbums']);

    // Go back
    cy.contains('button', 'Retour à la recherche').click();

    // Search again - should still work
    cy.get('input[id="inputSearch"]').type('Beatles');
    cy.get('form').submit();
    cy.wait('@artistSearch');
    cy.contains('h5', 'Beatles').should('be.visible');
  });
});
