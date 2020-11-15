<<<<<<< HEAD
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@livenetworks/ln-obfuscator/ln-obfuscator.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@livenetworks/ln-obfuscator/ln-obfuscator.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Usage:
// Add the tag "ln-obfuscate" with the ROT number and all obfuscated HTML inside will be deobfuscated by the ROT amount

(function () {
  const DOM_SELECTOR = "ln-obfuscator";
  const DOM_ATTRIBUTE = "lnObfuscator";

  // if the component is already defined, return
  if (window[DOM_ATTRIBUTE] != undefined || window[DOM_ATTRIBUTE] != null) {
    return;
  }

  function constructor(domRoot) {
    _findElements(domRoot);
  }

  function _findElements(domRoot) {
    if(domRoot.TEXT_NODE && domRoot.childNodes.length == 0) {
      return;
    }
    let items =
      Array.from(domRoot.querySelectorAll("[" + DOM_SELECTOR + "]")) || [];

    if (domRoot.hasAttribute(DOM_SELECTOR)) {
      items.push(domRoot);
    }

    items.forEach(function (item) {
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
    let observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type == "childList") {
          mutation.addedNodes.forEach(function (item) {
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
    let obfuscationNum = _handleParam.call(this);
    this.dom.innerHTML = deObfuscate(obfuscationNum, this.dom.innerHTML);
  }

  // Retrieves the ROT number
  function _handleParam() {
    return Number(this.dom.getAttribute(DOM_SELECTOR));
  }

  // Obfuscate algorithm
  function obfuscate(obfuscationNum, sourceContent) {
    return sourceContent.replace(/[a-zA-Z]/g, function (c) {
      return String.fromCharCode(
        (c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + obfuscationNum)
          ? c
          : c - 26
      );
    });
  }
  // Deobfuscation algorithm
  function deObfuscate(obfuscationNum, sourceContent) {
    let result = "";
    obfuscationNum = (26 - obfuscationNum) % 26;
    result = obfuscate(obfuscationNum, sourceContent);
    return result;
  }

  // make lnObfuscate globaly avaliable
  window[DOM_ATTRIBUTE] = constructor;
  // Ads an obfuscate method to lnObfuscate
  window[DOM_ATTRIBUTE].obfuscate = obfuscate;
})();

window.lnObfuscator(document.body);


/***/ }),

/***/ "./node_modules/@livenetworks/player/lnPlayer.js":
/*!*******************************************************!*\
  !*** ./node_modules/@livenetworks/player/lnPlayer.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Usage:
{/* <TAG1 ln-player>
        
            <TAG2>
                <button ln-player-action="mute" type="button">mute</button>
                <button ln-player-action="unmute" type="button">unmute</button>

                <input name="range" type="range" min="0" max="100" ln-player-volume value="50">
            </TAG2>
      
        <button ln-player-action="play" type="button">play</button>
        <button ln-player-action="pause" type="button">pause</button>
        <audio controls autoplay>
            <source src="https://15913.live.streamtheworld.com/AMAZING_80S_S01.mp3" />
        </audio>
    </TAG1> */}

(function () {
	const DOM_SELECTOR = "ln-player";
	const DOM_ATTRIBUTE = "lnPlayer";

	const events = {
		mute: {},
		unmute: {},
		play: {},
		stop: {},
		onScrollUpWhenMuted: {},
		volumeAboveHalf: {},
		volumeBelowHalf: {},
		volumeMuted: {},
	};

	// if lnDialog is already defined, return
	if (window.lnPlayer != undefined || window.lnPlayer != null) {
		return;
	}

	// This function is called first which instantiates the whole logic.
	function constructor(domRoot) {
		// this._event = null
		_findElements(domRoot);
	}

	// Finds all elements within 'domRoot' with 'DOM_SELECTOR' attribute and creates a new instance of the '_constructor' object
	function _findElements(domRoot) {
		let items = Array.from(domRoot.querySelectorAll(`[${DOM_SELECTOR}]`));
		if (domRoot.hasAttribute(DOM_SELECTOR)) {
			items.push(domRoot);
		}

		items.forEach(function (item) {
			if (!item[DOM_ATTRIBUTE]) {
				item[DOM_ATTRIBUTE] = new _constructor(item);
			}
		});
	}

	// Creates a new instance of this object with individual 'initiation', 'observer' for attribute changes, options and sets listeners
	function _constructor(dom) {
		this.dom = dom;
		// capture 'this'
		let thiz = this;

		_init.call(thiz);

		_setObserver.call(thiz);

		_getOptions.call(thiz);

		_setListeners.call(thiz);

		return thiz;
	}

	//Instantiates and saves the instanceName, audio element, volume, '_eventDetaild' on the 'this' object;
	function _init() {
		// If multiple players on page/domain, get intance name in order to use it in local storage
		this.instanceName = this.dom.getAttribute("ln-player") || "main";

		this.audio = this.dom.getElementsByTagName("audio")[0];

		this.ls = {};
		this.ls.volume = this.instanceName + ".volume";

		this._eventDetails = {
			player: this.instanceName,
		};

		return this;
	}

	//Listenes to attribute changes
	function _setObserver() {
		let thiz = this;
		var observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				if (mutation.type == "attributes") {
					_getOptions.apply(thiz);
				}
			});
		});

		observer.observe(this.dom, {
			attributes: true, //configure it to listen to attribute changes
		});
	}
	// Listenes to DOM changes in case an element is added with desired attribute name
	function _domObserver() {
		let observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				if (mutation.type == "childList") {
					mutation.addedNodes.forEach(function (item) {
						if (item.nodeType !== item.TEXT_NODE) {
							_findElements(item);
						}
					});
				}
			});
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}

	_domObserver();

	//Sets listeners  for buttons, volume slider, wheel
	function _setListeners() {
		var thiz = this;
		// add event listeners for actions

		this.btn = this.dom.querySelectorAll("[ln-player-action]");
		this.btn.forEach(function (button) {

			button.addEventListener("click", function () {
				let action = button.getAttribute("ln-player-action");
				dispatchEvent.call(this, action);
				thiz[action].call(thiz, this);
			});
		});

		this.volumeSlider = this.dom.querySelectorAll("[ln-player-volume]")[0];
		this.volumeSlider.addEventListener("input", function () {
			thiz.setVolume(this.value / 100);
		});
		this.volumeSlider.addEventListener("volumechange", (e) => {
			console.log(e);
		})
		this.setVolume(localStorage.getItem(this.ls.volume) || 0.2);

		this.volumeControll = this.dom.addEventListener("wheel", function (x) {
			x.preventDefault();
			x.stopPropagation();
			x.stopImmediatePropagation();
			if (x.deltaY < 0) {
				if (
					thiz.audio.muted

				) {
					thiz.audio.muted = true;
				}
				thiz.setVolume(thiz.audio.volume + 0.05);
			} else {
				thiz.setVolume(thiz.audio.volume - 0.05);
			}
		});
	}

	// Sets options
	function _getOptions() {
		this.options = {};
		_init.apply(this);
	}

	// play function for element with 'ln-player-action' attribute
	function play() {
		this.audio.play();
	}

	function pause() {
		this.audio.pause();
	}

	// play function for element with 'ln-player-action' attribute
	function stop() {
		this.audio.pause();
	}

	// play function for element with 'ln-player-action' attribute

	function mute() {
		this.audio.muted = true;
		this.setVolume(0);
	}

	// play function for element with 'ln-player-action' attribute
	function unmute() {
		this.audio.muted = false;
		this.setVolume(localStorage.getItem(this.ls.volume));
	}

	// Volume setter based on events
	function setVolume(value) {
		const button =
			document.querySelector("[ln-player-action=mute]") ||
			document.querySelector("[ln-player-action=unmute]");
		// When scroller value goes below 0 debugger starts because it's out of bounds and stops program execution
		if (value <= 0) {
			this.audio.volume = 0;
			this.volumeSlider.value = 0;
			dispatchEvent.call(button, "volumeMuted");

			// When scroller value goes above 100 debugger starts because it's out of bounds and stops program execution
		} else if (value >= 1) {
			this.audio.volume = 1;
			this.volumeSlider.value = 100;
			// Normal execution
		} else {
			this.audio.volume = value;
			this.volumeSlider.value = value * 100;

			if (this.volumeSlider.value < 50) {
				dispatchEvent.call(button, "volumeBelowHalf");
			}
			if (this.volumeSlider.value > 50) {
				dispatchEvent.call(button, "volumeAboveHalf");
			}
			localStorage.setItem(this.ls.volume, value);
		}
	}

	function dispatchEvent(eventName) {
		let detail = {};

		detail[eventName] = events[eventName];

		let ev = new CustomEvent(eventName, {
			bubbles: true,
			detail,
		});
		this.dispatchEvent(ev);
	}

	// https://stackoverflow.com/questions/5999998/check-if-a-variable-is-of-function-type
	function isFunction(functionToCheck) {
		return (
			functionToCheck &&
			{}.toString.call(functionToCheck) === "[object Function]"
		);
	}

	// make lnScroller globaly avaliable
	window[DOM_ATTRIBUTE] = constructor;
	_constructor.prototype.play = play;
	_constructor.prototype.pause = pause;
	_constructor.prototype.stop = stop;
	_constructor.prototype.mute = mute;
	_constructor.prototype.unmute = unmute;
	_constructor.prototype.setVolume = setVolume;
})();
// Activates the 'constructor' function on the body of the document
window.lnPlayer(document.body);


/***/ }),

/***/ "./node_modules/@livenetworks/popup/ln-popup.js":
/*!******************************************************!*\
  !*** ./node_modules/@livenetworks/popup/ln-popup.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Usage:
//<a href="#"
//	ln-popup="POPUPOPTIONS"
//	ln-popup-center="true" //optional
//>
// POPUPOPTIONS = "width=300,height=300,scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no"
// (https://javascript.info/popup-windows)

(function(){ 
	const DOM_SELECTOR = 'ln-popup';
	const DOM_ATTRIBUTE = 'lnPopup';

	// if the component is already defined, return
	if (window[DOM_ATTRIBUTE] != undefined || window[DOM_ATTRIBUTE] != null) {
		return;
	}

	function constructor(domRoot) {
		_findElements(domRoot);
	}

	function _findElements(domRoot) {
		let items = domRoot.querySelectorAll('[' + DOM_SELECTOR + ']') || [];

		console.log(domRoot.querySelectorAll('[' + DOM_SELECTOR + ']'));

		if (domRoot.hasAttribute(DOM_SELECTOR)) {
			items.push(domRoot);
		}

		items.forEach(function(item) {
			if (!item[DOM_ATTRIBUTE]) {
				item[DOM_ATTRIBUTE] = new _constructor(item);
			}
		})
	}

	function _constructor(dom) {
		this.dom = dom;
		_init.call(this);
		return this;
	}

	function _domObserver() {
		let observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (mutation.type == 'childList') {
					console.log(mutation.addedNodes);
					mutation.addedNodes.forEach(function(item) {
						_findElements(item);
					})
				}
			});
		});

		observer.observe(document.body, {
			childList: true
		});
	}

	_domObserver();


	// function _setObserver() {
	// 	let thiz = this;
	// 	// http://help.dottoro.com/ljdchxcl.php
	// 	// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Mutation_events

	// 	var observer = new MutationObserver(function(mutations) {
	// 		mutations.forEach(function(mutation) {
	// 			if (mutation.type == "attributes") {
	// 				console.log(mutation);
	// 				_getOptions.call(thiz, mutation);
	// 			}
	// 		});
	// 	});

	// 	observer.observe(this.dom, {
	// 		attributes: true //configure it to listen to attribute changes
	// 	});
	// }

	
	// Edit Below

	let _target = null;

	function _init() {
		this.dom.onclick = function(event) {
			event = event || window.event;
			event.preventDefault();
			
			_target = event.target;

			window.open(_target.href, _target.target, _handleParams.call(this));
			_target = null;
			return false;
		};
		return this;
	}

	function _handleParams() {
		if (!_shouldCenter.call(this)) {
			return _target.getAttribute('ln-popup');
		}

		options = _parseParams.call(this);

		options.left = Math.round((screen.width - options.width) / 2);
		options.top = Math.round((screen.height - options.height) / 2);

		return _joinToString(options)
	}

	function _shouldCenter() {
		return (_target.getAttribute('ln-popup-center') == "true" ? true : false);
	}
	function _parseParams() {
		let options = {};

		_target.getAttribute('ln-popup').split(',').forEach(function(item) {
			const values = item.split('=');
			options[values[0]] = values[1];
		})
		return options;
	}
	function _joinToString(options) {
		result = [];
		for(let item in options) {
			result.push(item + '=' + options[item]);
		}
		return result.join(',');
	}

	// make lnPopup globaly avaliable
	window[DOM_ATTRIBUTE] = constructor;
})();

window.lnPopup(document.body);


/***/ }),

/***/ "./node_modules/lazysizes/lazysizes.js":
/*!*********************************************!*\
  !*** ./node_modules/lazysizes/lazysizes.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function(window, factory) {
	var lazySizes = factory(window, window.document, Date);
	window.lazySizes = lazySizes;
	if( true && module.exports){
		module.exports = lazySizes;
	}
}(typeof window != 'undefined' ?
      window : {}, function l(window, document, Date) { // Pass in the windoe Date function also for SSR because the Date class can be lost
	'use strict';
	/*jshint eqnull:true */

	var lazysizes, lazySizesCfg;

	(function(){
		var prop;

		var lazySizesDefaults = {
			lazyClass: 'lazyload',
			loadedClass: 'lazyloaded',
			loadingClass: 'lazyloading',
			preloadClass: 'lazypreload',
			errorClass: 'lazyerror',
			//strictClass: 'lazystrict',
			autosizesClass: 'lazyautosizes',
			srcAttr: 'data-src',
			srcsetAttr: 'data-srcset',
			sizesAttr: 'data-sizes',
			//preloadAfterLoad: false,
			minSize: 40,
			customMedia: {},
			init: true,
			expFactor: 1.5,
			hFac: 0.8,
			loadMode: 2,
			loadHidden: true,
			ricTimeout: 0,
			throttleDelay: 125,
		};

		lazySizesCfg = window.lazySizesConfig || window.lazysizesConfig || {};

		for(prop in lazySizesDefaults){
			if(!(prop in lazySizesCfg)){
				lazySizesCfg[prop] = lazySizesDefaults[prop];
			}
		}
	})();

	if (!document || !document.getElementsByClassName) {
		return {
			init: function () {},
			cfg: lazySizesCfg,
			noSupport: true,
		};
	}

	var docElem = document.documentElement;

	var supportPicture = window.HTMLPictureElement;

	var _addEventListener = 'addEventListener';

	var _getAttribute = 'getAttribute';

	/**
	 * Update to bind to window because 'this' becomes null during SSR
	 * builds.
	 */
	var addEventListener = window[_addEventListener].bind(window);

	var setTimeout = window.setTimeout;

	var requestAnimationFrame = window.requestAnimationFrame || setTimeout;

	var requestIdleCallback = window.requestIdleCallback;

	var regPicture = /^picture$/i;

	var loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];

	var regClassCache = {};

	var forEach = Array.prototype.forEach;

	var hasClass = function(ele, cls) {
		if(!regClassCache[cls]){
			regClassCache[cls] = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		}
		return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
	};

	var addClass = function(ele, cls) {
		if (!hasClass(ele, cls)){
			ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
		}
	};

	var removeClass = function(ele, cls) {
		var reg;
		if ((reg = hasClass(ele,cls))) {
			ele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));
		}
	};

	var addRemoveLoadEvents = function(dom, fn, add){
		var action = add ? _addEventListener : 'removeEventListener';
		if(add){
			addRemoveLoadEvents(dom, fn);
		}
		loadEvents.forEach(function(evt){
			dom[action](evt, fn);
		});
	};

	var triggerEvent = function(elem, name, detail, noBubbles, noCancelable){
		var event = document.createEvent('Event');

		if(!detail){
			detail = {};
		}

		detail.instance = lazysizes;

		event.initEvent(name, !noBubbles, !noCancelable);

		event.detail = detail;

		elem.dispatchEvent(event);
		return event;
	};

	var updatePolyfill = function (el, full){
		var polyfill;
		if( !supportPicture && ( polyfill = (window.picturefill || lazySizesCfg.pf) ) ){
			if(full && full.src && !el[_getAttribute]('srcset')){
				el.setAttribute('srcset', full.src);
			}
			polyfill({reevaluate: true, elements: [el]});
		} else if(full && full.src){
			el.src = full.src;
		}
	};

	var getCSS = function (elem, style){
		return (getComputedStyle(elem, null) || {})[style];
	};

	var getWidth = function(elem, parent, width){
		width = width || elem.offsetWidth;

		while(width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth){
			width =  parent.offsetWidth;
			parent = parent.parentNode;
		}

		return width;
	};

	var rAF = (function(){
		var running, waiting;
		var firstFns = [];
		var secondFns = [];
		var fns = firstFns;

		var run = function(){
			var runFns = fns;

			fns = firstFns.length ? secondFns : firstFns;

			running = true;
			waiting = false;

			while(runFns.length){
				runFns.shift()();
			}

			running = false;
		};

		var rafBatch = function(fn, queue){
			if(running && !queue){
				fn.apply(this, arguments);
			} else {
				fns.push(fn);

				if(!waiting){
					waiting = true;
					(document.hidden ? setTimeout : requestAnimationFrame)(run);
				}
			}
		};

		rafBatch._lsFlush = run;

		return rafBatch;
	})();

	var rAFIt = function(fn, simple){
		return simple ?
			function() {
				rAF(fn);
			} :
			function(){
				var that = this;
				var args = arguments;
				rAF(function(){
					fn.apply(that, args);
				});
			}
		;
	};

	var throttle = function(fn){
		var running;
		var lastTime = 0;
		var gDelay = lazySizesCfg.throttleDelay;
		var rICTimeout = lazySizesCfg.ricTimeout;
		var run = function(){
			running = false;
			lastTime = Date.now();
			fn();
		};
		var idleCallback = requestIdleCallback && rICTimeout > 49 ?
			function(){
				requestIdleCallback(run, {timeout: rICTimeout});

				if(rICTimeout !== lazySizesCfg.ricTimeout){
					rICTimeout = lazySizesCfg.ricTimeout;
				}
			} :
			rAFIt(function(){
				setTimeout(run);
			}, true)
		;

		return function(isPriority){
			var delay;

			if((isPriority = isPriority === true)){
				rICTimeout = 33;
			}

			if(running){
				return;
			}

			running =  true;

			delay = gDelay - (Date.now() - lastTime);

			if(delay < 0){
				delay = 0;
			}

			if(isPriority || delay < 9){
				idleCallback();
			} else {
				setTimeout(idleCallback, delay);
			}
		};
	};

	//based on http://modernjavascript.blogspot.de/2013/08/building-better-debounce.html
	var debounce = function(func) {
		var timeout, timestamp;
		var wait = 99;
		var run = function(){
			timeout = null;
			func();
		};
		var later = function() {
			var last = Date.now() - timestamp;

			if (last < wait) {
				setTimeout(later, wait - last);
			} else {
				(requestIdleCallback || run)(run);
			}
		};

		return function() {
			timestamp = Date.now();

			if (!timeout) {
				timeout = setTimeout(later, wait);
			}
		};
	};

	var loader = (function(){
		var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;

		var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;

		var regImg = /^img$/i;
		var regIframe = /^iframe$/i;

		var supportScroll = ('onscroll' in window) && !(/(gle|ing)bot/.test(navigator.userAgent));

		var shrinkExpand = 0;
		var currentExpand = 0;

		var isLoading = 0;
		var lowRuns = -1;

		var resetPreloading = function(e){
			isLoading--;
			if(!e || isLoading < 0 || !e.target){
				isLoading = 0;
			}
		};

		var isVisible = function (elem) {
			if (isBodyHidden == null) {
				isBodyHidden = getCSS(document.body, 'visibility') == 'hidden';
			}

			return isBodyHidden || !(getCSS(elem.parentNode, 'visibility') == 'hidden' && getCSS(elem, 'visibility') == 'hidden');
		};

		var isNestedVisible = function(elem, elemExpand){
			var outerRect;
			var parent = elem;
			var visible = isVisible(elem);

			eLtop -= elemExpand;
			eLbottom += elemExpand;
			eLleft -= elemExpand;
			eLright += elemExpand;

			while(visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem){
				visible = ((getCSS(parent, 'opacity') || 1) > 0);

				if(visible && getCSS(parent, 'overflow') != 'visible'){
					outerRect = parent.getBoundingClientRect();
					visible = eLright > outerRect.left &&
						eLleft < outerRect.right &&
						eLbottom > outerRect.top - 1 &&
						eLtop < outerRect.bottom + 1
					;
				}
			}

			return visible;
		};

		var checkElements = function() {
			var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal,
				beforeExpandVal, defaultExpand, preloadExpand, hFac;
			var lazyloadElems = lazysizes.elements;

			if((loadMode = lazySizesCfg.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)){

				i = 0;

				lowRuns++;

				for(; i < eLlen; i++){

					if(!lazyloadElems[i] || lazyloadElems[i]._lazyRace){continue;}

					if(!supportScroll || (lazysizes.prematureUnveil && lazysizes.prematureUnveil(lazyloadElems[i]))){unveilElement(lazyloadElems[i]);continue;}

					if(!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)){
						elemExpand = currentExpand;
					}

					if (!defaultExpand) {
						defaultExpand = (!lazySizesCfg.expand || lazySizesCfg.expand < 1) ?
							docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 :
							lazySizesCfg.expand;

						lazysizes._defEx = defaultExpand;

						preloadExpand = defaultExpand * lazySizesCfg.expFactor;
						hFac = lazySizesCfg.hFac;
						isBodyHidden = null;

						if(currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden){
							currentExpand = preloadExpand;
							lowRuns = 0;
						} else if(loadMode > 1 && lowRuns > 1 && isLoading < 6){
							currentExpand = defaultExpand;
						} else {
							currentExpand = shrinkExpand;
						}
					}

					if(beforeExpandVal !== elemExpand){
						eLvW = innerWidth + (elemExpand * hFac);
						elvH = innerHeight + elemExpand;
						elemNegativeExpand = elemExpand * -1;
						beforeExpandVal = elemExpand;
					}

					rect = lazyloadElems[i].getBoundingClientRect();

					if ((eLbottom = rect.bottom) >= elemNegativeExpand &&
						(eLtop = rect.top) <= elvH &&
						(eLright = rect.right) >= elemNegativeExpand * hFac &&
						(eLleft = rect.left) <= eLvW &&
						(eLbottom || eLright || eLleft || eLtop) &&
						(lazySizesCfg.loadHidden || isVisible(lazyloadElems[i])) &&
						((isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4)) || isNestedVisible(lazyloadElems[i], elemExpand))){
						unveilElement(lazyloadElems[i]);
						loadedSomething = true;
						if(isLoading > 9){break;}
					} else if(!loadedSomething && isCompleted && !autoLoadElem &&
						isLoading < 4 && lowRuns < 4 && loadMode > 2 &&
						(preloadElems[0] || lazySizesCfg.preloadAfterLoad) &&
						(preloadElems[0] || (!elemExpandVal && ((eLbottom || eLright || eLleft || eLtop) || lazyloadElems[i][_getAttribute](lazySizesCfg.sizesAttr) != 'auto')))){
						autoLoadElem = preloadElems[0] || lazyloadElems[i];
					}
				}

				if(autoLoadElem && !loadedSomething){
					unveilElement(autoLoadElem);
				}
			}
		};

		var throttledCheckElements = throttle(checkElements);

		var switchLoadingClass = function(e){
			var elem = e.target;

			if (elem._lazyCache) {
				delete elem._lazyCache;
				return;
			}

			resetPreloading(e);
			addClass(elem, lazySizesCfg.loadedClass);
			removeClass(elem, lazySizesCfg.loadingClass);
			addRemoveLoadEvents(elem, rafSwitchLoadingClass);
			triggerEvent(elem, 'lazyloaded');
		};
		var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
		var rafSwitchLoadingClass = function(e){
			rafedSwitchLoadingClass({target: e.target});
		};

		var changeIframeSrc = function(elem, src){
			try {
				elem.contentWindow.location.replace(src);
			} catch(e){
				elem.src = src;
			}
		};

		var handleSources = function(source){
			var customMedia;

			var sourceSrcset = source[_getAttribute](lazySizesCfg.srcsetAttr);

			if( (customMedia = lazySizesCfg.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')]) ){
				source.setAttribute('media', customMedia);
			}

			if(sourceSrcset){
				source.setAttribute('srcset', sourceSrcset);
			}
		};

		var lazyUnveil = rAFIt(function (elem, detail, isAuto, sizes, isImg){
			var src, srcset, parent, isPicture, event, firesLoad;

			if(!(event = triggerEvent(elem, 'lazybeforeunveil', detail)).defaultPrevented){

				if(sizes){
					if(isAuto){
						addClass(elem, lazySizesCfg.autosizesClass);
					} else {
						elem.setAttribute('sizes', sizes);
					}
				}

				srcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);
				src = elem[_getAttribute](lazySizesCfg.srcAttr);

				if(isImg) {
					parent = elem.parentNode;
					isPicture = parent && regPicture.test(parent.nodeName || '');
				}

				firesLoad = detail.firesLoad || (('src' in elem) && (srcset || src || isPicture));

				event = {target: elem};

				addClass(elem, lazySizesCfg.loadingClass);

				if(firesLoad){
					clearTimeout(resetPreloadingTimer);
					resetPreloadingTimer = setTimeout(resetPreloading, 2500);
					addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
				}

				if(isPicture){
					forEach.call(parent.getElementsByTagName('source'), handleSources);
				}

				if(srcset){
					elem.setAttribute('srcset', srcset);
				} else if(src && !isPicture){
					if(regIframe.test(elem.nodeName)){
						changeIframeSrc(elem, src);
					} else {
						elem.src = src;
					}
				}

				if(isImg && (srcset || isPicture)){
					updatePolyfill(elem, {src: src});
				}
			}

			if(elem._lazyRace){
				delete elem._lazyRace;
			}
			removeClass(elem, lazySizesCfg.lazyClass);

			rAF(function(){
				// Part of this can be removed as soon as this fix is older: https://bugs.chromium.org/p/chromium/issues/detail?id=7731 (2015)
				var isLoaded = elem.complete && elem.naturalWidth > 1;

				if( !firesLoad || isLoaded){
					if (isLoaded) {
						addClass(elem, 'ls-is-cached');
					}
					switchLoadingClass(event);
					elem._lazyCache = true;
					setTimeout(function(){
						if ('_lazyCache' in elem) {
							delete elem._lazyCache;
						}
					}, 9);
				}
				if (elem.loading == 'lazy') {
					isLoading--;
				}
			}, true);
		});

		var unveilElement = function (elem){
			if (elem._lazyRace) {return;}
			var detail;

			var isImg = regImg.test(elem.nodeName);

			//allow using sizes="auto", but don't use. it's invalid. Use data-sizes="auto" or a valid value for sizes instead (i.e.: sizes="80vw")
			var sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]('sizes'));
			var isAuto = sizes == 'auto';

			if( (isAuto || !isCompleted) && isImg && (elem[_getAttribute]('src') || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesCfg.errorClass) && hasClass(elem, lazySizesCfg.lazyClass)){return;}

			detail = triggerEvent(elem, 'lazyunveilread').detail;

			if(isAuto){
				 autoSizer.updateElem(elem, true, elem.offsetWidth);
			}

			elem._lazyRace = true;
			isLoading++;

			lazyUnveil(elem, detail, isAuto, sizes, isImg);
		};

		var afterScroll = debounce(function(){
			lazySizesCfg.loadMode = 3;
			throttledCheckElements();
		});

		var altLoadmodeScrollListner = function(){
			if(lazySizesCfg.loadMode == 3){
				lazySizesCfg.loadMode = 2;
			}
			afterScroll();
		};

		var onload = function(){
			if(isCompleted){return;}
			if(Date.now() - started < 999){
				setTimeout(onload, 999);
				return;
			}


			isCompleted = true;

			lazySizesCfg.loadMode = 3;

			throttledCheckElements();

			addEventListener('scroll', altLoadmodeScrollListner, true);
		};

		return {
			_: function(){
				started = Date.now();

				lazysizes.elements = document.getElementsByClassName(lazySizesCfg.lazyClass);
				preloadElems = document.getElementsByClassName(lazySizesCfg.lazyClass + ' ' + lazySizesCfg.preloadClass);

				addEventListener('scroll', throttledCheckElements, true);

				addEventListener('resize', throttledCheckElements, true);

				addEventListener('pageshow', function (e) {
					if (e.persisted) {
						var loadingElements = document.querySelectorAll('.' + lazySizesCfg.loadingClass);

						if (loadingElements.length && loadingElements.forEach) {
							requestAnimationFrame(function () {
								loadingElements.forEach( function (img) {
									if (img.complete) {
										unveilElement(img);
									}
								});
							});
						}
					}
				});

				if(window.MutationObserver){
					new MutationObserver( throttledCheckElements ).observe( docElem, {childList: true, subtree: true, attributes: true} );
				} else {
					docElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);
					docElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);
					setInterval(throttledCheckElements, 999);
				}

				addEventListener('hashchange', throttledCheckElements, true);

				//, 'fullscreenchange'
				['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend'].forEach(function(name){
					document[_addEventListener](name, throttledCheckElements, true);
				});

				if((/d$|^c/.test(document.readyState))){
					onload();
				} else {
					addEventListener('load', onload);
					document[_addEventListener]('DOMContentLoaded', throttledCheckElements);
					setTimeout(onload, 20000);
				}

				if(lazysizes.elements.length){
					checkElements();
					rAF._lsFlush();
				} else {
					throttledCheckElements();
				}
			},
			checkElems: throttledCheckElements,
			unveil: unveilElement,
			_aLSL: altLoadmodeScrollListner,
		};
	})();


	var autoSizer = (function(){
		var autosizesElems;

		var sizeElement = rAFIt(function(elem, parent, event, width){
			var sources, i, len;
			elem._lazysizesWidth = width;
			width += 'px';

			elem.setAttribute('sizes', width);

			if(regPicture.test(parent.nodeName || '')){
				sources = parent.getElementsByTagName('source');
				for(i = 0, len = sources.length; i < len; i++){
					sources[i].setAttribute('sizes', width);
				}
			}

			if(!event.detail.dataAttr){
				updatePolyfill(elem, event.detail);
			}
		});
		var getSizeElement = function (elem, dataAttr, width){
			var event;
			var parent = elem.parentNode;

			if(parent){
				width = getWidth(elem, parent, width);
				event = triggerEvent(elem, 'lazybeforesizes', {width: width, dataAttr: !!dataAttr});

				if(!event.defaultPrevented){
					width = event.detail.width;

					if(width && width !== elem._lazysizesWidth){
						sizeElement(elem, parent, event, width);
					}
				}
			}
		};

		var updateElementsSizes = function(){
			var i;
			var len = autosizesElems.length;
			if(len){
				i = 0;

				for(; i < len; i++){
					getSizeElement(autosizesElems[i]);
				}
			}
		};

		var debouncedUpdateElementsSizes = debounce(updateElementsSizes);

		return {
			_: function(){
				autosizesElems = document.getElementsByClassName(lazySizesCfg.autosizesClass);
				addEventListener('resize', debouncedUpdateElementsSizes);
			},
			checkElems: debouncedUpdateElementsSizes,
			updateElem: getSizeElement
		};
	})();

	var init = function(){
		if(!init.i && document.getElementsByClassName){
			init.i = true;
			autoSizer._();
			loader._();
		}
	};

	setTimeout(function(){
		if(lazySizesCfg.init){
			init();
		}
	});

	lazysizes = {
		cfg: lazySizesCfg,
		autoSizer: autoSizer,
		loader: loader,
		init: init,
		uP: updatePolyfill,
		aC: addClass,
		rC: removeClass,
		hC: hasClass,
		fire: triggerEvent,
		gW: getWidth,
		rAF: rAF,
	};

	return lazysizes;
}
));


/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! @livenetworks/popup */ "./node_modules/@livenetworks/popup/ln-popup.js");

__webpack_require__(/*! @livenetworks/ln-obfuscator */ "./node_modules/@livenetworks/ln-obfuscator/ln-obfuscator.js");

__webpack_require__(/*! @livenetworks/player */ "./node_modules/@livenetworks/player/lnPlayer.js");

__webpack_require__(/*! lazysizes */ "./node_modules/lazysizes/lazysizes.js");

/***/ }),

/***/ 0:
/*!***********************************!*\
  !*** multi ./resources/js/app.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/martina/PRAKSA/Amazing/resources/js/app.js */"./resources/js/app.js");


/***/ })

/******/ });
=======
!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=0)}({0:function(t,e,n){n("bUC5"),t.exports=n("9zbW")},"7MMj":function(t,e){!function(){if(null!=window.lnPopup||null!=window.lnPopup)return;function t(t){let n=t.querySelectorAll("[ln-popup]")||[];console.log(t.querySelectorAll("[ln-popup]")),t.hasAttribute("ln-popup")&&n.push(t),n.forEach((function(t){t.lnPopup||(t.lnPopup=new e(t))}))}function e(t){return this.dom=t,i.call(this),this}new MutationObserver((function(e){e.forEach((function(e){"childList"==e.type&&(console.log(e.addedNodes),e.addedNodes.forEach((function(e){t(e)})))}))})).observe(document.body,{childList:!0});let n=null;function i(){return this.dom.onclick=function(t){return(t=t||window.event).preventDefault(),n=t.target,window.open(n.href,n.target,o.call(this)),n=null,!1},this}function o(){return r.call(this)?(options=l.call(this),options.left=Math.round((screen.width-options.width)/2),options.top=Math.round((screen.height-options.height)/2),function(t){result=[];for(let e in t)result.push(e+"="+t[e]);return result.join(",")}(options)):n.getAttribute("ln-popup")}function r(){return"true"==n.getAttribute("ln-popup-center")}function l(){let t={};return n.getAttribute("ln-popup").split(",").forEach((function(e){const n=e.split("=");t[n[0]]=n[1]})),t}window.lnPopup=function(e){t(e)}}(),window.lnPopup(document.body)},"9zbW":function(t,e){!function(){function t(t){var n=Array.from(t.querySelectorAll("[ln-triton-track]"))||[];t.hasAttribute("ln-triton-track")&&n.push(t),n.forEach((function(t){t.lnTritonTrack||(t.lnTritonTrack=new e(t))}))}function e(t){return this.dom=t,n.call(this),this}function n(){var t=this;this.artist=this.dom.querySelectorAll('[property="byArtist"]')[0],this.track=this.dom.querySelectorAll('[property="name"]')[0],i.call(this),this.xhr=new XMLHttpRequest,this.cacheNow=new Date,this.xhr.onload=function(){t.xhr.status>=200&&t.xhr.status<300&&(parser=new DOMParser,xmlDoc=parser.parseFromString(t.xhr.responseText,"text/xml"),t.artist.innerText=xmlDoc.querySelectorAll("[name='track_artist_name']")[0].childNodes[0].nodeValue,t.track.innerText=xmlDoc.querySelectorAll("[name='cue_title']")[0].childNodes[0].nodeValue,t.artist.setAttribute("title","Artist: "+t.artist.innerText),t.track.setAttribute("title","Track: "+t.track.innerText),setTimeout((function(){o.call(t)}),t.interval))},o.call(this)}function i(){this.mountName=this.dom.getAttribute("ln-triton-track"),this.interval=1e3*+this.dom.getAttribute("ln-triton-track-interval")}function o(){this.xhr.open("GET","https://amazingradios.com/track/"+this.mountName),this.xhr.send()}null==window.lnTritonTrack&&null==window.lnTritonTrack&&(new MutationObserver((function(e){e.forEach((function(e){"childList"==e.type&&e.addedNodes.forEach((function(e){t(e)}))}))})).observe(document.body,{childList:!0}),window.lnTritonTrack=function(e){t(e)})}(),window.lnTritonTrack(document.body)},SfIF:function(t,e){!function(){function t(t){if(t.TEXT_NODE&&0==t.childNodes.length)return;let n=Array.from(t.querySelectorAll("[ln-obfuscator]"))||[];t.hasAttribute("ln-obfuscator")&&n.push(t),n.forEach((function(t){t.lnObfuscator||(t.lnObfuscator=new e(t))}))}function e(t){return this.dom=t,n.call(this),this}function n(){let t=i.call(this);this.dom.innerHTML=function(t,e){let n="";return n=o(t=(26-t)%26,e),n}(t,this.dom.innerHTML)}function i(){return Number(this.dom.getAttribute("ln-obfuscator"))}function o(t,e){return e.replace(/[a-zA-Z]/g,(function(e){return String.fromCharCode((e<="Z"?90:122)>=(e=e.charCodeAt(0)+t)?e:e-26)}))}null==window.lnObfuscator&&null==window.lnObfuscator&&(new MutationObserver((function(e){e.forEach((function(e){"childList"==e.type&&e.addedNodes.forEach((function(e){t(e)}))}))})).observe(document.body,{childList:!0}),window.lnObfuscator=function(e){t(e)},window.lnObfuscator.obfuscate=o)}(),window.lnObfuscator(document.body)},bUC5:function(t,e,n){n("7MMj"),n("SfIF"),n("vuLc"),n("s+lh")},"s+lh":function(t,e,n){!function(e,n){var i=function(t,e,n){"use strict";var i,o;if(function(){var e,n={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:0,throttleDelay:125};for(e in o=t.lazySizesConfig||t.lazysizesConfig||{},n)e in o||(o[e]=n[e])}(),!e||!e.getElementsByClassName)return{init:function(){},cfg:o,noSupport:!0};var r=e.documentElement,l=t.HTMLPictureElement,a=t.addEventListener.bind(t),u=t.setTimeout,s=t.requestAnimationFrame||u,c=t.requestIdleCallback,d=/^picture$/i,f=["load","error","lazyincluded","_lazyloaded"],h={},m=Array.prototype.forEach,p=function(t,e){return h[e]||(h[e]=new RegExp("(\\s|^)"+e+"(\\s|$)")),h[e].test(t.getAttribute("class")||"")&&h[e]},v=function(t,e){p(t,e)||t.setAttribute("class",(t.getAttribute("class")||"").trim()+" "+e)},y=function(t,e){var n;(n=p(t,e))&&t.setAttribute("class",(t.getAttribute("class")||"").replace(n," "))},b=function(t,e,n){var i=n?"addEventListener":"removeEventListener";n&&b(t,e),f.forEach((function(n){t[i](n,e)}))},g=function(t,n,o,r,l){var a=e.createEvent("Event");return o||(o={}),o.instance=i,a.initEvent(n,!r,!l),a.detail=o,t.dispatchEvent(a),a},w=function(e,n){var i;!l&&(i=t.picturefill||o.pf)?(n&&n.src&&!e.getAttribute("srcset")&&e.setAttribute("srcset",n.src),i({reevaluate:!0,elements:[e]})):n&&n.src&&(e.src=n.src)},A=function(t,e){return(getComputedStyle(t,null)||{})[e]},z=function(t,e,n){for(n=n||t.offsetWidth;n<o.minSize&&e&&!t._lazysizesWidth;)n=e.offsetWidth,e=e.parentNode;return n},E=(ht=[],mt=[],pt=ht,vt=function(){var t=pt;for(pt=ht.length?mt:ht,dt=!0,ft=!1;t.length;)t.shift()();dt=!1},yt=function(t,n){dt&&!n?t.apply(this,arguments):(pt.push(t),ft||(ft=!0,(e.hidden?u:s)(vt)))},yt._lsFlush=vt,yt),C=function(t,e){return e?function(){E(t)}:function(){var e=this,n=arguments;E((function(){t.apply(e,n)}))}},S=function(t){var e,i,o=function(){e=null,t()},r=function(){var t=n.now()-i;t<99?u(r,99-t):(c||o)(o)};return function(){i=n.now(),e||(e=u(r,99))}},T=(U=/^img$/i,$=/^iframe$/i,X="onscroll"in t&&!/(gle|ing)bot/.test(navigator.userAgent),Z=0,G=0,Y=-1,J=function(t){G--,(!t||G<0||!t.target)&&(G=0)},K=function(t){return null==V&&(V="hidden"==A(e.body,"visibility")),V||!("hidden"==A(t.parentNode,"visibility")&&"hidden"==A(t,"visibility"))},Q=function(t,n){var i,o=t,l=K(t);for(F-=n,R+=n,j-=n,I+=n;l&&(o=o.offsetParent)&&o!=e.body&&o!=r;)(l=(A(o,"opacity")||1)>0)&&"visible"!=A(o,"overflow")&&(i=o.getBoundingClientRect(),l=I>i.left&&j<i.right&&R>i.top-1&&F<i.bottom+1);return l},tt=function(){var t,n,l,a,u,s,c,d,f,h,m,p,v=i.elements;if((D=o.loadMode)&&G<8&&(t=v.length)){for(n=0,Y++;n<t;n++)if(v[n]&&!v[n]._lazyRace)if(!X||i.prematureUnveil&&i.prematureUnveil(v[n]))at(v[n]);else if((d=v[n].getAttribute("data-expand"))&&(s=1*d)||(s=Z),h||(h=!o.expand||o.expand<1?r.clientHeight>500&&r.clientWidth>500?500:370:o.expand,i._defEx=h,m=h*o.expFactor,p=o.hFac,V=null,Z<m&&G<1&&Y>2&&D>2&&!e.hidden?(Z=m,Y=0):Z=D>1&&Y>1&&G<6?h:0),f!==s&&(B=innerWidth+s*p,H=innerHeight+s,c=-1*s,f=s),l=v[n].getBoundingClientRect(),(R=l.bottom)>=c&&(F=l.top)<=H&&(I=l.right)>=c*p&&(j=l.left)<=B&&(R||I||j||F)&&(o.loadHidden||K(v[n]))&&(k&&G<3&&!d&&(D<3||Y<4)||Q(v[n],s))){if(at(v[n]),u=!0,G>9)break}else!u&&k&&!a&&G<4&&Y<4&&D>2&&(P[0]||o.preloadAfterLoad)&&(P[0]||!d&&(R||I||j||F||"auto"!=v[n].getAttribute(o.sizesAttr)))&&(a=P[0]||v[n]);a&&!u&&at(a)}},et=function(t){var e,i=0,r=o.throttleDelay,l=o.ricTimeout,a=function(){e=!1,i=n.now(),t()},s=c&&l>49?function(){c(a,{timeout:l}),l!==o.ricTimeout&&(l=o.ricTimeout)}:C((function(){u(a)}),!0);return function(t){var o;(t=!0===t)&&(l=33),e||(e=!0,(o=r-(n.now()-i))<0&&(o=0),t||o<9?s():u(s,o))}}(tt),nt=function(t){var e=t.target;e._lazyCache?delete e._lazyCache:(J(t),v(e,o.loadedClass),y(e,o.loadingClass),b(e,ot),g(e,"lazyloaded"))},it=C(nt),ot=function(t){it({target:t.target})},rt=function(t){var e,n=t.getAttribute(o.srcsetAttr);(e=o.customMedia[t.getAttribute("data-media")||t.getAttribute("media")])&&t.setAttribute("media",e),n&&t.setAttribute("srcset",n)},lt=C((function(t,e,n,i,r){var l,a,s,c,f,h;(f=g(t,"lazybeforeunveil",e)).defaultPrevented||(i&&(n?v(t,o.autosizesClass):t.setAttribute("sizes",i)),a=t.getAttribute(o.srcsetAttr),l=t.getAttribute(o.srcAttr),r&&(c=(s=t.parentNode)&&d.test(s.nodeName||"")),h=e.firesLoad||"src"in t&&(a||l||c),f={target:t},v(t,o.loadingClass),h&&(clearTimeout(q),q=u(J,2500),b(t,ot,!0)),c&&m.call(s.getElementsByTagName("source"),rt),a?t.setAttribute("srcset",a):l&&!c&&($.test(t.nodeName)?function(t,e){try{t.contentWindow.location.replace(e)}catch(n){t.src=e}}(t,l):t.src=l),r&&(a||c)&&w(t,{src:l})),t._lazyRace&&delete t._lazyRace,y(t,o.lazyClass),E((function(){var e=t.complete&&t.naturalWidth>1;h&&!e||(e&&v(t,"ls-is-cached"),nt(f),t._lazyCache=!0,u((function(){"_lazyCache"in t&&delete t._lazyCache}),9)),"lazy"==t.loading&&G--}),!0)})),at=function(t){if(!t._lazyRace){var e,n=U.test(t.nodeName),i=n&&(t.getAttribute(o.sizesAttr)||t.getAttribute("sizes")),r="auto"==i;(!r&&k||!n||!t.getAttribute("src")&&!t.srcset||t.complete||p(t,o.errorClass)||!p(t,o.lazyClass))&&(e=g(t,"lazyunveilread").detail,r&&M.updateElem(t,!0,t.offsetWidth),t._lazyRace=!0,G++,lt(t,e,r,i,n))}},ut=S((function(){o.loadMode=3,et()})),st=function(){3==o.loadMode&&(o.loadMode=2),ut()},ct=function(){k||(n.now()-W<999?u(ct,999):(k=!0,o.loadMode=3,et(),a("scroll",st,!0)))},{_:function(){W=n.now(),i.elements=e.getElementsByClassName(o.lazyClass),P=e.getElementsByClassName(o.lazyClass+" "+o.preloadClass),a("scroll",et,!0),a("resize",et,!0),a("pageshow",(function(t){if(t.persisted){var n=e.querySelectorAll("."+o.loadingClass);n.length&&n.forEach&&s((function(){n.forEach((function(t){t.complete&&at(t)}))}))}})),t.MutationObserver?new MutationObserver(et).observe(r,{childList:!0,subtree:!0,attributes:!0}):(r.addEventListener("DOMNodeInserted",et,!0),r.addEventListener("DOMAttrModified",et,!0),setInterval(et,999)),a("hashchange",et,!0),["focus","mouseover","click","load","transitionend","animationend"].forEach((function(t){e.addEventListener(t,et,!0)})),/d$|^c/.test(e.readyState)?ct():(a("load",ct),e.addEventListener("DOMContentLoaded",et),u(ct,2e4)),i.elements.length?(tt(),E._lsFlush()):et()},checkElems:et,unveil:at,_aLSL:st}),M=(_=C((function(t,e,n,i){var o,r,l;if(t._lazysizesWidth=i,i+="px",t.setAttribute("sizes",i),d.test(e.nodeName||""))for(r=0,l=(o=e.getElementsByTagName("source")).length;r<l;r++)o[r].setAttribute("sizes",i);n.detail.dataAttr||w(t,n.detail)})),L=function(t,e,n){var i,o=t.parentNode;o&&(n=z(t,o,n),(i=g(t,"lazybeforesizes",{width:n,dataAttr:!!e})).defaultPrevented||(n=i.detail.width)&&n!==t._lazysizesWidth&&_(t,o,i,n))},O=S((function(){var t,e=N.length;if(e)for(t=0;t<e;t++)L(N[t])})),{_:function(){N=e.getElementsByClassName(o.autosizesClass),a("resize",O)},checkElems:O,updateElem:L}),x=function(){!x.i&&e.getElementsByClassName&&(x.i=!0,M._(),T._())};var N,_,L,O;var P,k,q,D,W,B,H,F,j,I,R,V,U,$,X,Z,G,Y,J,K,Q,tt,et,nt,it,ot,rt,lt,at,ut,st,ct;var dt,ft,ht,mt,pt,vt,yt;return u((function(){o.init&&x()})),i={cfg:o,autoSizer:M,loader:T,init:x,uP:w,aC:v,rC:y,hC:p,fire:g,gW:z,rAF:E}}(e,e.document,Date);e.lazySizes=i,t.exports&&(t.exports=i)}("undefined"!=typeof window?window:{})},vuLc:function(t,e){!function(){const t={mute:{},unmute:{},play:{},stop:{},onScrollUpWhenMuted:{},volumeAboveHalf:{},volumeBelowHalf:{},volumeMuted:{}};function e(t){let e=Array.from(t.querySelectorAll("[ln-player]"));t.hasAttribute("ln-player")&&e.push(t),e.forEach((function(t){t.lnPlayer||(t.lnPlayer=new n(t))}))}function n(t){this.dom=t;return i.call(this),o.call(this),l.call(this),r.call(this),this}function i(){return this.instanceName=this.dom.getAttribute("ln-player")||"main",this.audio=this.dom.getElementsByTagName("audio")[0],this.ls={},this.ls.volume=this.instanceName+".volume",this._eventDetails={player:this.instanceName},this}function o(){let t=this;new MutationObserver((function(e){e.forEach((function(e){"attributes"==e.type&&l.apply(t)}))})).observe(this.dom,{attributes:!0})}function r(){var t=this;this.btn=this.dom.querySelectorAll("[ln-player-action]"),this.btn.forEach((function(e){e.addEventListener("click",(function(){let n=e.getAttribute("ln-player-action");a.call(this,n),t[n].call(t,this)}))})),this.volumeSlider=this.dom.querySelectorAll("[ln-player-volume]")[0],this.volumeSlider.addEventListener("input",(function(){t.setVolume(this.value/100)})),this.volumeSlider.addEventListener("volumechange",t=>{console.log(t)}),this.setVolume(localStorage.getItem(this.ls.volume)||.2),this.volumeControll=this.dom.addEventListener("wheel",(function(e){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),e.deltaY<0?(t.audio.muted&&(t.audio.muted=!0),t.setVolume(t.audio.volume+.05)):t.setVolume(t.audio.volume-.05)}))}function l(){this.options={},i.apply(this)}function a(e){let n={};n[e]=t[e];let i=new CustomEvent(e,{bubbles:!0,detail:n});this.dispatchEvent(i)}null==window.lnPlayer&&null==window.lnPlayer&&(new MutationObserver((function(t){t.forEach((function(t){"childList"==t.type&&t.addedNodes.forEach((function(t){t.nodeType!==t.TEXT_NODE&&e(t)}))}))})).observe(document.body,{childList:!0,subtree:!0}),window.lnPlayer=function(t){e(t)},n.prototype.play=function(){this.audio.play()},n.prototype.pause=function(){this.audio.pause()},n.prototype.stop=function(){this.audio.pause()},n.prototype.mute=function(){this.audio.muted=!0,this.setVolume(0)},n.prototype.unmute=function(){this.audio.muted=!1,this.setVolume(localStorage.getItem(this.ls.volume))},n.prototype.setVolume=function(t){const e=document.querySelector("[ln-player-action=mute]")||document.querySelector("[ln-player-action=unmute]");t<=0?(this.audio.volume=0,this.volumeSlider.value=0,a.call(e,"volumeMuted")):t>=1?(this.audio.volume=1,this.volumeSlider.value=100):(this.audio.volume=t,this.volumeSlider.value=100*t,this.volumeSlider.value<50&&a.call(e,"volumeBelowHalf"),this.volumeSlider.value>50&&a.call(e,"volumeAboveHalf"),localStorage.setItem(this.ls.volume,t))})}(),window.lnPlayer(document.body)}});
>>>>>>> e4360903ae7b17f9671e28d60f97e8d1ba0f94cc
