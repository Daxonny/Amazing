<h2>{{ $stations->name }}</h2>
<section id="stations">
    <ul class="stationList">
        @foreach ($stations->stations as $i)
		<a href="{{ route('player',['station'=>$i->slug]) }}">	
			<li>
			<img src="{{ $i->logo }}">
                <span>{{ $i->name }}</span>
			</li>
		</a>
        @endforeach
    </ul>
</section>
