const mainRouter = [
    {
      path: '/',
      name: 'Manager',
      component: () => import('@/views/ManagerNav.vue'),
      redirect: '/home',
      meta: {
        title: '首页'
      },
      children: [
        { path: 'home', name: 'homePage', component: () => import('@/views/manager/HomePage.vue')},
        { path: 'thank', name: 'thankInfo', component: () => import('@/views/manager/ThankInfo.vue')},
        { path: 'record', name: 'recordAdmin', component: () => import('@/views/manager/RecordAdmin.vue')},
        { path: 'detect', name: 'currentDetect', component: () => import('@/views/manager/CurrentDetect.vue')},
        { path: 'set', name: 'coreSet', component: () => import('@/views/manager/CoreSet.vue')}
      ]
    }
]

export default mainRouter