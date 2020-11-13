<li id="{{ $channel->slug }}" class="" typeof="RadioStation">
	<h2>
		<a href="{{ route('player', $channel->slug) }}" ln-ajaxify-target="player">
			<picture>
				<source media="(min-width: 768px)" data-srcset="{{ lnasset($channel->logo . '-w180.webp') }}" type="image/webp">
				<source media="(max-width: 767px)" data-srcset="{{ lnasset($channel->logo . '-w130.webp') }}" type="image/webp">
				<img 
					data-srcset="{{ lnasset($channel->logo . '-w360.png') }} 2x, {{ lnasset($channel->logo . '-w180.png') }} 1x"
					loading="lazy"
					class="lazyload" data-expand="100"
					alt="{{ $channel->name }} Logo"
					title="{{ $channel->name }} Logo">
				<noscript>
					<img src="{{ lnasset($channel->logo . '.png') }}"
						alt="{{ $channel->name }} Logo"
						property="image"
						title="{{ $channel->name }} Logo">
				</noscript>
			</picture>
			<span property="name">{{ $station->name }}</span>
		</a>
	</h2>

	<div class="nowPlaying" ln-triton-track="{{ $station->mountName }}" ln-triton-track-interval="10">
		<p property="track" typeof="MusicRecording" data-label="{{ __('global.nowPlaying') }}">
			<span property="byArtist"></span>
			<span property="name"></span>
		</p>
	</div>
	<button class="fav ln-icon" title="{{ __('Add to favourites') }}">star</button>
</li>