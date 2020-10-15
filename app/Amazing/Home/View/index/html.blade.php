@extends('layout.ln')
@section('title', 'Free Internet Radion Network')

@section('logoHeader')
<h1>AMAZING RADIOS </h1>
<p>Listen live now</p>
<img src="{{ 'logos/header/header_amazing-radios-01.jpg' }}" alt="Amazing Radios Logo" class="ar-logo">
@endsection

@section('content')
<section id="content-station">
	<section id="stations">
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
				<section class="nowPlaying" ln-triton-track="{{ $station->mountName }}" ln-triton-track-interval="10">
					<p property="track" typeof="MusicRecording" data-label="Now Playing">
						<span class="Playing">Now Playing</span>
						<span property="byArtist">Billy Price & Fred Chapellier</span>
						<span property="name">My Love Comes Tumbling Down</span>
					</p>
				</section>
				<button class="fav">star</button>
			</li>
			@endforeach
		</ul>
	</section>

	<section id="ad">

	</section>

</section>
@endsection

@section('js')
<script type="text/javascript" src="https://playerservices.live.streamtheworld.com/api/idsync.js?stationId={{ $station->tritonStationId }}"></script>
<script async type="text/javascript" src="{{ asset('/site/v2/js/ln-triton-track/ln-triton-track.js') }}"></script>
@endsection