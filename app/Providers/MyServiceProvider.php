<?php

namespace App\Providers;


use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use App\Amazing\Home\Composer\StationsComposer;
use App\Amazing\Player\Composer\PlayerComposer;

class MyServiceProvider extends ServiceProvider
{
	/**
	 * Register services.
	 *
	 * @return void
	 */
	public function register()
	{
		//
	}

	/**
	 * Bootstrap services.
	 *
	 * @return void
	 */
	public function boot()
	{
		View::composer(['Home.View.index.html'], StationsComposer::class);
		View::composer(['Player.View.player.html'], PlayerComposer::class);
	}
}
