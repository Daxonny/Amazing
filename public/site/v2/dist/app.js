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

/***/ "./node_modules/ln-obfuscator/ln-obfuscator.js":
/*!*****************************************************!*\
  !*** ./node_modules/ln-obfuscator/ln-obfuscator.js ***!
  \*****************************************************/
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

/***/ "./node_modules/ln-popup/ln-popup.js":
/*!*******************************************!*\
  !*** ./node_modules/ln-popup/ln-popup.js ***!
  \*******************************************/
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

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ln-popup/ */ "./node_modules/ln-popup/ln-popup.js");

__webpack_require__(/*! ln-obfuscator/ */ "./node_modules/ln-obfuscator/ln-obfuscator.js");

/***/ }),

/***/ 0:
/*!***********************************!*\
  !*** multi ./resources/js/app.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/sojic/projects/liveNetworks/ar/Amazing/resources/js/app.js */"./resources/js/app.js");


/***/ })

/******/ });