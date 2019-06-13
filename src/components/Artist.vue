<template>
    <div>
        <button class="btn btn-primary my-3" @click="$router.push({ name: 'Accueil' })">Retour à la recherche</button>
                
        <h1>{{ infosArtistResults.name }}</h1>

        <div class="text-justify"
        v-html="infosArtistResults.bio.summary"></div>
        <div class="card-columns"
        v-if="['Artist'].includes($route.name)">    
            <div class="card p-3 m-2 bg-light border-dark text-center"
            v-for="(topAlbumsResult, index) of topAlbumsResults" :key="index">
                <img :src="topAlbumsResult.image[3]['#text']" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{ topAlbumsResult.name }}</h5>
                    <a :href="topAlbumsResult.url">Page Album LastFM</a>
                    <button class="btn btn-primary" @click="$router.push({ name: 'Album', params: { nameAlbum: topAlbumsResult.name }})">Plus d'infos</button>
                </div>
            </div>
        </div>

        <div
        v-else-if="['Album'].includes($route.name)">
            <Album />
        </div>
    </div>
</template>

<script>
    import Album from './Album.vue'

    export default {
        name: 'Artist',
        components: {
            Album
        },
        data: function () {
            return {
                infosArtistResults: null,
                topAlbumsResults: null
            }
        },
        props: {
            mbid: String
        },
        computed: {
            urlArtist: function () {
                return `${rootUrl}?method=artist.getinfo&mbid=${this.mbid}&api_key=${apiKey}&format=json&lang=fr`
            },
            urlTopAlbums: function () {
                return `${rootUrl}?method=artist.gettopalbums&mbid=${this.mbid}&api_key=${apiKey}&format=json&lang=fr`
            }
        },
        created () {
            this.getInfosArtist()
            this.getTopAlbums()
        },
        methods: {
            getInfosArtist: async function () {
                try {
                    let response = await fetch(this.urlArtist)
                    let result = await response.json()
                    this.infosArtistResults = result.artist
                } catch(err) {
                    console.log(err)
                }
            },
            getTopAlbums: async function () {
                try {
                    let response = await fetch(this.urlTopAlbums)
                    let result = await response.json()
                    this.topAlbumsResults = result.topalbums.album
                } catch(err) {
                    console.log(err)
                }
            }
        }
    }
</script>