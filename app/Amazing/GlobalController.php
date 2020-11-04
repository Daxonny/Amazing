<?php

namespace App\Amazing;

use App\Amazing\LNController;

class GlobalController extends LNController
{
	public function home() {
		$this->view='Home.View.index';
		return view($this->getView());
	}

	public function aboutUs() {
		return view('AboutUs.View.aboutUs');
	}

	public function contactUs() {
		return view('ContactUs.View.contactUs');
	}

	public function player() {
		return view('Player.View.player');
	}

	public function privacy() {
		return view('PrivacyPolicy.View.privacyPolicy');
	}

	public function terms() {
		return view('TAC.View.tac');
	}


}
