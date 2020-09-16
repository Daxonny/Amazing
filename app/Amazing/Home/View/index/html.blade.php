@extends('layout.ln')

@section('content')
<section id="stations">
	<h1>{{ $stations->name }}</h1>
	<ul class="stationList">
		@foreach ($stations->stations as $station)
		<a href="{{ route('player',['station'=>$station->slug]) }}">	
			<li>
			<img src="{{ $station->logo }}">
				<span class="name">{{ str_replace('Amazing', '', $station->name) }}</span>
			</li>
		</a>
		@endforeach
	</ul>
</section>

<section id="ad">

</section>

@endsection