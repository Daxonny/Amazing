<?php

namespace App\Amazing\ContactUs\Controller;

use App\Amazing\LNController;

class ContactUsController extends LNController
{
    public function index() {
        return view('ContactUs.View.contactUs');
    }
}