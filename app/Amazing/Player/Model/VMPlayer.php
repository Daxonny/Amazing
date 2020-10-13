<?php

namespace App\Amazing\Player\Model;

use App\Amazing\Home\Model\VMStations;
use App\Amazing\Player\Interactor\PlayerInteractor;
use App\Amazing\IVM;

class VMPlayer implements IVM {
	public static function execute(){
		$stationSlug = request()->path();
		$descriptions = PlayerInteractor::execute();
		$description = self::_getDescription($descriptions);
		$stations = VMStations::execute()->stations;
		foreach($stations as $station) {
			if($station->slug == $stationSlug) {
				$station->desc = $description;
				return $station;
			}
		}
	}
	private static function _getDescription($descriptions) {
		$lang = \App::getLocale();
		foreach($descriptions->description as $key => $desc) {
			if ($key == $lang)
				return $desc;
		}
	}
}