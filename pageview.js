/**
 * Trigger page views
 * Scope       : Pre Loader
 * Occurrence  : n/a
 * Condition   : n/a
 * Description : Detect page views from browser history changes (via history.pushState())
 */

function tealPageView(selector, evt) {
  var observer = new MutationObserver(function (mutations, mo) {
    var el = document.querySelector(selector);
    if (el) {
      utag.view({ tealium_event: evt });
      mo.disconnect();
      return;
    }
  });
  observer.observe(document, {
    childList: true,
    subtree: true
  });
}

function tealTrack() {
  var url = document.location.pathname;
  if (/URL-REGEX/.test(url)) {
    tealPageView('QUERY-SELECTOR', 'TEALIUM-EVENT-NAME');
  } else if (/ANOTHER-URL-REGEX/.test(url)) {
    tealPageView('QUERY-SELECTOR', 'TEALIUM-EVENT-NAME');
  // add additional else ifs as needed
  } else {
    tealPageView('body', 'page_view');
  }
}

(function (history) {
  var pushState = history.pushState;
  history.pushState = function (state) {
    if (typeof history.onpushstate == 'function') {
      history.onpushstate({ state: state });
    }
    return pushState.apply(history, arguments);
  };
})(window.history);
window.onpopstate = history.onpushstate = function (e) {
  setTimeout(function () {
    tealTrack();
  }, 10);
};

function firstLoad() {
  if (!firstLoad.loaded){
    tealTrack();
    firstLoad.loaded = true;
  }
}
firstLoad();
