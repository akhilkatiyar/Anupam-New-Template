// js/custom-menu.js
// Small script to manage open/close with delay and mobile toggle.
// Include this BEFORE closing </body> and AFTER your other scripts.

(function () {
    const cols = Array.from(document.querySelectorAll('.sb-menu .row > .col-lg-3'));
    if (!cols.length) return;
    const CLOSE_DELAY = 200; // ms
    let timers = new WeakMap();
  
    function clearTimer(col) {
      const t = timers.get(col);
      if (t) { clearTimeout(t); timers.delete(col); }
    }
  
    function openCol(col) {
      // close others
      cols.forEach(c => { if (c !== col) c.classList.remove('open'); });
      clearTimer(col);
      col.classList.add('open');
    }
  
    function scheduleClose(col) {
      clearTimer(col);
      const t = setTimeout(() => {
        col.classList.remove('open');
        timers.delete(col);
      }, CLOSE_DELAY);
      timers.set(col, t);
    }
  
    cols.forEach(col => {
      const header = col.querySelector('h4');
      const panel = col.querySelector('ul.no-bg');
  
      // open on mouseenter
      col.addEventListener('mouseenter', () => openCol(col));
      // schedule close on leave
      col.addEventListener('mouseleave', () => scheduleClose(col));
  
      // cancel close when entering header/panel
      if (header) {
        header.addEventListener('mouseenter', () => clearTimer(col));
        header.addEventListener('mouseleave', () => scheduleClose(col));
        // mobile toggle on header click
        header.addEventListener('click', (e) => {
          if (window.innerWidth <= 767.98) {
            col.classList.toggle('open');
          }
        });
      }
      if (panel) {
        panel.addEventListener('mouseenter', () => clearTimer(col));
        panel.addEventListener('mouseleave', () => scheduleClose(col));
        // close when a link clicked (prevents staying open)
        panel.querySelectorAll('a').forEach(a => {
          a.addEventListener('click', () => cols.forEach(c => c.classList.remove('open')));
        });
      }
    });

    $(document).ready(function(){
        $("#room-carousel").owlCarousel({
            items: 3,                    // 3 items in view
            loop: true,                  // infinite loop
            margin: 20,                  // space between items
            autoplay: true,              // enable autoplay
            autoplayTimeout: 2000,       // 2 seconds delay
            autoplayHoverPause: true,    // pause on hover
            nav: false,                  // hide navigation buttons
            dots: false                  // hide dots
        });
    });

    
  
    // close everything when clicking outside
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.sb-menu')) {
        cols.forEach(c => c.classList.remove('open'));
      }
    });
  })();
  