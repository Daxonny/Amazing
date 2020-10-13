<?php

namespace App\Amazing\Player\Interactor;

use App\Amazing\Home\Model\VMStations;
use App\Amazing\II;

class PlayerInteractor implements II{
	public static function execute(){
		$stationSlug = request()->path();
		return json_decode(file_get_contents('descriptions/'.$stationSlug.'.json'));
	}
}