// Cypress support file for E2E tests
// This file is run before each test file

// Helper to setup API mocks
Cypress.Commands.add('mockArtistSearch', (query = 'Beatles') => {
  cy.intercept(
    'GET',
    new RegExp(`method=artist\\.search&artist=${query}.*`),
    { fixture: 'artistSearch.json' }
  ).as('artistSearch');
});

Cypress.Commands.add('mockArtistInfo', (mbid = 'b10bbbfc-cf9e-42e0-be17-e2c3e1d2600d') => {
  cy.intercept(
    'GET',
    `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&mbid=${mbid}&api_key=*&format=json*`,
    { fixture: 'artistInfo.json' }
  ).as('artistInfo');
});

Cypress.Commands.add('mockTopAlbums', (mbid = 'b10bbbfc-cf9e-42e0-be17-e2c3e1d2600d') => {
  cy.intercept(
    'GET',
    `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid=${mbid}&api_key=*&format=json*`,
    { fixture: 'topAlbums.json' }
  ).as('topAlbums');
});

Cypress.Commands.add('mockAlbumInfo', (mbid = 'a4a121e1-39b2-4d80-b61a-f6f6e2d00c2d') => {
  cy.intercept(
    'GET',
    `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=*&mbid=${mbid}&format=json*`,
    { fixture: 'albumInfo.json' }
  ).as('albumInfo');
});

Cypress.Commands.add('mockYoutubeSearch', () => {
  cy.intercept(
    'GET',
    'https://www.googleapis.com/youtube/v3/search?*',
    { fixture: 'youtubeSearch.json' }
  ).as('youtubeSearch');
});
