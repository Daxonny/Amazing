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
	Route::get('/', 'Home\Controller\HomeController@index')->name('index');

	Route::get('/terms', 'TAC\Controller\TACController@index')->name('terms');
	Route::get('/privacy', 'PrivacyPolicy\Controller\PrivacyController@index')->name('privacy');
	Route::get('/contact', 'ContactUs\Controller\ContactUsController@index')->name('contactUs');
	Route::post('/contact/send', 'ContactUs\Controller\ContactUsController@send');
	Route::get('/about-us', 'AboutUs\Controller\AboutUsController@index')->name('aboutUs');



	Route::get('/{station}', 'Player\Controller\PlayerController@index')->name('player');

});