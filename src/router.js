import Vue from 'vue';
import Router from 'vue-router';
import SearchArtist from './components/searchArtist.vue'
import SearchResultsArtist from './components/searchResultsArtist.vue'
import Artist from './components/Artist.vue'
import Album from './components/Album.vue'


Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'Accueil',
      path: '/',
      component: SearchArtist,
      children: [
        {
          name: 'SearchResultsArtist',
          path: ':inputSearch',
          props: true,
          component: SearchResultsArtist
        }
      ]
    },
    {
      name: 'Artist',
      path: '/artist/:mbid',
      props: true,
      component: Artist,
      children: [
        {
          name: 'Album',
          path: ':nameAlbum',
          props: true,
          component: Album
        }
      ]
    }
  ]
});
