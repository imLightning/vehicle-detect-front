const mainRouter = [
    {
      path: '/',
      name: 'Manager',
      component: () => import('@/views/ManagerNav.vue'),
      redirect: '/login',
      meta: {
        title: '首页'
      },
      children: [
        { path: 'home', name: 'homePage', component: () => import('@/views/manager/HomePage.vue')},
        { path: 'thank', name: 'thankInfo', component: () => import('@/views/manager/ThankInfo.vue')},
        { path: 'record', name: 'recordAdmin', component: () => import('@/views/manager/RecordAdmin.vue')},
        { path: 'detect', name: 'currentDetect', component: () => import('@/views/manager/CurrentDetect.vue')},
        { path: 'set', name: 'coreSet', component: () => import('@/views/manager/CoreSet.vue')},
        { path: 'file', name: 'fileAdmin', component: () => import('@/views/manager/FileAdmin.vue')},
        { path: 'result', name: 'resultAdmin', component: () => import('@/views/manager/ResultAdmin.vue')},
        { path: 'violate', name: 'violateAdmin', component: () => import('@/views/manager/ViolateAdmin.vue')}
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/AdminLogin')
    }
    
]

export default mainRouter