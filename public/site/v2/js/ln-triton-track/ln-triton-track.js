(function() {
	const DOM_SELECTOR = "ln-triton-track";
	const DOM_ATTRIBUTE = "lnTritonTrack";

	// if the component is already defined, return
	if (window[DOM_ATTRIBUTE] != undefined || window[DOM_ATTRIBUTE] != null) {
		return;
	}

	function constructor(domRoot) {
		_findElements(domRoot);
	}

	function _findElements(domRoot) {
		let items =
			Array.from(domRoot.querySelectorAll("[" + DOM_SELECTOR + "]")) || [];

		if (domRoot.hasAttribute(DOM_SELECTOR)) {
			items.push(domRoot);
		}

		items.forEach(function(item) {
			if (!item[DOM_ATTRIBUTE]) {
				item[DOM_ATTRIBUTE] = new _constructor(item);
			}
		});
	}

	function _constructor(dom) {
		this.dom = dom;
		_init.call(this);
		return this;
	}

	// Listens for DOM changes
	function _domObserver() {
		let observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (mutation.type == "childList") {
					mutation.addedNodes.forEach(function(item) {
						_findElements(item);
					});
				}
			});
		});

		observer.observe(document.body, {
			childList: true,
		});
	}

	_domObserver();

	function _init() {
		this.artist = this.dom.querySelectorAll('[property="byArtist"]')[0];
		this.track = this.dom.querySelectorAll('[property="name"]')[0];

		_handleParam.call(this);

		this.xhr = new XMLHttpRequest();
		this.cacheNow = new Date();
		this.xhr.onload = () => {
			if (this.xhr.status >= 200 && this.xhr.status < 300) {
				parser = new DOMParser();
				xmlDoc = parser.parseFromString(this.xhr.responseText, "text/xml");
				this.artist.innerText = xmlDoc.querySelectorAll("[name='track_artist_name']")[0].childNodes[0].nodeValue;
				this.track.innerText = xmlDoc.querySelectorAll("[name='cue_title']")[0].childNodes[0].nodeValue;

				this.artist.setAttribute('title', 'Artist: ' + this.artist.innerText);
				this.track.setAttribute('title', 'Track: ' + this.track.innerText);

				setTimeout(() => { _tritonTrack.call(this) }, this.interval);

			} else {}
		};
		_tritonTrack.call(this);
	}

	function _handleParam() {
		this.mountName = this.dom.getAttribute(DOM_SELECTOR);
		this.interval = +this.dom.getAttribute(DOM_SELECTOR + "-interval") * 1000;
	}

	function _tritonTrack() {
		this.xhr.open('GET', "https://amazingradios.com/track/" + this.mountName);
		this.xhr.send();
	}

	// make globaly avaliable
	window[DOM_ATTRIBUTE] = constructor;
	// Ads an obfuscate method to lnObfuscate
	// window[DOM_ATTRIBUTE].tritonTrack = tritonTrack;
})();

window.lnTritonTrack(document.body);