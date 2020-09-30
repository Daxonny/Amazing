<?php

namespace App\Amazing\TAC\Controller;

use App\Amazing\LNController;

class TACController extends LNController
{
    public function index() {
        return view('TAC.View.tac');
    }
}