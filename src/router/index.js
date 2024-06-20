import { createRouter, createWebHistory } from 'vue-router';

// Caminho base do projeto.
const base_path = "/";
const PAGE_PATH = "../Pages/";

import HomeView from "../Pages/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  routes: [
    {
      path: base_path,
      name: 'index',
      component: HomeView
    },
    {
      path: base_path + 'company',
      name: 'company',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../Pages/CompanyView.vue")
    },
    {
        path: base_path + 'devices',
        name:'devices',
        component: () => import("../Pages/DevicesView.vue")
    },
    {
      path: base_path + 'events',
      name:'events',
      component: () => import("../Pages/EventsView.vue")
    },
    {
      path: base_path + "account",
      name: 'account',
      component: () => import("../Pages/ConfigView.vue")
    },
    {
      path: base_path + "help",
      name: "help",
      component: () => import("../Pages/ConfigView.vue")
    },
    {
      path: base_path + 'devices/update/:id',
      name: 'device_update',
      component: () => import("../Pages/UpdateView.vue")
    },
    {
      path: base_path + 'landing',
      name: 'landing_page',
      component: () => import("../Pages/LandingView.vue")
    },
    {
      path: base_path + ':pathMatch(.*)*',
      name: 'notfound',
      component: () => import("../Pages/404.vue")
    }
  ]
})

export default router
