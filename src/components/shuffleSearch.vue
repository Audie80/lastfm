<template>
    <div class="container mt-5">
        <div class="card-columns">    
            <div class="card px-3 pt-3 m-2 bg-light border-secondary text-center"
            v-for="(searchTopArtist, index) of searchTopArtists" :key="index"
            v-show="searchTopArtist.mbid">
                <img :src="searchTopArtist.image[3]['#text']" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{ searchTopArtist.name }}</h5>
                    <button class="btn btn-primary" @click="$router.push({ name: 'Artist', params: { mbid: searchTopArtist.mbid }})">Plus d'infos</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'shuffleSearch',
        data: function () {
            return {
                searchTopArtists: null
            }
        },
        computed: {
            url: function () {
                return `${rootUrl}?method=chart.gettopartists&api_key=${apiKey}&format=json` //${rootUrl} va chercher directement la variable globale
            }
        },
        methods: {
            search: async function () {
                try {
                    let response = await fetch(this.url)
                    let result = await response.json()
                    this.searchTopArtists = result.artists.artist
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