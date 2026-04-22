<template>
  <div class="container mt-5">
    <div class="card-columns">
      <div
        class="card px-3 pt-3 m-2 bg-light border-secondary text-center"
        v-for="(searchResult, index) of searchResults"
        :key="index"
        v-show="searchResult.mbid"
      >
        <img :src="searchResult.image[3]['#text']" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{{ searchResult.name }}</h5>
          <button
            class="btn btn-primary"
            @click="goToArtist(searchResult.mbid)"
          >Plus d'infos</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const props = defineProps({
  inputSearch: String,
});

const searchResults = ref(null);

const url = computed(() => {
  // Encode artist name for URL (espaces, accents, etc.)
  const encodedArtist = encodeURIComponent(props.inputSearch || '');
  return `${window.rootUrl}?method=artist.search&artist=${encodedArtist}&api_key=${window.apiKey}&format=json`;
});

const search = async () => {
  try {
    const response = await fetch(url.value);
    const result = await response.json();
    searchResults.value = result.results.artistmatches.artist;
  } catch (err) {
    console.log(err);
  }
};

const goToArtist = (mbid) => {
  router.push({ name: 'Artist', params: { mbid } });
};

onMounted(() => {
  search();
});

watch(() => route.path, () => {
  search();
});
</script>
