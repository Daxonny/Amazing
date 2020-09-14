<?php

namespace App\Amazing\Home\Controller;

use App\Amazing\LNController;

class HomeController extends LNController
{
    public function index() {
		$this->view='Home.View.index';
        return view($this->getView());
    }
}