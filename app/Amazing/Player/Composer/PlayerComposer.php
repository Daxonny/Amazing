<?php 

namespace App\Amazing\Player\Composer;

use Illuminate\View\View;
use App\Amazing\Player\Interactor\PlayerInteractor;

class PlayerComposer {
	public function compose(View $view) {
		$view->with('station', PlayerInteractor::execute());
	}
}