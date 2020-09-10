<h2>{{ $datas->name }}</h2>
@foreach ($datas->stations as $i)
    <li>
        {{ $i->name }}
    </li>
@endforeach
