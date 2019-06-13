<template>
    <div class="mt-5">
        <form class="form-inline" @submit.prevent="$router.push({ name: 'SearchResultsArtist', params: { inputSearch: inputSearch } }); inputSearch = ''">
            <div class="form-group">
                <label for="inputSearch">Recherchez un artiste : </label>
                <input class="form-control ml-2" type="text" id="inputSearch" v-model.trim="inputSearch" />
            </div>
            <button class="btn btn-primary ml-2">Lycos !</button>
        </form>
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'searchArtist',
        data: function () {
            return {
                inputSearch: ''
            }
        }
    }
</script>