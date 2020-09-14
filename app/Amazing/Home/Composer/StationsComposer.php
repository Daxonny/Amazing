<?php
namespace App\Amazing\Home\Composer;

use Illuminate\View\View;
use App\Amazing\Home\Interactor\StationsInteractor;

class StationsComposer {
	public function compose(View $view) {
		$stations = json_decode(file_get_contents('stations.json'));

		StationsInteractor::prepare($stations);
		//dd($stations->stations[0]->streams);
		//dd($stations->stations[0]->slug);
		$view->with('stations', $stations);
	}
}

