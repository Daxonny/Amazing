@extends('layout.ln')

@section('content')
<section id="stations">
	<!-- <h1>{{ $stations->name }}</h1> -->
	<ul class="stationList">
		@foreach ($stations->stations as $station)
		<li id="{{ $station->slug }}" typeof="RadioStation">
			<h2>
				<a href="{{ route('player',['station'=>$station->slug]) }}">

					<img src="{{ $station->logo }}">
					<span class="nameRadio">{{ str_replace('Amazing', '', $station->name) }}</span>
				</a>
			</h2>
			<p class="track" typeof="MusicRecording" data-label="Now Playing">
				<span class="byArtist">Billy Price & Fred Chapellier</span>
				<span class="name">My Love Comes Tumbling Down</span>
			</p>
			<button class="favourite">star</button>
		</li>
		@endforeach
	</ul>
</section>

<section id="ad">

</section>

@endsection