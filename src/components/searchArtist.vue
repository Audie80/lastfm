<template>
  <div class="pt-5 bg-dark">
    <form
      class="form-inline justify-content-center"
      @submit.prevent="handleSearch"
    >
      <div class="form-group">
        <label class="text-light" for="inputSearch">Recherchez un artiste :</label>
        <input class="form-control ms-2" type="text" id="inputSearch" v-model.trim="inputSearch" />
      </div>
      <button class="btn btn-primary ms-2">Lycos !</button>
    </form>
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const inputSearch = ref('');

const handleSearch = () => {
  router.push({
    name: 'SearchResultsArtist',
    params: { inputSearch: inputSearch.value }
  });
  inputSearch.value = '';
};
</script>
