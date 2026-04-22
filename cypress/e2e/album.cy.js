describe('Album Page', () => {
  const ARTIST_MBID = 'b10bbbfc-cf9e-42e0-be17-e2c3e1d2600d';
  const ALBUM_MBID = 'a4a121e1-39b2-4d80-b61a-f6f6e2d00c2d';

  beforeEach(() => {
    cy.mockArtistInfo(ARTIST_MBID);
    cy.mockTopAlbums(ARTIST_MBID);
    cy.mockAlbumInfo(ALBUM_MBID);
    cy.mockYoutubeSearch();
    
    // Navigate to the artist page first
    cy.visit(`/artist/${ARTIST_MBID}`);
    cy.wait(['@artistInfo', '@topAlbums']);
    
    // Click on first album
    // cy.contains('h5', 'Abbey Road').parent().find('button').click();
    // cy.url().should('include', '/album');
  });

  // it('should load album page with album info', () => {
  //   cy.wait('@albumInfo');
  //   cy.contains('h2', 'Abbey Road').should('be.visible');
  // });

  // it('should display album image initially', () => {
  //   cy.wait('@albumInfo');
  //   cy.get('.row').find('img').should('have.attr', 'src');
  // });

  // it('should display track list', () => {
  //   cy.wait('@albumInfo');
  //   cy.get('.list-group').should('be.visible');
  //   cy.contains('Come Together').should('be.visible');
  //   cy.contains('Something').should('be.visible');
  //   cy.contains('Maxwell\'s Silver Hammer').should('be.visible');
  // });

  // it('should have play buttons for each track', () => {
  //   cy.wait('@albumInfo');
  //   cy.get('.list-group-item').each(($item) => {
  //     cy.wrap($item).find('button.btn').should('be.visible');
  //     cy.wrap($item).find('.play-icon').should('be.visible');
  //   });
  // });

  // it('should display correct number of tracks', () => {
  //   cy.wait('@albumInfo');
  //   cy.get('.list-group-item').should('have.length', 3);
  // });

  // it('should search YouTube video when clicking play button', () => {
  //   cy.wait('@albumInfo');
  //   cy.get('.list-group-item').first().find('button').click();
    
  //   cy.wait('@youtubeSearch');
  //   // Check that iframe is visible (indicates video loaded)
  //   cy.get('iframe').should('be.visible');
  //   cy.get('iframe').should('have.attr', 'src');
  // });

  // it('should display YouTube iframe with autoplay parameter', () => {
  //   cy.wait('@albumInfo');
  //   cy.get('.list-group-item').first().find('button').click();
    
  //   cy.wait('@youtubeSearch');
  //   cy.get('iframe').should('have.attr', 'src').and('include', 'autoplay=1');
  // });

  // it('should switch from image to video when track is played', () => {
  //   cy.wait('@albumInfo');
    
  //   // Initially shows image
  //   cy.get('.row').find('img').should('be.visible');
  //   cy.get('iframe').should('not.exist');
    
  //   // Play a track
  //   cy.get('.list-group-item').first().find('button').click();
  //   cy.wait('@youtubeSearch');
    
  //   // Now shows iframe
  //   cy.get('iframe').should('be.visible');
  // });
});
