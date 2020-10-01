@extends('layout.ln')

@section('logoHeader')
<h1>Listen AMAZING RADIOS live now</h1>
<img src="{{ 'logos/header/header_amazing-radios-01.jpg' }}" alt="Amazing Radios Logo" class="ar-logo">
@endsection

@section('content')
<section id="stations">
	<!-- {{ $stations->name }} -->
	<ul class="stationList">
		@foreach ($stations->stations as $station)
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
			<section class="nowPlaying">
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

@endsection