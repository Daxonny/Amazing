@extends('layout.ln')

@section('logoHeader')
	<h1>Listen AMAZING RADIOS live now</h1>
	<img src="{{ 'logos/header/header_amazing-radios-01.jpg' }}">
@endsection

@section('content')
<section id="stations">
	{{ $stations->name }}
	<ul class="stationList">
		@foreach ($stations->stations as $station)
		<li id="{{ $station->slug }}" typeof="RadioStation">
			<h2>
				<a href="{{ route('player',['station'=>$station->slug]) }}">
					<img src="{{ $station->logo }}">
					<span class="nameRadio">{{ str_replace('Amazing', '', $station->name) }}</span>
				</a>
			</h2>
			<section class="nowPlay">
				<p class="track" typeof="MusicRecording" data-label="Now Playing">
				<span class="nowPlaying">Now Playing</span>
					<span class="byArtist">Billy Price & Fred Chapellier</span>
					<span class="name">My Love Comes Tumbling Down</span>
				</p>
				<button class="fav">star</button>
			</section>
		</li>
		@endforeach
	</ul>
</section>

<section id="ad">

</section>

@endsection