<?php
namespace App\Amazing\Home\Model;

use App\Amazing\Home\Interactor\InteractorStations;
use App\Amazing\IVM;

class VMStations implements IVM {

	public static function execute() {
		$stations =  InteractorStations::execute();
		$path = $stations->logoPath;
		collect($stations->stations)->map(function($station) use($path) {
			return self::_prepareStation($station, $path);
		});
		return $stations;
	}
	private static function _prepareStation($station, $logoPath) {
		$logo = $logoPath . $station->slug;
		$station->logo = $logo . '-w180';
		$station->logo2x = $logo . '-w360';

		$station->name = str_replace('Amazing', '', $station->name);

		return $station;
	}


}