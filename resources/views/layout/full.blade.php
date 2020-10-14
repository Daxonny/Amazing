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

	<link rel="stylesheet" href="{{ asset('/site/v2/css/optimized.css') }}" media="screen">
	<link rel="stylesheet" href="{{ asset('/site/v2/css/extra.min.css') }}" media="screen">
	
	<link rel="stylesheet" href="{{ asset('/site/v2/css/stations.css') }}" media="screen">
	<link rel="stylesheet" href="{{ asset('/site/v2/css/player.css') }}" media="screen">
	<link rel="stylesheet" href="{{ asset('/site/v2/css/contactUs.css') }}" media="screen">


	<!-- Implement Accept image/webp -->
	<link rel="stylesheet" href="{{ asset('/site/v2/css/webp.min.css') }}" media="screen">

	<script src="https://www.google.com/recaptcha/api.js"></script>


	<meta name="description" content="Amazing Radios is free internet radio network, providing free music in various genres" />
	<meta name="robots" content="index,follow" />

	@include('layout.headerSnippets.fb')
	@include('layout.headerSnippets.icons')

</head>
<body id="index" vocab="http://schema.org/">
	<div id="wrap">
		<header>
			<img src="{{ asset('logos/ar-logo.svg') }}" alt="Amazing Radios Logo" id="logo" />

			<input type="checkbox" name="nav" id="nav">
			<label for="nav">menu</label>

			<nav>
				<ul>
					<li>
					<a href="{{ route('index')}}" ln-ajaxify-target="main">{{ __('global.home') }}</a>
					</li>
					{{-- <li>
						<a href="#">{{ __('global.channels') }}</a>
					</li> --}}
					<li>
						<a href="{{ route('aboutUs') }}">{{ __('global.aboutUs') }}</a>
					</li>
					<li>
						<a href="{{ route('contactUs') }}">{{ __('global.contactUs') }}</a>
					</li>
				</ul>

				{{-- <ul id="userNav">
					<li>
						<a href="#">{{ __('global.register') }}</a>
					</li>
					<li>
						<a href="#">{{ __('global.login') }}</a>
					</li>
				</ul> --}}
			</nav>
			<!-- <section id="languages">
				<ul>
					<li>
						<a href="{{ dialect()->current('en') }}"
							><img 
								src="{{ asset('flags/usa.png') }}" 
								alt="USA Flag"
						/></a>
					</li>
					<li>
						<a href="{{ dialect()->current('fr') }}"
							><img
								src="{{ asset('flags/france.png') }}"
								alt="France Flag"
						/></a>
					</li>
					<li>
						<a href="{{ dialect()->current('de') }}"
							><img
								src="{{ asset('flags/germany.png') }}"
								alt="Germany Flag"
						/></a>
					</li>
					<li>
						<a href="{{ dialect()->current('mk') }}"
							><img
								src="{{ asset('flags/macedonia.png') }}"
								alt="Macedonia Flag"
						/></a>
					</li>
				</ul>
			</section> -->
		</header>

		<main id="main">
			@include('Home.View._partials.share')
			<section id="headerLogo">
				@yield('logoHeader')
			</section>
			<section id="content" class="@yield('contentClass')">
				@yield('content')
			</section>
		</main>

		<footer>
			<nav>
				<ul>
					<li>
						<a href="{{ route('index')}}" ln-ajaxify-target="main">{{ __('global.home') }}</a>
					</li>
					<li>
						<a href="{{ route('aboutUs') }}">{{ __('global.aboutUs') }}</a>
					</li>
					<li>
						<a href="{{ route ('privacy') }}">{{ __('global.privacy') }}</a>
					</li>
					<li>
						<a href="{{ route('tac') }}">{{ __('global.tac') }}</a>
					</li>
					<li>
						<a href="{{ route('contactUs') }}">{{ __('global.contact') }}</a>
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

	<!-- <div id="player" ln-draggable></div> -->

	<script async type="text/javascript" src="{{ asset('/site/v2/js/ar.js') }}"></script>
	<script async type="text/javascript" src="{{ asset('/site/v2/js/draggable/ln-draggable.js') }}"></script>
	<script async type="text/javascript" src="{{ asset('/site/v2/js/player/player.js') }}"></script>
	<script async type="text/javascript" src="{{ asset('/site/v2/js/obfuscator/ln-obfuscator.js') }}"></script>


	@yield('js') 

</body>
</html>