<?php

namespace App\Amazing\ContactUs\Controller;

use App\Amazing\LNController;
use Illuminate\Http\Request;

class ContactUsController extends LNController
{
	public function send() {
		$data = request()->validate([
			'name' => 'required',
			'email' => 'required|email',
			'text'	=> 'required',
		]);
		dd(request()->all());
	}
}