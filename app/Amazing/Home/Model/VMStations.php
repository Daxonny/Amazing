<?php
namespace App\Amazing\Home\Model;

use App\Amazing\Home\Interactor\InteractorStations;
use App\Amazing\AVM;

class Station {
	public $name;
	public $logo;
	public $mountName;
	public $url;
	public $slug;
	public $tritonStationId;	
}


class VMStations extends AVM{

	public $stations=[];


	protected function _execute() {
		$stations = (new InteractorStations())->execute();
		foreach($stations->stations as $station) {
			$s = new Station();
			$s->name 			= $station->name;
			$s->logo 			= $station->logo;
			$s->mountName		= $station->mountName;
			$s->url 				= $station->streams[0]->url;
			$s->slug				= $station->slug;
			$s->tritonStationId 	= $station->tritonStationId;
			$this->stations[] = $s;
		}
		return $this->stations;
	}


}