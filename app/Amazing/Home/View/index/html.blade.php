@extends('layout.ln')

@section('title', __('home.title'))
@section('ogDescription', __('home.description'))

@section('content')

<section id="heroBox">
	<h1>AMAZING RADIOS </h1>
	<p>Listen live now</p>
	<picture title="Amazing Radios Logo">
		<source srcset="{{ lnasset('/headers/site/header_amazing-radios-01-w1210.webp') }}" type="image/webp">
		<img src="{{ lnasset('/headers/site/header_amazing-radios-01-w1210.png') }}" srcset="{{ lnasset('/headers/site/header_amazing-radios-01-w1210.png') }}" loading="lazy" width="1210" height="290" alt="Amazing Radios Logo" class="ar-logo">	
	</picture>
</section>

<div id="channels">

	<div id="ad1" class="ad">
		<ins class="adsbygoogle"
			style="display:block; text-align:center;"
			data-ad-layout="in-article"
			data-ad-format="fluid"
			data-ad-client="ca-pub-5401857225374045"
			data-ad-slot="8574456020">
		</ins>
	</div>


	<ul id="stations" class="stationList">
		@foreach ($vm->stations as $station)
		<li id="{{ $station->slug }}">
			<h2 typeof="RadioStation">
				<a href="{{ route('player',['station'=>$station->slug]) }}">
					<picture title="{{ $station->name }}">
						<source srcset="{{ $station->logo }}.webp, {{ $station->logo2x }}.webp 2x" type="image/webp">
						<img src="{{ $station->logo }}.png"  srcset="{{ $station->logo }}.png ,{{ $station->logo2x }}.png 2x" loading="lazy" alt="{{ $station->name }}">
					</picture>
					<span property="name">{{ $station->name }}</span>
				</a>
			</h2>
			<div class="nowPlaying" ln-triton-track="{{ $station->mountName }}" ln-triton-track-interval="10">
				<p property="track" typeof="MusicRecording" data-label="{{ __('global.nowPlaying') }}">
					<span property="byArtist"></span>
					<span property="name"></span>
				</p>
			</div>
			<button class="fav ln-icon" title="{{ __('Add to favourites') }}">star</button>
		</li>
		@endforeach
	</ul>

	<div id="ad2" class="ad">
		<ins class="adsbygoogle"
			style="display:block; text-align:center;"
			data-ad-layout="in-article"
			data-ad-format="fluid"
			data-ad-client="ca-pub-5401857225374045"
			data-ad-slot="8574456020">
		</ins>
	</div>

</div>
@endsection

@section('js')
	<script async type="text/javascript" src="https://playerservices.live.streamtheworld.com/api/idsync.js?stationId={{ $station->tritonStationId }}"></script>
	<script async type="text/javascript" src="{{ lnasset('/site/v2/js/ln-triton-track/ln-triton-track.js') }}"></script>
@endsection
