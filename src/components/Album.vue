<template>
    <div class="container mt-2">
        <div class="row justify-content-center">
            <h2 class="text-light text-center">{{ searchAlbumResults.name }}</h2>
        </div>
        <div class="row justify-content-center">
            <img :src="searchAlbumResults.image[3]['#text']" alt="...">
        </div>
        <div class="row justify-content-center mt-2">
            <ul>
                <li
                 v-for="(track, index) of tabTracks" :key="index">
                    {{ track.name }}
                    <audio :src="track.url"></audio>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Album',
        props: {
            mbidAlbum: String
        },
        data: function () {
            return {
                searchAlbumResults: null
            }
        },
        computed: {
            urlAlbum: function () {
                return `${rootUrl}?method=album.getinfo&api_key=${apiKey}&mbid=${this.mbidAlbum}&format=json&lang=fr`
            },
            tabTracks: function () {
                return this.searchAlbumResults.tracks.track
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
            }
        }
    }
</script>