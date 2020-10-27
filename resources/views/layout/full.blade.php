<!DOCTYPE html>
<html lang="{{tongue()->current()}}" dir="{{tongue()->leftOrRight()}}">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">

	<link rel="preconnect" href="https://cdn.amazingradios.com">
	<link rel="preconnect" href="https://np.tritondigital.com">
	<link rel="preconnect" href="https://playerservices.live.streamtheworld.com">

	<!-- Preload Fonts -->
	<link rel="preload" href="{{ lnasset('/site/fonts/ln-icons/ln-icons.woff2') }}" as="font" type="font/woff2" crossorigin>
	<link rel="preload" href="https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2" as="font" type="font/woff2" crossorigin>

	<!-- CSRF Token -->
	<meta name="csrf-token" content="{{ csrf_token() }}">

	<title>@yield('title') &raquo; Amazing Radios</title>

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-180609245-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'UA-180609245-1');
	</script>

	<link rel="stylesheet" href="{{ lnasset('/site/v2/dist/css/styles.css') }}" media="screen">

	<!-- 	<link rel="stylesheet" href="{{ lnasset('/site/v2/dist/css/mobile.css') }}" media="screen and (min-width: 320px) and (max-width: 767px)">
	<link rel="stylesheet" href="{{ lnasset('/site/v2/dist/css/tablet.css') }}" media="screen and (min-width: 768px) and (max-width: 1024px)">
	<link rel="stylesheet" href="{{ lnasset('/site/v2/dist/css/desktop.css') }}" media="screen and (min-width: 1025px)"> -->

	<!-- Implement Accept image/webp -->
	<link rel="stylesheet" href="{{ lnasset('/site/v2/css/webp.min.css') }}" media="screen">


	<meta name="description" content="@yield('ogDescription')" />
	<meta name="robots" content="index,follow" />

	@include('layout.headerSnippets.fb')
	@include('layout.headerSnippets.icons')

</head>

<body vocab="http://schema.org/" class="">
	<div id="wrap">
		<header>
			<a href="{{ route('index')}}">
				<img src="{{ lnasset('logos/ar-logo.svg') }}" alt="Amazing Radios Logo" id="logo" />
			</a>
			<nav>

				<ul>
					<li>
						<a href="{{ route('index')}}" ln-ajaxify-target="main">{{ __('global.home') }}</a>
					</li>
					<li>
						<a href="{{ route('aboutUs') }}">{{ __('global.aboutUs') }}</a>
					</li>
					<li>
						<a href="{{ route('contactUs') }}">{{ __('global.contactUs') }}</a>
					</li>
				</ul>
				<div id="navMenu">
					<input type="checkbox" name="nav" id="nav">
					<label for="nav" class="ln-icon">menu</label>
				</div>

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
								src="{{ lnasset('flags/usa.png') }}" 
								alt="USA Flag"
						/></a>
					</li>
					<li>
						<a href="{{ dialect()->current('fr') }}"
							><img
								src="{{ lnasset('flags/france.png') }}"
								alt="France Flag"
						/></a>
					</li>
					<li>
						<a href="{{ dialect()->current('de') }}"
							><img
								src="{{ lnasset('flags/germany.png') }}"
								alt="Germany Flag"
						/></a>
					</li>
					<li>
						<a href="{{ dialect()->current('mk') }}"
							><img
								src="{{ lnasset('flags/macedonia.png') }}"
								alt="Macedonia Flag"
						/></a>
					</li>
				</ul>
			</section> -->

			@include('layout._partials.share')
		</header>

		<main id="main">
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
						<a href="{{ route('terms') }}">{{ __('global.terms') }}</a>
					</li>
					<li>
						<a href="{{ route('contactUs') }}">{{ __('global.contact') }}</a>
					</li>
				</ul>
			</nav>

			<p>
				<img src="{{ lnasset('logos/ar-logo-white.svg') }}" alt="Amazing Radios Logo" id="logoFooter" />
				<span>Copyright &copy; 2019 &middot;
					<a href="{{ route('index') }}">AMAZINGRADIOS.com</a>
				</span>
			</p>

		</footer>
	</div>

	<!-- <div id="player" ln-draggable></div> -->

	<!-- <script async type="text/javascript" src="{{ lnasset('/site/v2/js/ar.js') }}"></script> -->
	<script src="{{ lnasset('/site/v2/dist/app.js') }}" async></script>


	<!-- 	<script async type="text/javascript" src="{{ lnasset('/site/v2/js/draggable/ln-draggable.js') }}"></script>
 -->
	<script async type="text/javascript" src="{{ lnasset('/site/v2/js/player/player.js') }}"></script>
	@yield('js')

</body>

</html>
