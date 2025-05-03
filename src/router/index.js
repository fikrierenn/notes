import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/home-page.vue';
import NotesPage from '../pages/notes-page.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/notlar', name: 'Notes', component: NotesPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 