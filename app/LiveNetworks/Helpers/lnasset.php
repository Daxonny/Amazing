<?php

function lnasset($asset) {	
	if( !Config::get('ln.cdnUse') ) {
		return asset($asset);
	}

	$cdnBase = Config::get('ln.cdnBase');
	$localBase = Config::get('ln.localBase');
	$asset = str_replace(asset(''), '', $asset);

	return rtrim($cdnBase, "/") . "/" . ltrim( $asset, "/");
}
