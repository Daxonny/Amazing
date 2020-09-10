<?php

namespace App\Amazing\Home\Controller;

use App\Amazing\LNController;

class HomeController extends LNController
{
    public function index() {
        return view('Home.View.layout.home');
    }
}