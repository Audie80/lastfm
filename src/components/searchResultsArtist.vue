<template>
    <div class="container mt-5">
        <div class="card-columns">    
            <div class="card px-3 pt-3 m-2 bg-light border-secondary text-center"
            v-for="(searchResult, index) of searchResults" :key="index"
            v-show="searchResult.mbid">
                <img :src="searchResult.image[3]['#text']" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{ searchResult.name }}</h5>
                    <button class="btn btn-primary" @click="$router.push({ name: 'Artist', params: { mbid: searchResult.mbid }})">Plus d'infos</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SearchResultsArtist',
        props: {
            inputSearch: String
        },
        data: function () {
            return {
                searchResults: null
            }
        },
        computed: {
            url: function () {
                return `${rootUrl}?method=artist.search&artist=${this.inputSearch}&api_key=${apiKey}&format=json` //${rootUrl} va chercher directement la variable globale
            }
        },
        methods: {
            search: async function () {
                try {
                    let response = await fetch(this.url)
                    let result = await response.json()
                    this.searchResults = result.results.artistmatches.artist
                } catch(err) {
                    console.log(err)
                }
            }
        },
        created () {
            this.search()
        },
        watch: { //Observe le changement de route : si change de route, réeffectue la recherche
            '$route': function () { //pour les variables qui commencent par $, attention, les mettre entre quote
                this.search()
            }/*,
            searchResults: function () {
                this.$emit('sendResult', this.searchResults)
            }*/
        }
    }
</script>