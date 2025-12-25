import { createRouter, createWebHistory } from 'vue-router'

import Editor from '@/views/Editor.vue'
import Home from '@/views/Home.vue'
import TemplateDetail from '@/views/TemplateDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          meta: {
            withHeader: true
          }
        },
        {
          path: '/template/:id',
          name: 'template',
          component: TemplateDetail,
          meta: {
            withHeader: true
          }
        }
      ]
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor,
    },
    
  ]
})

export default router
