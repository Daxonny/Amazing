@extends('layout.ln')

@section('title', $vm->fullName)

@section('content')
<section id="player" data-station="live" ln-player>
	<h1>{{ $vm->name }}</h1>
	<picture title="{{$vm->name}}">
		<source srcset="{{$vm->logo}}.webp, {{$vm->logo2x}}.webp 2x" type="image/webp">
		<img src="{{ $vm->logo }}.png" srcset="{{$vm->logo}}.png ,{{$vm->logo2x}}.png 2x" alt="{{$vm->name}}">
	</picture>
	
	<section id="nowPlaying" ln-triton-track="{{ $vm->mountName }}" ln-triton-track-interval="10">
		<p property="track" typeof="MusicRecording" data-label="Now Playing">
			<span class="Playing">Now Playing</span>
			<span property="byArtist"></span>
			<span property="name"></span>
		</p>
	</section>
	<button id="playControl" ln-player-action="play" type="button">play</button>
	<button id="stopControl" ln-player-action="stop" type="button">stop</button>
	<div id="volumeControl" class="ln-icon">
		<button ln-player-action="mute" type="button">volume_up</button>
		<input name="range" type="range" min="0" max="100" ln-player-volume="50">
	</div>
	<audio autoplay>
		<source src="{{ $vm->url }}" />
	</audio>
	<div id="ad3" class="ad">
		<p>Reklama</p>
	</div>
</section>
<section id="description" class="content">
	<h2>{!! $vm->slogan !!}</h2>
	{!! $vm->description !!}
</section>
@endsection

@section('js')
	<script type="text/javascript" src="https://playerservices.live.streamtheworld.com/api/idsync.js?stationId={{ $vm->tritonStationId }}" defer></script>

	<script type="text/javascript" src="{{ asset('/site/v2/js/ln-triton-track/ln-triton-track.js') }}" defer></script>
@endsection