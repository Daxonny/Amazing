<?php 

namespace App\Amazing\Player\Composer;

use Illuminate\View\View;
use App\Amazing\Player\Interactor\PlayerInteractor;

class PlayerComposer {
	public function compose(View $view) {
		$url = PlayerInteractor::getURLStream();
		//dd($url);
		$view->with('url', $url);
	}
}