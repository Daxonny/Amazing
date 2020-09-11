<h2>{{ $stations->name }}</h2>
<section id="stations">
    <ul class="stationList">
        @foreach ($stations->stations as $i)
            <li>
			<img src="{{ $i->logo }}">
                {{ $i->name }}
            </li>
        @endforeach
    </ul>
</section>
