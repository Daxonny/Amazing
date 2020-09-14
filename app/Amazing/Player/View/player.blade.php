@extends('layout.ln')

@section('content')

<h1>player</h1>

<audio autoplay controls>
<source src=" {{ $url }}" />
</audio>

@endsection