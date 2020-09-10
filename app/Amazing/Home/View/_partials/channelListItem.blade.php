<li id="{{ $channel->slug }}" class="" typeof="RadioStation">
	<h2>
		<a href="{{ route('station', $channel->slug) }}" ln-ajaxify-target="player">
			<img property="image" src="{{ lnimg($channel->logo . '-w180.png') }}"
			alt="{{ $channel->name }} Logo"
			title="{{ $channel->name }} Logo" />
			<span property="name">{{ $channel->name }}</span>
		</a>
	</h2>
	<p property="track" typeof="MusicRecording" data-label="Now Playing">
		<span property="byArtist">Billy Price & Fred Chapellier</span>
		<span property="name">My Love Comes Tumbling Down</span>
	</p>
	<button class="favourite">star</button>
</li>