<template>
    <div>
        <form class="form-inline justify-content-center pt-5" @submit.prevent="$router.push({ name: 'SearchResultsArtist', params: { inputSearch: inputSearch } }); inputSearch = ''">
            <div class="form-group">
                <label class="text-light" for="inputSearch">Recherchez un artiste : </label>
                <input class="form-control ml-2" type="text" id="inputSearch" v-model.trim="inputSearch" />
            </div>
            <button class="btn btn-primary ml-2">Lycos !</button>
        </form>
        <div
        v-if="$route.name=='SearchResultsArtist'">
            <router-view />
        </div>
        <div
        v-else>
            <shuffleSearch />
        </div>
    </div>
</template>

<script>
    import shuffleSearch from './shuffleSearch.vue'

    export default {
        name: 'searchArtist',
        components: {
            shuffleSearch
        },
        data: function () {
            return {
                inputSearch: ''
            }
        }
    }
</script>