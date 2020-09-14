<?php

namespace App\Amazing\Home\Interactor;


class InteractorStations {
	public static function execute() {
		$data = json_decode(file_get_contents('stations.json'));
		return $data;
	}

	
}