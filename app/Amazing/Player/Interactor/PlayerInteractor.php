<?php

namespace App\Amazing\Player\Interactor;

use App\Amazing\Home\Model\VMStations;
use App\Amazing\AInteractor;
use App\Amazing\Home\Interactor\InteractorStations;

class PlayerInteractor extends AInteractor{

	public function execute(){
		$this->_lang = \App::getLocale();
		$this->_stationSlug = request()->route()->parameters["station"];

		$this->_station = $this->_findStation()->first();

		$this->_getDescription();

		return $this->_station;

	}

	private function _findStation() {
		$stations = (new InteractorStations())->execute();
		return $stations->stations->filter(function($station) {
			return $station->slug == $this->_stationSlug;
		});
	}

	private function _getDescription() {
		$stationDetails = json_decode(file_get_contents('descriptions/'.$this->_stationSlug.'.json'));
		$this->_station->description = implode('', $stationDetails->description->{$this->_lang}->description);
		$this->_station->slogan = $stationDetails->description->{$this->_lang}->slogan;
	}
}
