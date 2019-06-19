<template>
    <div class="container mt-2"
    v-if="searchAlbumResults">
        <div class="row justify-content-center">
            <h2 class="text-light text-center">{{ searchAlbumResults.name }}</h2>
        </div>
        <div class="row justify-content-center"
         v-if="!searchVideoYouTube" >
            <img :src="searchAlbumResults.image[3]['#text']" alt="...">
        </div>
        <div class="row justify-content-center"
         v-else >
            <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${searchVideoYouTube}?autoplay=1`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="row justify-content-center mt-2">
            <ul class="list-group">
                <li class="list-group-item m-1 p-0 pr-3"
                 v-for="(track, index) of tabTracks" :key="index" >
                    <button class="btn" @click="trackName = track.name; videoYouTube();" ><font-awesome-icon icon="play-circle" size="3x" /></button>
                    {{ track.name }} - {{ track.duration }} s
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Album',
        props: {
            mbidAlbum: String,
            artistName: String,
            nameAlbum: String
        },
        data: function () {
            return {
                searchAlbumResults: null,
                searchVideoYouTube: null,
                trackName: null
            }
        },
        computed: {
            urlAlbum: function () {
                return `${rootUrl}?method=album.getinfo&api_key=${apiKey}&mbid=${this.mbidAlbum}&format=json&lang=fr`
            },
            tabTracks: function () {
                return this.searchAlbumResults.tracks.track
            },
            urlVideoYouTube: function () {
                return `${rootUrlYouTube}/search?part=snippet&maxResults=5&order=relevance&q=${this.artistName}+${this.trackName}&relevanceLanguage=fr&type=video&videoDefinition=any&videoEmbeddable=true&videoSyndicated=true&videoType=any&key=${apiKeyYouTube}`
            }
        },
        created () {
            this.getInfosAlbum()
        },
        methods: {
            getInfosAlbum: async function () {
                try {
                    let response = await fetch(this.urlAlbum)
                    let result = await response.json()
                    this.searchAlbumResults = result.album
                } catch(err) {
                    console.log(err)
                }
            },
            videoYouTube: async function () {
                try {
                    let response = await fetch(this.urlVideoYouTube)
                    let result = await response.json()
                    this.searchVideoYouTube = result.items[0].id.videoId
                } catch(err) {
                    console.log(err)
                }
            }
        }
    }
</script>

<style>
    .play-icon {
        width: 3rem;
    }
</style>