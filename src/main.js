import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './assets/scss/style.scss' //Il faut donc importer un fichier scss où seront importés les bootstrap
//import 'bootstrap/scss/bootstrap-reboot.scss' //Ne fonctionne pas car les variables scss ne sont pas partagées
//import 'bootstrap/scss/bootstrap-grid.scss'
//import 'bootstrap/scss/_forms.scss'

Vue.config.productionTip = false;

window.apiKey = 'ce293d59001221f0545c8848c71d7ec6' //déclare des variables globales, accessibles dans toute l'application
window.rootUrl = 'http://ws.audioscrobbler.com/2.0/'
window.apiKeyYouTube = 'AIzaSyAnRWx-r6eMDreP82x-29Ld2g-8p0q_nHs'
window.rootUrlYouTube = 'https://www.googleapis.com/youtube/v3'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
