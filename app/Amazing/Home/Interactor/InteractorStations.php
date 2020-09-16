<?php

namespace App\Amazing\Home\Interactor;

use App\Amazing\II;

class InteractorStations implements II{
	public static function execute() {
		$data = json_decode(file_get_contents('stations.json'));
		return $data;
	}

	
}