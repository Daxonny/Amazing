<?php

namespace App\Amazing;

// use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use View;

abstract class LNController extends Controller
{
	public $view;

	public function __construct()
	{
		$webp = (supportsWebp()) ? 'webp' : '';
		View::share('webp', $webp);
	}

	public function getView() {
		$this->_request = Request();
		$this->_viewMime();

		header('Expires: Sun, 01 Jan 2014 00:00:00 GMT');
		header('Cache-Control: no-store, no-cache, must-revalidate');
		header('Cache-Control: post-check=0, pre-check=0', FALSE);
		header('Pragma: no-cache');


		return $this->view . '.' . $this->_mime;
	}

    private function _viewMime() {
		$acceptedMime = explode(',', $this->_request->header('Accept'));
		// print_r($acceptedMime);

		switch ($acceptedMime[0]) {
			case 'text/html':
				$this->_mime = 'html';
				break;
			
			case 'applicatiomn/xl':
				$this->_mime = 'xml';
				break;
			
			case 'application/json':
				$this->_mime = 'json';
				break;
			
			default:
				$this->_mime = 'html';
				break;
		}
	}
}