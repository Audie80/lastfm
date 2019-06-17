<template>
    <div class="pt-5 bg-dark">
        <form class="form-inline justify-content-center" @submit.prevent="$router.push({ name: 'SearchResultsArtist', params: { inputSearch: inputSearch } }); inputSearch = ''">
            <div class="form-group">
                <label class="text-light" for="inputSearch">Recherchez un artiste : </label>
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