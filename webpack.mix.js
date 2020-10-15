const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/site/v2/dist/app.js');
mix
.styles([
    'public/site/v2/css/src/reset.css',
    'public/site/v2/css/src/colors.css',
    'public/site/v2/css/src/layout.css',
    'public/site/v2/css/src/extra.css',
    'public/site/v2/css/src/mobile.css',
], 'public/site/v2/dist/css/mobile.css')
.styles([
    'public/site/v2/css/src/reset.css',
    'public/site/v2/css/src/colors.css',
    'public/site/v2/css/src/layout.css',
    'public/site/v2/css/src/extra.css',
    'public/site/v2/css/src/tablet.css',
], 'public/site/v2/dist/css/tablet.css')
.styles([
    'public/site/v2/css/src/reset.css',
    'public/site/v2/css/src/colors.css',
    'public/site/v2/css/src/layout.css',
    'public/site/v2/css/src/extra.css',
    'public/site/v2/css/src/desktop.css',
], 'public/site/v2/dist/css/desktop.css')
