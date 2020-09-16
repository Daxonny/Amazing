<?php

namespace App\Amazing\Player\Interactor;

use App\Amazing\Home\Model\VMStations;
use App\Amazing\II;

class PlayerInteractor implements II{
	public static function execute(){
		$stationSlug = request()->path();
		$stations =  VMStations::execute()->stations;
		foreach($stations as $station) {
			if($station->slug == $stationSlug) {
				return $station;
			}
		}
	}
}