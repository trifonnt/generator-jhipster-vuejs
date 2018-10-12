var context = require.context(".", false, /\.js$/);
let lang = {};
context.keys().forEach(function (key) {
    lang[key.match(/[a-zA-Z0-9]+\./)[0].slice(0,-1)] = context(key).default;
});
export default lang;