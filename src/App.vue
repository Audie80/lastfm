<template>
  <div id="app">
    <searchArtist @sendResult="setResult" :apiKey="apiKey" :rootUrl="rootUrl" />
    
  </div>
</template>

<script>
import searchArtist from './components/searchArtist.vue'

  export default {
    name: 'App',
    components: {
      searchArtist
    },
    data: function () {
      return {
        apiKey: 'ce293d59001221f0545c8848c71d7ec6',
        sharedSecret: '5508f416960b2426cbf4176a6d14257b',
        rootUrl: 'http://ws.audioscrobbler.com/2.0/',
        searchResults: ''
      }
    },
    methods: {
      setResult: function (result) {
        this.searchResults = result
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
