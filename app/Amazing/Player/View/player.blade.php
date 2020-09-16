@extends('layout.ln')

@section('content')
<section id="player">
<h1>{{ $station->name }}</h1>
<img id="stationLogo" src="{{ $station->logo }}">
<audio autoplay controls>
<source src=" {{ $station->streams[0]->url }}" />
</audio>
</section>
@endsection