<?php

namespace App\Amazing\Player\Model;

use App\Amazing\Home\Model\VMStations;
use App\Amazing\Player\Interactor\PlayerInteractor;
use App\Amazing\AVM;

class VMPlayer extends AVM {
	public $name;
	public $logo;
	public $mountName;
	public $url;
	public $slogan;
	public $description;
	public $meta;
	public $tritonStationId;
	public $slug;

	protected function _execute(){
		$this->meta = new \StdClass();
		$station = (new PlayerInteractor())->execute();
		$this->name 			= $station->name;
		$this->logo 			= $station->logo;
		$this->mountName		= $station->mountName;
		$this->url 				= $station->streams[0]->url;
		$this->slogan 			= $station->slogan;
		$this->description 		= $station->description;
		$this->meta->description 		= $station->meta->description;
		$this->tritonStationId 	= $station->tritonStationId;
		$this->slug				= $station->slug;

		return $this;
	}


}