/* GP — boot. Runs before first paint, so it stays tiny and synchronous.
   - flags that JavaScript is available (progressive enhancement hooks);
   - on the language gate, sends returning visitors straight to their
     saved language unless they explicitly asked to choose again (?choose). */
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  if (!root.hasAttribute('data-gate')) return;
  try {
    var saved = window.localStorage.getItem('gp.lang');
    if ((saved === 'fr' || saved === 'en') && !/[?&]choose\b/.test(window.location.search)) {
      root.classList.add('is-redirecting');
      window.location.replace((root.getAttribute('data-base') || '') + '/' + saved + '/');
    }
  } catch (e) {
    /* storage unavailable: the gate stays visible and fully usable */
  }
})();
