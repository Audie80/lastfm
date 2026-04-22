import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/scss/style.scss';

// Variables globales
window.apiKey = 'ce293d59001221f0545c8848c71d7ec6';
window.rootUrl = 'http://ws.audioscrobbler.com/2.0/';
window.apiKeyYouTube = 'Insert your YouTube API Key here';
window.rootUrlYouTube = 'https://www.googleapis.com/youtube/v3';

const app = createApp(App);

app.use(router);
app.mount('#app');
