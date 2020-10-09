@extends('layout.ln')

@section('content')
<section id="player" data-station="live" ln-player>
	<h1>{{ $station->name }}</h1>
	<picture title="{{$station->name}}">
		<source srcset="{{$station->logo}}.webp, {{$station->logo2x}}.webp 2x" type="image/webp">
		<img src="{{ $station->logo }}.png" srcset="{{$station->logo}}.png ,{{$station->logo2x}}.png 2x" alt="{{$station->name}}">
	</picture>
	
	<section id="nowPlaying" ln-triton-track="{{ $station->mountName }}" ln-triton-track-interval="10">
		<p property="track" typeof="MusicRecording" data-label="Now Playing">
			<span class="Playing">Now Playing</span>
			<span property="byArtist"></span>
			<span property="name"></span>
		</p>
	</section>
	<button id="playControl" ln-player-action="play" type="button">play</button>
	<button id="stopControl" ln-player-action="stop" type="button">stop</button>
	<div id="volumeControl">
		<button ln-player-action="mute" type="button">volume_up</button>
		<input name="range" type="range" min="0" max="100" ln-player-volume="50">
	</div>
	<audio autoplay>
		<source src="{{ $station->streams[0]->url }}" />
	</audio>
</section>
<section id="description">
	<h2>{{ $station->desc->slogan}}</h2>
	<p>
		{{ $station->desc->description}}
	</p>
</section>
@endsection

@section('js')
<script type="text/javascript" src="https://playerservices.live.streamtheworld.com/api/idsync.js?stationId={{ $station->tritonStationId }}"></script>
<script async type="text/javascript" src="{{ asset('/site/v2/js/ln-triton-track/ln-triton-track.js') }}"></script>
@endsection