<?php
namespace App\Amazing\Home\Model;

class Stations {
    public $list;
	public $current;

    // public function __construct() {
	// 	$data = json_decode(file_get_contents('stations.json'));
	// 	$this->list = collect($data->stations)->map(function($station) {
	// 		return $this->_prepareStation($station);
	// 	});
	// }

	// public function setStation($slug) {
	// 	$this->current = $this->list->map(function($station) use ($slug){
	// 		if ($station->slug == $slug) {
	// 			return $station;
	// 		}
	// 	});
	// }

	// private function _prepareStation($station) {
	// 	$station->logo = '/logos/' . $station->slug;
	// 	return $station;
	// }
}