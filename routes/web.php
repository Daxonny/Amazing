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
    Route::get('/tac', 'TAC\Controller\TACController@index')->name('tac');
	Route::get('/privacy', 'PrivacyPolicy\Controller\PrivacyController@index')->name('privacy');
    Route::get('/contactus', 'ContactUs\Controller\ContactUsController@index')->name('contactUs');
    Route::get('/aboutus', 'AboutUs\Controller\AboutUsController@index')->name('aboutUs');
	Route::post('/contactus', 'ContactUs\Controller\ContactUsController@index')->name('contactUs');
    Route::get('/{station}', 'Player\Controller\PlayerController@index')->name('player');
});