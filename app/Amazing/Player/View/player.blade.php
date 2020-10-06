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
@endsection

@section('js')
<script type="text/javascript" src="https://playerservices.live.streamtheworld.com/api/idsync.js?stationId={{ $station->tritonStationId }}"></script>
{{-- <script src="//widgets.listenlive.co/1.0/tdwidgets.min.js"></script> --}}
<script async type="text/javascript" src="{{ asset('/site/v2/js/ln-triton-track/ln-triton-track.js') }}"></script>


{{-- <script>

	nowPlaying = document.getElementById('nowPlaying');
	artist = nowPlaying.querySelectorAll('[property="byArtist"]')[0];
	track = nowPlaying.querySelectorAll('[property="name"]')[0];

	var xhr = new XMLHttpRequest();

	cacheNow = new Date();
	xhr.open('GET', "http://np.tritondigital.com/public/nowplaying?mountName={{ $station->mountName }}&numberToFetch=1&eventType=track&request.preventCache=1601906085842");

	xhr.onload = function () {
		if (xhr.status >= 200 && xhr.status < 300) {
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(xhr.responseText,"text/xml");
			console.log(xmlDoc.querySelectorAll("[name='cue_title']")[0].childNodes[0].nodeValue);
			artist.innerText = xmlDoc.querySelectorAll("[name='track_artist_name']")[0].childNodes[0].nodeValue;
			track.innerText = xmlDoc.querySelectorAll("[name='cue_title']")[0].childNodes[0].nodeValue;

		} else {
		}
	};
	xhr.send();
</script> --}}

@endsection