import { createApp } from 'vue'
import App from './App.vue'
import './assets/global.css'
import gAuthPlugin from 'vue3-google-oauth2';

const gauthClientId = process.env.VUE_APP_GOOGLE_AUTH_CLIENT_ID;
const app = createApp(App);
app.use(gAuthPlugin, {
    clientId: gauthClientId,
    scope: 'email',
    prompt: 'consent'
})
app.mount('#app')
