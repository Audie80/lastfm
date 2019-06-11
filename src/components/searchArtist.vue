<template>
    <div>
        <form @submit.prevent=search>
            <label for="inputSearch">Recherchez un artiste :</label>
            <br />
            <button>Lycos !</button>
            <input type="text" id="inputSearch" v-model.trim="artistName" />
        </form>
        <!-- <ul>
            <li
            v-for="(searchResult, index) of searchResults" :key="index">{{ searchResult.name }}
            </li>
        </ul>
        <div>{{ searchResults.results.artistmatches.artist }}</div> -->
    </div>
</template>

<script>
    export default {
        name: 'searchArtist',
        data: function () {
            return {
                artistName: '',
                searchResults: null
            }
        },
        props: {
            apiKey: String,
            rootUrl: String
        },
        computed: {
            url: function () {
                return `${this.rootUrl}?method=artist.search&artist=${this.artistName}&api_key=${this.apiKey}&format=json`
            }
        },
        watch: {
            searchResults: function () {
                this.$emit('sendResult', this.searchResults)
            }
        },
        methods: {
            search: async function () {
                try {
                    let response = await fetch(this.url)
                    let result = await response.json()
                    this.searchResults = result.results.artistmatches.artist
                    this.artistName = ''
                } catch(err) {
                    console.log(err)
                }
            }
        }
    }
</script>