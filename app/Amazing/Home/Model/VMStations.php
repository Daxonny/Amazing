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
		$station->logo = $logoPath . $station->slug . ".webp";
		return $station;
	}


}