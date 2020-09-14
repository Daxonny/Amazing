<?php

namespace App\Amazing\Player\Interactor;

class PlayerInteractor {
	public static function getURLStream() {
		$station = request()->path();
		//dd($station);
		switch ($station) {
			case "amazing-80s":
				$url="http://mainstream.amazingradios.com:8000/80s128?utm_source=website&utm_medium=none&utm_campaign=none";
				break;
			case "amazing-blues":
				$url="http://mainstream.amazingradios.com:8000/blues128?utm_source=website&utm_medium=none&utm_campaign=none";
				break;
			case "amazing-chillout":
				$url="http://mainstream.amazingradios.com:8000/chillout128?utm_source=website&utm_medium=none&utm_campaign=none";
				break;
			case "amazing-chillhop":
				$url="http://mainstream.amazingradios.com:8000/_____?utm_source=website&utm_medium=none&utm_campaign=none";
				break;
			case "amazing-classic-hits":
				$url="http://mainstream.amazingradios.com:8000/1995_128?utm_source=website&utm_medium=none&utm_campaign=none";
				break;
			case "amazing-smooth-jazz":
				$url="http://mainstream.amazingradios.com:8000/jazz128?utm_source=website&utm_medium=none&utm_campaign=none";
				break;
		}

		return $url;
	}
}