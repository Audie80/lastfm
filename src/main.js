import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './assets/scss/style.scss' //Il faut donc importer un fichier scss où seront importés les bootstrap
//import 'bootstrap/scss/bootstrap-reboot.scss' //Ne fonctionne pas car les variables scss ne sont pas partagées
//import 'bootstrap/scss/bootstrap-grid.scss'
//import 'bootstrap/scss/_forms.scss'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPlayCircle);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

window.apiKey = 'Insert your LastFM API Key here' //déclare des variables globales, accessibles dans toute l'application
window.rootUrl = 'http://ws.audioscrobbler.com/2.0/'
window.apiKeyYouTube = 'Insert your YouTube API Key here'
window.rootUrlYouTube = 'https://www.googleapis.com/youtube/v3'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
