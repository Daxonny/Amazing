<?php

namespace App\Amazing\PrivacyPolicy\Controller;

use App\Amazing\LNController;

class PrivacyController extends LNController
{
    public function index() {
        return view('PrivacyPolicy.View.privacyPolicy');
    }
}