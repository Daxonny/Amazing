<?php 

namespace App\Amazing\Player\Composer;

use Illuminate\View\View;
use App\Amazing\Player\Model\VMPlayer;

class PlayerComposer {
	public function compose(View $view) {
		$view->with('station', VMPlayer::execute());
	}
}