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
	<p>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
	</p>
</section>
@endsection

@section('js')
<script type="text/javascript" src="https://playerservices.live.streamtheworld.com/api/idsync.js?stationId={{ $station->tritonStationId }}"></script>
<script async type="text/javascript" src="{{ asset('/site/v2/js/ln-triton-track/ln-triton-track.js') }}"></script>
@endsection