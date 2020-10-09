@extends('layout.ln')
@section('content')
	<section id="contactUs">
		<form action="/" method="POST">
			@csrf
			<label for="fname">First Name</label>
			<input type="text" id="fname" name="firstname" placeholder="Your name.">
		
			<label for="lname">Last Name</label>
			<input type="text" id="lname" name="lastname" placeholder="Your last name.">
		
			<label for="email">Email</label>
			<input type="text" id="email" name="email" placeholder="Your email address.">
		
			<label for="subject">Subject</label>
			<textarea id="subject" name="subject" placeholder="Write something.." style="height:200px"></textarea>
		
			<input type="submit" value="Submit" class="g-recaptcha" 
					data-sitekey="reCAPTCHA_site_key" 
					data-callback='onSubmit' 
					data-action='submit'>
		  </form>
	</section>
@endsection

@section('js')
	
@endsection