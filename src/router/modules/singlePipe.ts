const component: AuthRoute.Route = {
  name: 'singlePipe',
  path: '/singlePipe',
  component: 'basic',
  children: [
    {
      name: 'singlePipe_singleColumn',
      path: '/singlePipe/singleColumn',
      component: 'self',
      meta: {
        title: '单列表',
        requiresAuth: true
      }
    }
  ],
  meta: {
    title: '单管',
    order: 3
  }
};

export default component;
