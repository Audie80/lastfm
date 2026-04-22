<template>
  <div class="bg-dark p-4">
    <button
      class="btn btn-primary mb-4"
      @click="goHome"
    >Retour à la recherche</button>
    <div class="row mx-auto">
      <h1 class="text-light px-4">{{ infosArtistResults?.name }}</h1>
      <div class="text-justify text-light px-4" v-html="infosArtistResults?.bio?.summary"></div>
    </div>
    <div class="card-columns mt-4" v-if="route.name === 'Artist'">
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
            @click="goToAlbum(topAlbumsResult.mbid)"
          >Plus d'infos</button>
        </div>
      </div>
    </div>

    <div v-else-if="route.name === 'Album'">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const props = defineProps({
  mbid: String,
});

const infosArtistResults = ref(null);
const topAlbumsResults = ref(null);

const urlArtist = computed(() => {
  return `${window.rootUrl}?method=artist.getinfo&mbid=${props.mbid}&api_key=${window.apiKey}&format=json&lang=fr`;
});

const urlTopAlbums = computed(() => {
  return `${window.rootUrl}?method=artist.gettopalbums&mbid=${props.mbid}&api_key=${window.apiKey}&format=json&lang=fr`;
});

const getInfosArtist = async () => {
  try {
    const response = await fetch(urlArtist.value);
    const result = await response.json();
    infosArtistResults.value = result.artist;
  } catch (err) {
    console.log(err);
  }
};

const getTopAlbums = async () => {
  try {
    const response = await fetch(urlTopAlbums.value);
    const result = await response.json();
    topAlbumsResults.value = result.topalbums.album;
  } catch (err) {
    console.log(err);
  }
};

const goHome = () => {
  router.push({ name: 'Accueil' });
};

const goToAlbum = (mbid) => {
  router.push({
    name: 'Album',
    params: { mbidAlbum: mbid, artistName: infosArtistResults.value?.name }
  });
};

onMounted(() => {
  getInfosArtist();
  getTopAlbums();
});
</script>
