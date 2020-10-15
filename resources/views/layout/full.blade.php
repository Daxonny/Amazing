<!DOCTYPE html>
<html lang="{{tongue()->current()}}" dir="{{tongue()->leftOrRight()}}">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">

	<link rel="dns-prefetch" href="https//cdn.amazingradios.com">
	<link rel="dns-prefetch" href="https//np.tritondigital.com">
	<link rel="dns-prefetch" href="https//playerservices.live.streamtheworld.com">

	<link rel="preconnect" href="https//cdn.amazingradios.com">
	<link rel="preconnect" href="https//np.tritondigital.com">
	<link rel="preconnect" href="https//playerservices.live.streamtheworld.com">

	<link rel="preload" href="{{ lnasset('/site/fonts/ln-icons/ln-icons.woff2') }}" as="font" type="font/woff2" crossorigin>

	<!-- CSRF Token -->
	<meta name="csrf-token" content="{{ csrf_token() }}">

	<title>@yield('title') &raquo; Amazing Radios</title>

	<link rel="preconnect" href="https://fonts.googleapis.com">
	
	<link rel="stylesheet" href="{{ lnasset('/site/v2/dist/css/mobile.css') }}" media="screen and (max-width: 701px)">
	<link rel="stylesheet" href="{{ lnasset('/site/v2/dist/css/tablet.css') }}" media="screen and (min-width: 701px and max-width: 1000px)">
	<link rel="stylesheet" href="{{ lnasset('/site/v2/dist/css/desktop.css') }}" media="screen and (min-width: 1000px)">

	<!-- Implement Accept image/webp -->
	<link rel="stylesheet" href="{{ lnasset('/site/v2/css/webp.min.css') }}" media="screen">


	<meta name="description" content="@yield('ogDescription')" />
	<meta name="robots" content="index,follow" />

	@include('layout.headerSnippets.fb')
	@include('layout.headerSnippets.icons')

</head>
<body id="index" vocab="http://schema.org/" class="">
	<div id="wrap">
		<header>
		<a href="{{ route('index')}}"><img src="{{ lnasset('logos/ar-logo.svg') }}" alt="Amazing Radios Logo" id="logo" /></a>

			<input type="checkbox" name="nav" id="nav">
			<label for="nav">menu</label>

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
				<img src="{{ lnasset('logos/ar-logo-white.svg') }}" alt="Amazing Radios Logo" id="logo" />
				<span>Copyright &copy; 2019 &middot;
					<a href="https://amazingradios.com">AMAZINGRADIOS.com</a>
				</span>
			</p>

		</footer>
	</div>

	<!-- <div id="player" ln-draggable></div> -->

	<!-- <script async type="text/javascript" src="{{ lnasset('/site/v2/js/ar.js') }}"></script> -->
	<script src="{{ lnasset('/site/v2/dist/app.js') }}" defer></script>


	<script async type="text/javascript" src="{{ lnasset('/site/v2/js/draggable/ln-draggable.js') }}"></script>
	<script async type="text/javascript" src="{{ lnasset(asset('/site/v2/js/player/player.js')) }}"></script>
	<script async type="text/javascript" src="{{ lnasset('/site/v2/js/obfuscator/ln-obfuscator.js') }}"></script>

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-180609245-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){
			dataLayer.push(arguments);
		}
		gtag('js', new Date()); gtag('config', 'UA-180609245-1');
	</script>

	@yield('js')

</body>
</html>