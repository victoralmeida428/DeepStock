require('babel-register');
 
const AppRouter = require('./App').default;
const Sitemap = require('../').default;
 
(
    new Sitemap(AppRouter)
        .build('http://my-site.ru')
        .save('./sitemap.xml')
);