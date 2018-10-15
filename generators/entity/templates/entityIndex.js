let context = require.context("./", true, /routes\.js$/);
let routes = [];
context.keys().forEach(function (key) {
    routes.push(context(key).default);
});

export default routes;