import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './styles/tailwind.css';
import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(CkeditorPlugin);
app.mount('#app'); 