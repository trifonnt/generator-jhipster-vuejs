

var context = require.context(".", false, /\.vue$/);
let views = {};
context.keys().forEach(function (key) {
    views[key.match(/[a-zA-Z0-9]+\./)[0].slice(0,-1)] = context(key).default;
});

export default [
	{
      path: '/admin/userx',
      name: 'User1',
      component: views.User,
    },
    {
      path: '/admin/userx/new',
      name: 'newUser1',
      component: views.CreateUser,
    },
    {
      path: '/admin/userx/edit/:id',
      name: 'editUser1',
      component: views.UpdateUser,
    },    
    {
      path: '/admin/userx/view/:id',
      name: 'viewUser1',
      component: views.ViewUser,
    },
]