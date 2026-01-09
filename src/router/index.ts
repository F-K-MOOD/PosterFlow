import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Index from '../views/Index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        { path: '', name: 'home', component: Home, meta: { title: '欢迎来到KlickPoster' } },
        { path: 'template', name: 'template', component: () => import('@/components/TemplateList.vue'), meta: { title: '模版详情' } }
      ]
    },
    {
      path: '/editor/:id',
      name: 'editor',
      component: () => import('../views/Editor/Editor.vue'),
      meta: { requiredLogin: true, title: '编辑我的设计' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: { redirectAlreadyLogin: true, title: '登录到KlickPoster', disableLoading: true }
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/exception/404/index.vue'),
    },

    {
      path: '/500',
      name: '500',
      component: () => import('@/views/exception/500/index.vue'),
    },
  ]
})

// 路由守卫
// router.beforeEach(async (to) => {
//   const userStore = useUserStore()
//   const { token, isLogin } = userStore.state
//   const { redirectAlreadyLogin, requiredLogin, title } = to.meta
//   if (title) {
//     document.title = title
//   }
//   if (!isLogin) {
//     if (token) {
//       axios.defaults.headers.common.Authorization = `Bearer ${token}`
//       try {
//         await userStore.fetchCurrentUser()
//         if (redirectAlreadyLogin) {
//           return '/'
//         }
//       } catch {
//         message.error('登陆状态已过期 请重新登陆', 2)
//         userStore.logout()
//         return '/login'
//       }
//     } else {
//       if (requiredLogin) {
//         return '/login'
//       }
//     }
//   } else {
//     if (redirectAlreadyLogin) {
//       return '/'
//     }
//   }
// })

export default router
