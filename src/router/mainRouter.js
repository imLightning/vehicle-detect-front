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
        { path: 'home', name: 'homePage', meta: { title: '主页' }, component: () => import('@/views/manager/HomePage.vue')},
        { path: 'thank', name: 'ThankInfo', meta: { title: '致谢' }, component: () => import('@/views/manager/ThankInfo.vue')},
        { path: 'detect', name: 'VehicleDetect', meta: { title: '致谢' }, component: () => import('@/views/manager/VehicleDetect.vue')}
      ]
    }
]

export default mainRouter