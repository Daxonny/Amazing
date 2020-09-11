<?php
namespace App\Amazing\Home\Composer;

use Illuminate\View\View;
use App\Amazing\Home\Interactor\StationsInteractor;

class StationsComposer {
	public function compose(View $view) {
		$stations = json_decode(file_get_contents('stations.json'));

		StationsInteractor::prepare($stations);

		$view->with('stations', $stations);
	}
}

