<template>
  <div class="container mt-2">
    <div class="row justify-content-center">
      <h2 class="text-light text-center">{{ searchAlbumResults?.name }}</h2>
    </div>
    <div class="row justify-content-center" v-if="!searchVideoYouTube">
      <img :src="searchAlbumResults?.image?.[3]?.['#text']" alt="...">
    </div>
    <div class="row justify-content-center" v-else>
      <iframe 
        width="560" 
        height="315" 
        :src="`https://www.youtube.com/embed/${searchVideoYouTube}?autoplay=1`" 
        frameborder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
      ></iframe>
    </div>
    <div class="row justify-content-center mt-2">
      <ul class="list-group">
        <li 
          class="list-group-item m-1 p-0 pe-3"
          v-for="(track, index) of tabTracks" 
          :key="index"
        >
          <button 
            class="btn" 
            @click="playVideo(track.name)"
          >
            <img class="play-icon" src="../assets/play_icon.png">
          </button>
          {{ track.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  mbidAlbum: String,
  artistName: String
});

const searchAlbumResults = ref(null);
const searchVideoYouTube = ref(null);
const trackName = ref(null);

const urlAlbum = computed(() => {
  return `${window.rootUrl}?method=album.getinfo&api_key=${window.apiKey}&mbid=${props.mbidAlbum}&format=json&lang=fr`;
});

const tabTracks = computed(() => {
  return searchAlbumResults.value?.tracks?.track || [];
});

const urlVideoYouTube = computed(() => {
  return `${window.rootUrlYouTube}/search?part=snippet&maxResults=5&order=relevance&q=${props.artistName}+${trackName.value}&relevanceLanguage=fr&type=video&videoDefinition=any&videoEmbeddable=true&videoSyndicated=true&videoType=any&key=${window.apiKeyYouTube}`;
});

const getInfosAlbum = async () => {
  try {
    const response = await fetch(urlAlbum.value);
    const result = await response.json();
    searchAlbumResults.value = result.album;
  } catch (err) {
    console.log(err);
  }
};

const videoYouTube = async () => {
  try {
    const response = await fetch(urlVideoYouTube.value);
    const result = await response.json();
    searchVideoYouTube.value = result.items[0].id.videoId;
  } catch (err) {
    console.log(err);
  }
};

const playVideo = (name) => {
  trackName.value = name;
  videoYouTube();
};

onMounted(() => {
  getInfosAlbum();
});
</script>

<style>
.play-icon {
  width: 3rem;
}
</style>