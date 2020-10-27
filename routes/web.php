<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::group([ 'middleware' => [ 'speaks-tongue' ]], function() {
	Route::get('/', 'GlobalController@home')->name('index');

	Route::get('/terms', 'GlobalController@terms')->name('terms');
	Route::get('/privacy', 'GlobalController@privacy')->name('privacy');
	Route::get('/contact', 'GlobalController@contactUs')->name('contactUs');
	Route::post('/contact/send', 'ContactUs\Controller\ContactUsController@send');
	Route::get('/about-us', 'GlobalController@aboutUs')->name('aboutUs');



	Route::get('/{station}', 'GlobalController@player')->name('player');

});