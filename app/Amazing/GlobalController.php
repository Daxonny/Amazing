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
		$this->view='AboutUs.View';
		return view($this->getView());
	}

	public function contactUs() {
		$this->view='ContactUs.View';
		return view($this->getView());
	}

	public function player() {
		$this->view='Player.View.player';
		return view($this->getView());
	}

	public function privacy() {
		$this->view='PrivacyPolicy.View';
		return view($this->getView());
	}

	public function terms() {
		$this->view='TAC.View';
		return view($this->getView());
	}


}
