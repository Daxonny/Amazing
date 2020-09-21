<!DOCTYPE html>
<html lang="{{tongue()->current()}}" dir="{{tongue()->leftOrRight()}}">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">

	<!-- CSRF Token -->
	<meta name="csrf-token" content="{{ csrf_token() }}">

	<title>@yield('title') &raquo; Amazing Radios</title>

	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<!-- 
	<link rel="preload" href="site/css/reset.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
	<link rel="preload" href="site/css/optimized.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
	<link rel="preload" href="site/css/extra.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
	<noscript>
		<link rel="stylesheet" href="site/css/reset.css">
		<link rel="stylesheet" href="site/css/optimized.css">
		<link rel="stylesheet" href="site/css/extra.css">
	</noscript> -->

	<link rel="stylesheet" href="{{ asset('/site/v2/css/reset.min.css') }}">

	<link rel="stylesheet" href="{{ asset('/site/v2/css/optimized.min.css') }}" media="screen">
	<link rel="stylesheet" href="{{ asset('/site/v2/css/extra.min.css') }}" media="screen">
	
	<link rel="stylesheet" href="{{ asset('/site/v2/css/stations.css') }}" media="screen">
	<link rel="stylesheet" href="{{ asset('/site/v2/css/player.css') }}" media="screen">


	<!-- Implement Accept image/webp -->
	<link rel="stylesheet" href="{{ asset('/site/v2/css/webp.min.css') }}" media="screen">



	<meta name="description" content="Amazing Radios is free internet radio network, providing free music in various genres" />
	<meta name="robots" content="index,follow" />

	@include('layout.headerSnippets.fb')
	@include('layout.headerSnippets.icons')

</head>
<body id="index" vocab="http://schema.org/">
	<div id="wrap">
		<header>
			<img src="{{ 'logos/ar-logo.svg' }}" alt="Amazing Radios Logo" id="logo" />

			<input type="checkbox" name="nav" id="nav">
			<label for="nav">menu</label>

			<nav>
				<ul>
					<li>
					<a href="{{ route('index')}}" ln-ajaxify-target="main">{{ __('global.home') }}</a>
					</li>
					<li>
						<a href="#">{{ __('global.channels') }}</a>
					</li>
					<li>
						<a href="#">{{ __('global.aboutUs') }}</a>
					</li>
					<li>
						<a href="#">{{ __('global.contactUs') }}</a>
					</li>
				</ul>

				<ul id="userNav">
					<li>
						<a href="#">{{ __('global.register') }}</a>
					</li>
					<li>
						<a href="#">{{ __('global.login') }}</a>
					</li>
				</ul>
			</nav>
		

		</header>

		<main id="main">
			@include('Home.View._partials.share')
			<section id="headerLogo">
				<h1>Listen AMAZING RADIOS live now</h1>
				<img src="{{ 'logos/header/header_amazing-radios-01.jpg' }}">
			</section>
			<section id="content">
				@yield('content')
			</section>
		</main>

		<footer>
			<nav>
				<ul>
					<li>
						<a href="#">Home</a>
					</li>
					<li>
						<a href="#">About us</a>
					</li>
					<li>
						<a href="#">Privacy</a>
					</li>
					<li>
						<a href="#">TOC</a>
					</li>
					<li>
						<a href="#">FAQ</a>
					</li>
					<li>
						<a href="#">Contact</a>
					</li>
				</ul>
			</nav>

			<p>
				{{-- <img src="{{ lncdn(lnimg('/logos/ar-logo-white.svg')) }}" alt="Amazing Radios Logo" /> --}}
				<img src="{{ 'logos/ar-logo-white.svg' }}" alt="Amazing Radios Logo" id="logo" />
				<span>Copyright &copy; 2019 &middot;
					<a href="https://amazingradios.com">AMAZINGRADIOS.com</a>
				</span>
			</p>

		</footer>
	</div>

	{{-- <div id="player" ln-draggable></div> --}}



	{{-- <script async type="text/javascript" src="{{ asset('/site/v2/js/ar.js') }}"></script>
	<script async type="text/javascript" src="{{ asset('/site/v2/js/draggable/ln-draggable.js') }}"></script>
	<script async type="text/javascript" src="{{ asset('/site/v2/js/ajaxify/ajaxify.js') }}"></script>
	<!-- <script async type="text/javascript" src="{{ asset('/site/v2/js/player/player.js') }}"></script> -->

	<script async src="{{ lncdn(asset('/site/v2/js/player.js')) }}"></script>
	@yield('js') --}}

</body>
</html>