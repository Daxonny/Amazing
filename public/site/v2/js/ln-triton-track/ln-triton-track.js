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
        let thiz = this;
        this.xhr.onload = function() {
            //console.log(thiz.xhr);
            if (thiz.xhr.status >= 200 && thiz.xhr.status < 300) {
                //console.log("Zdravo");
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(thiz.xhr.responseText, "text/xml");
                //console.log(xmlDoc.querySelectorAll("[name='cue_title']")[0].childNodes[0].nodeValue);
                thiz.artist.innerText = xmlDoc.querySelectorAll("[name='track_artist_name']")[0].childNodes[0].nodeValue;
                thiz.track.innerText = xmlDoc.querySelectorAll("[name='cue_title']")[0].childNodes[0].nodeValue;

                setTimeout(function() { _tritonTrack.call(thiz) }, thiz.interval);

            } else {}
        };
        _tritonTrack.call(this);
    }

    function _handleParam() {
        this.mountName = this.dom.getAttribute(DOM_SELECTOR);
        this.interval = +this.dom.getAttribute(DOM_SELECTOR + "-interval") * 1000;
    }

    function _tritonTrack() {
        this.xhr.open('GET', "https://np.tritondigital.com/public/nowplaying?mountName=" + this.mountName + "&numberToFetch=1&eventType=track");
        this.xhr.send();
    }

    // make globaly avaliable
    window[DOM_ATTRIBUTE] = constructor;
    // Ads an obfuscate method to lnObfuscate
    // window[DOM_ATTRIBUTE].tritonTrack = tritonTrack;
})();

window.lnTritonTrack(document.body);