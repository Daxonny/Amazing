<?php

namespace App\Amazing\Home\Interactor;

use App\Amazing\AInteractor;


class InteractorStations extends AInteractor{
	public function execute() {
		$data = json_decode(file_get_contents('stations.json'));
		$data->stations = collect($data->stations);
		$path = $data->logoPath;
		collect($data->stations)->map(function($station) use($path) {
			return self::_prepareStation($station, $path);
		});

		return $data;
	}
	private static function _prepareStation($station, $logoPath) {
		$logo = $logoPath . $station->slug;
		$station->logo = $logo . '-w180';
		$station->logo2x = $logo . '-w360';

		$station->fullName = $station->name;
		$station->name = str_replace('Amazing', '', $station->name);

		return $station;
	}
	
}