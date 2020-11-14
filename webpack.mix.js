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

mix.js([
	'resources/js/app.js',
	'public/site/v2/js/ln-triton-track/ln-triton-track.js'

], 'public/site/v2/dist/')
.version();


mix
.styles([
	'public/site/v2/css/src2/reset.css',
	'public/site/v2/css/src2/fonts.css',
	'public/site/v2/css/src2/colors.css',
	'public/site/v2/css/src2/layout.css',
	'public/site/v2/css/src2/mobile.css',
	'public/site/v2/css/src2/tablet.css',
	'public/site/v2/css/src2/desktop.css',
	'public/site/v2/css/src2/bgImages.css',
], 'public/site/v2/dist/css/styles.css')
.version();
