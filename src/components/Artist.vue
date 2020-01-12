<template>
  <div class="bg-dark p-4">
    <button
      class="btn btn-primary mb-4"
      @click="$router.push({ name: 'Accueil' })"
    >Retour à la recherche</button>
    <div class="row mx-auto">
      <h1 class="text-light px-4">{{ infosArtistResults.name }}</h1>
      <div class="text-justify text-light px-4" v-html="infosArtistResults.bio.summary"></div>
    </div>
    <div class="card-columns mt-4" v-if="$route.name=='Artist'">
      <div
        class="card px-3 pt-3 bg-light border-secondary text-center shadow-sm rounded"
        v-for="(topAlbumsResult, index) of topAlbumsResults"
        :key="index"
        v-show="topAlbumsResult.mbid"
      >
        <img :src="topAlbumsResult.image[3]['#text']" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{{ topAlbumsResult.name }}</h5>
          <button
            class="btn btn-primary"
            @click="$router.push({
                name: 'Album',
                params: { mbidAlbum: topAlbumsResult.mbid, artistName: infosArtistResults.name }})"
          >Plus d'infos</button>
        </div>
      </div>
    </div>

    <div v-else-if="$route.name=='Album'">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Artist',
  data() {
    return {
      infosArtistResults: null,
      topAlbumsResults: null,
    };
  },
  props: {
    mbid: String,
  },
  computed: {
    urlArtist() {
      return `${rootUrl}?method=artist.getinfo&mbid=${this.mbid}&api_key=${apiKey}&format=json&lang=fr`;
    },
    urlTopAlbums() {
      return `${rootUrl}?method=artist.gettopalbums&mbid=${this.mbid}&api_key=${apiKey}&format=json&lang=fr`;
    },
  },
  created() {
    this.getInfosArtist();
    this.getTopAlbums();
  },
  methods: {
    async getInfosArtist() {
      try {
        const response = await fetch(this.urlArtist);
        const result = await response.json();
        this.infosArtistResults = result.artist;
      } catch (err) {
        console.log(err);
      }
    },
    async getTopAlbums() {
      try {
        const response = await fetch(this.urlTopAlbums);
        const result = await response.json();
        this.topAlbumsResults = result.topalbums.album;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
