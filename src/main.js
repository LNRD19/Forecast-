import './assets/main.css';

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Forecast from './components/Forecast.vue';
import Sidebar from './components/Sidebar.vue';

// Define your routes. We add a dedicated route for Forecast.
const routes = [
  { path: '/', component: Forecast },       // You can keep this as the default route.
  { path: '/forecast', component: Forecast }  // This route is used by the Forecast link.
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Create the app, register Sidebar globally, add the router, and mount.
createApp(App)
  .component('Sidebar', Sidebar)
  .use(router)
  .mount('#app');
