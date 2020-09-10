<?php

namespace App\Amazing\Player\Controller;

use App\Amazing\LNController;

class PlayerController extends LNController
{
    public function index() {
        return view('Player.View.player');
    }
}