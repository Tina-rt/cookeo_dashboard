// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('@/views/public/LandingPage.vue'),
  },
  {
    path: '/admin',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'Home',
        component: () => import('@/views/admin/Home.vue'),
      },
      {
        path: 'commande',
        name: 'Commande',
        component: () => import('@/views/admin/Commande.vue'),
      },
      {
        path: 'plats',
        name: 'Plats',
        component: () => import('@/views/admin/Plat.vue'),
      },
      {
        path: 'categorie',
        name: 'Categorie',
        component: () => import('@/views/admin/Categorie.vue'),
      },
      {
        path: 'client',
        name: 'Client',
        component: () => import('@/views/admin/Client.vue'),
      },
      
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
