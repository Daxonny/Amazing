@extends('layout.ln')

@section('title', $vm->name)
@section('description', $vm->meta->description)

@section('content')
<section id="player" data-station="live" ln-player>

	<div id="playerComponent">
		<h1 class="{{$vm->slug}}">{{ $vm->name }}</h1>
		<picture>
				<source data-srcset="{{ lnasset($vm->logo . '-w360.webp') }} 2x, {{ lnasset($vm->logo . '-w180.webp') }} 1x" type="image/webp">
				<img 
					data-src="{{ lnasset($vm->logo . '-w180.png') }}"
					data-srcset="{{ lnasset($vm->logo . '-w360.png') }} 2x, {{ lnasset($vm->logo . '-w180.png') }} 1x"
					loading="lazy"
					class="lazyload" 
					alt="{{ $vm->name }} Logo"
					title="{{ $vm->name }} Logo">
				<noscript>
					<img src="{{ lnasset($vm->logo . '.png') }}"
						alt="{{ $vm->name }} Logo"
						property="image"
						title="{{ $vm->name }} Logo">
				</noscript>
		</picture>
		<div id="volumeControl" class="ln-icon {{$vm->slug}}">
			<button ln-player-action="mute" type="button">volume_up</button>
			<input name="range" type="range" min="0" max="100" ln-player-volume="50">
		</div>
	</div>
	<div id="nowComponent">
		<button id="playControl" ln-player-action="play" type="button" class="{{$vm->slug}}">play</button>
		<button id="stopControl" ln-player-action="stop" type="button" class="{{$vm->slug}}">stop</button>
		<section id="nowPlaying" ln-triton-track="{{ $vm->mountName }}" ln-triton-track-interval="10">
			<p property="track" typeof="MusicRecording" data-label="Now Playing">
				<span property="byArtist"></span>
				<span property="name"></span>
			</p>
		</section>
	</div>
	<audio autoplay>
		<source src="{{ $vm->url }}" />
	</audio>

	<div id="ad3" class="ad">
		<ins class="adsbygoogle"
			style="display:block; text-align:center;"
			data-ad-layout="in-article"
			data-ad-format="fluid"
			data-ad-client="ca-pub-5401857225374045"
			data-ad-slot="8574456020">
		</ins>
	</div>
</section>
<section id="description" class="content">
	<h2>{!! $vm->slogan !!}</h2>
	{!! $vm->description !!}
</section>
@endsection

@section('js')
<script type="text/javascript" src="https://playerservices.live.streamtheworld.com/api/idsync.js?stationId={{ $vm->tritonStationId }}" async></script>
@endsection