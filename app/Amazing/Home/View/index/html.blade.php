@extends('layout.ln')

@section('content')

<h2>{{ $stations->name }}</h2>
<section id="stations">
	<ul class="stationList">
		@foreach ($stations->stations as $station)
		<a href="{{ route('player',['station'=>$station->slug]) }}">	
			<li>
			<img src="{{ $station->logo }}">
				<span>{{ $station->name }}</span>
			</li>
		</a>
		@endforeach
	</ul>
</section>

@endsection