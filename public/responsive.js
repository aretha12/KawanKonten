// KawanKonten responsive helpers: mobile nav drawer + chat list/conversation switching
document.addEventListener('DOMContentLoaded', function () {
  // ----- Mobile nav drawer (one per <nav>, also works for the multi-nav SPA page) -----
  document.querySelectorAll('.nav').forEach(function (nav) {
    var links = nav.querySelector('.nav-links');
    var inner = nav.querySelector('.nav-inner');
    if (!links || !inner) return;

    var drawer = document.createElement('div');
    drawer.className = 'nav-drawer';
    drawer.innerHTML = links.innerHTML; // keeps hrefs and inline onclick handlers

    var burger = document.createElement('button');
    burger.className = 'nav-burger';
    burger.setAttribute('aria-label', 'Menu');
    burger.innerHTML = '<span></span><span></span><span></span>';
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      nav.classList.toggle('open');
    });

    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) nav.classList.remove('open');
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) nav.classList.remove('open');
    });

    inner.appendChild(burger);
    nav.appendChild(drawer);
  });

  // ----- Chat: show list first, open conversation on tap, back button returns -----
  var layout = document.querySelector('.chat-layout');
  var threads = document.getElementById('thread-list');
  var header = document.querySelector('.chat-main-header');
  if (layout && threads) {
    threads.addEventListener('click', function (e) {
      if (e.target.closest('.chat-thread, [onclick]') || e.target !== threads) {
        layout.classList.add('chat-open');
      }
    });
    if (header) {
      var back = document.createElement('button');
      back.className = 'chat-back';
      back.setAttribute('aria-label', 'Back to conversations');
      back.innerHTML = '&#8592;';
      back.addEventListener('click', function () { layout.classList.remove('chat-open'); });
      header.insertBefore(back, header.firstChild);
    }
  }
});
