@extends('layout.ln')
@section('title', __('home.title'))
@section('ogDescription', __('home.description'))

@section('content')

<section id="headerLogo">
	<h1>AMAZING RADIOS </h1>
	<p>Listen live now</p>
	<img src="{{ 'logos/header/header_amazing-radios-01.jpg' }}" alt="Amazing Radios Logo" class="ar-logo">
</section>

<div id="content-station">
	<ul class="stationList">
		@foreach ($vm->stations as $station)
		<li id="{{ $station->slug }}">
			<h2 typeof="RadioStation">
				<a href="{{ route('player',['station'=>$station->slug]) }}">
					<picture title="{{$station->name}}">
						<source srcset="{{$station->logo}}.webp, {{$station->logo2x}}.webp 2x" type="image/webp">
						<img src="{{ $station->logo }}.png" srcset="{{$station->logo}}.png ,{{$station->logo2x}}.png 2x" alt="{{$station->name}}">
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
			<button class="fav">star</button>
		</li>
		@endforeach
	</ul>

	<div class="ad">
		<img src="https://via.placeholder.com/300x600?text=300x600+Half+Page+Ad" />
	</div>

</div>
@endsection

@section('js')
<script type="text/javascript" src="https://playerservices.live.streamtheworld.com/api/idsync.js?stationId={{ $station->tritonStationId }}"></script>
<script async type="text/javascript" src="{{ asset('/site/v2/js/ln-triton-track/ln-triton-track.js') }}"></script>
@endsection