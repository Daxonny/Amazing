<?php
namespace App\Amazing\Home\Composer;

use Illuminate\View\View;
use App\Amazing\Home\Model\VMStations;

class StationsComposer {
	public function compose(View $view) {
		$vm=new VMStations();
		$view->with('vm', $vm);
	}
}

