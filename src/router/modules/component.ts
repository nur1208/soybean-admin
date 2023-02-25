const component: AuthRoute.Route = {
  name: 'component',
  path: '/component',
  component: 'basic',
  children: [
    {
      name: 'component_table',
      path: '/component/table',
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
