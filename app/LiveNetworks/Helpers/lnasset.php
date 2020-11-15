<?php
function lnasset($asset) {
	if( !Config::get('ln.cdnUse') ) {
		return asset($asset);
	}

	if (filter_var($asset, FILTER_VALIDATE_URL)) {
		return $asset;
	}

	$cdnBase = Config::get('ln.cdnBase');

	return rtrim($cdnBase, "/") . "/" . ltrim( $asset, "/");
}
