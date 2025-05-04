import { createRouter, createWebHistory } from 'vue-router';
import DashboardPage from '../pages/dashboard-page.vue';
import TasksPage from '../pages/tasks-page.vue';
import NotesPage from '../pages/notes-page.vue';
import ListsPage from '../pages/lists-page.vue';
import CategoriesPage from '../pages/categories-page.vue';
import UsersPage from '../pages/users-page.vue';

const routes = [
  { path: '/', name: 'Dashboard', component: DashboardPage },
  { path: '/gorevler', name: 'Tasks', component: TasksPage },
  { path: '/notlar', name: 'Notes', component: NotesPage },
  { path: '/listeler', name: 'Lists', component: ListsPage },
  { path: '/kategoriler', name: 'Categories', component: CategoriesPage },
  { path: '/kullanicilar', name: 'Users', component: UsersPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 