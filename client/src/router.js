import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/member-area',
      name: 'SignInRegister',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "member-area" */ './views/SignInRegister.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "Dashboard" */ './views/Dashboard.vue'),
      meta: {
        authRequired: true
      },
      children: [
        {
          path: '/dashboard/all-questions',
          name: 'DashboardQuestionList',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "AddNewQuestions" */ './components/ListQuestion.vue'),
          meta: {
            authRequired: true
          }
        },
        {
          path: '/dashboard/add-new-questions',
          name: 'AddNewQuestions',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "AddNewQuestions" */ './components/AddQuestions.vue'),
          meta: {
            authRequired: true
          }
        },
        {
          path: '/dashboard/update-questions/:id',
          name: 'UpdateQuestions',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "UpdateQuestions" */ './components/UpdateQuestions.vue'),
          meta: {
            authRequired: true
          }
        },
      ]
    },
    {
      path: '/question/:id/:title',
      name: 'QuestionPage',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "QuestionPage" */ './views/QuestionPage.vue'),
    },
    {
      path: '/questions/:tag',
      name: 'ViewByTag',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "QuestionPage" */ './views/ViewByTag.vue'),
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!localStorage.getItem('token')) {
        next({
          path: '/member-area'
        });
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
