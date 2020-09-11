<?php

namespace App\Amazing\Home\Interactor;


class StationsInteractor {
	public static function prepare($data) {
		$path = $data->logoPath;
		collect($data->stations)->map(function($station) use($path) {
		return self::_prepareStation($station, $path);
	});
		return $data;
	}
	private static function _prepareStation($station, $logoPath) {
		$station->logo = $logoPath . $station->slug . ".webp";
		return $station;
	}
	
}