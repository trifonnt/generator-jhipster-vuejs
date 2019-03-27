var context = require.context(".", false, /\.vue$/);
let views = {};
context.keys().forEach(function (key) {
    views[key.match(/[a-zA-Z0-9]+\./)[0].slice(0,-1)] = context(key).default;
});

export default [
	{
      path: '/entities/userx/table/:masterId?',
      name: 'Userx',
      component: views.Userx,
    },
    {
      path: '/entities/userx/new/:masterId?',
      name: 'newUserx',
      component: views.CreateUserx,
    },
    {
      path: '/entities/userx/prefilled',
      name: 'newUserx',
      component: views.CreatePrefilledUserx,
    },
    {
      path: '/entities/userx/edit/:id/:masterId?/:hideName?',
      name: 'editUserx',
      component: views.UpdateUserx,
    },    
    {
      path: '/entities/userx/view/:id',
      name: 'viewUserx',
      component: views.ViewUserx,
    },
]