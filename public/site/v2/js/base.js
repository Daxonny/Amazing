document.addEventListener("touchstart", function(e) { }, {passive: true});
document.addEventListener("touchmove", function(e) { }, {passive: true});
document.addEventListener("mousewheel", function(e) { }, {passive: true});
document.addEventListener("wheel", function(e) { }, {passive: true});



function socketConnect() {

	let socket = new WebSocket("ws://play.live.net.mk:8080");

	socket.onopen = function(e) {
		socket.send(JSON.stringify({
								'type':'chat'
							}));
	};

	socket.onmessage = function(event) {
		// alert(`[message] Data received from server: ${event.data}`);
		document.getElementById('ad1').innerHTML = event.data;
	};

	socket.onclose = function(event) {
		if (event.wasClean) {
			// alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
		} else {
			// e.g. server process killed or network down
			// event.code is usually 1006 in this case
			// alert('[close] Connection died');
		}
	};

	socket.onerror = function(error) {
		// alert(`[error] ${error.message}`);
	};

}

// window.onload = function() {

// 	setTimeout('socketConnect', 100);

// }


document.addEventListener('visibilitychange', socketConnect());