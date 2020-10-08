<?php

namespace App\Amazing\AboutUs\Controller;

use App\Amazing\LNController;

class AboutUsController extends LNController
{
    public function index() {
        return view('AboutUs.View.aboutUs');
    }
}