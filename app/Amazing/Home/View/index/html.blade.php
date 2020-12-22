@extends('layout.ln')

@section('title', __('home.title'))
@section('description', __('home.description'))

@section('content')

<section id="heroBox">
	<h1>AMAZING RADIOS </h1>
	<p>Listen live now</p>
	<picture title="Amazing Radios">
		<source media="(min-width: 1281px)" srcset="{{ lnasset('/headers/site/header_amazing-radios-01-w1210.webp') }}" type="image/webp">
		<source media="(min-width: 1025px)" srcset="{{ lnasset('/headers/site/header_amazing-radios-01-w1000.webp') }}" type="image/webp">
		<source media="(min-width: 768px) and (max-width: 1024px)" srcset="{{ lnasset('/headers/site/header_amazing-radios-01-w750.webp') }}" type="image/webp">
		<source media="(max-width: 767px)" srcset="{{ lnasset('/headers/site/header_amazing-radios-01-w300.webp') }}" type="image/webp">
		<img src="{{ lnasset('/headers/site/header_amazing-radios-01-w1210.png') }}" srcset="{{ lnasset('/headers/site/header_amazing-radios-01-w1210.png') }}" loading="lazy" alt="Amazing Radios" class="ar-logo">	
	</picture>
</section>

<div id="channels">

	<div id="ad1" class="ad">
		<ins class="adsbygoogle"
			style="display:block; text-align:center;"
			data-ad-layout="in-article"
			data-ad-format="fluid"
			data-ad-client="ca-pub-5401857225374045"
			data-ad-slot="8574456020">
		</ins>
	</div>


	<ul id="stations" class="stationList">
		@foreach ($vm->stations as $station)
			@include('Home.View._partials.channelListItem', ['channel' => $station])
		@endforeach
	</ul>

	<div id="ad2" class="ad">
		<ins class="adsbygoogle"
			style="display:block; text-align:center;"
			data-ad-layout="in-article"
			data-ad-format="fluid"
			data-ad-client="ca-pub-5401857225374045"
			data-ad-slot="8574456020">
		</ins>
	</div>

</div>
@endsection
