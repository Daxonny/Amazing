@extends('layout.ln')
@section('content')
	<section id="contactUs">
		<form method="POST" action="{{ url('contactus/send') }}" id="contactForm">
			@csrf
			<div id="feName">
				<label for="name">{{ __('global.name') }}</label>
				<input type="text" id="name" name="name" placeholder="{{ __('global.name') }}" required>
				<p>{{ $errors->first('name') }}</p>
			</div>

			<div id="feEmail">
				<label for="email">{{ __('global.email') }}</label>
				<input type="text" id="email" name="email" placeholder="{{ __('global.email') }}" required>
				<p> {{ $errors->first('email') }}</p>
			</div>

			<div id="feMessage">
				<label for="message">{{ __('global.message') }}</label>
				<textarea id="text" name="text" placeholder="{{ __('global.writeSomething') }}" required></textarea>
				<p>{{ $errors->first('text') }}</p>
			</div>


			<input type="submit" value="{{ __('global.submit') }}">

			<!-- <input type="submit" value="Submit" class="g-recaptcha" 
			data-sitekey="reCAPTCHA_site_key" 
			data-callback='onSubmit' 
			data-action='submit'> -->
		  </form>
	</section>
@endsection

@section('js')

@endsection