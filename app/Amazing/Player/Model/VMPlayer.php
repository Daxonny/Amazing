<?php

namespace App\Amazing\Player\Model;

use App\Amazing\Home\Model\VMStations;
use App\Amazing\Player\Interactor\PlayerInteractor;
use App\Amazing\AVM;

class VMPlayer extends AVM {

	public $name;
	public $logo;
	public $logo2x;
	public $mountName;
	public $url;
	public $slogan;
	public $description;
	public $tritonStationId;

	protected function _execute(){
		$station = (new PlayerInteractor())->execute();
		$this->name 			= $station->name;
		$this->logo 			= $station->logo;
		$this->logo2x 			= $station->logo2x;
		$this->mountName		= $station->mountName;
		$this->url 				= $station->streams[0]->url;
		$this->slogan 			= $station->slogan;
		$this->description 		= $station->description;
		$this->tritonStationId 	= $station->tritonStationId;

		return $this;
	}


}