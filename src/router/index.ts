import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import AI from '../AI.vue'
import Chat from '../Chat.vue'
import Analytics from '../Analytics.vue'
import WebPush from '../WebPush.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/ai',
    name: 'AI',
    component: AI
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: Analytics
  },
  {
    path: '/webpush',
    name: 'webpush',
    component: WebPush
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
