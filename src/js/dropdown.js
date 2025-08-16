(function () {
  const GUTTER = 8; // px from viewport edge

  // helpers
  function child(el, tag) {
    try { const r = el.querySelector(`:scope > ${tag}`); if (r) return r; } catch(e){}
    for (const c of el.children) if (c.tagName === tag.toUpperCase()) return c;
    return null;
  }
  function directSub(li) { return child(li, 'ul'); }

  function closeRoot(dd) {
    dd.classList.remove('is-open', 'is-end');
    dd.querySelectorAll('li.is-sub-open, li.is-sub-flip').forEach(li => li.classList.remove('is-sub-open', 'is-sub-flip'));
  }

  // --- placement ------------------------------------------------------------
  function placeRoot(dd) {
    const menu = child(dd, 'ul');
    if (!menu) return;
    const r = menu.getBoundingClientRect();
    const vw = window.innerWidth;
    // flip root if it overflows to the right
    if (r.right > vw - GUTTER) dd.classList.add('is-end');
    else dd.classList.remove('is-end');
  }

  function placeSub(li) {
    const sub = directSub(li);
    if (!sub) return;
    const r = sub.getBoundingClientRect();
    const vw = window.innerWidth;
    // flip submenu if it overflows to the right
    if (r.right > vw - GUTTER) li.classList.add('is-sub-flip');
    else li.classList.remove('is-sub-flip');
  }

  // --- init one dropdown ----------------------------------------------------
  function initOne(dd) {
    const trigger = child(dd, 'button');
    const menu    = child(dd, 'ul');
    if (!trigger || !menu) return;

    // open/close root
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !dd.classList.contains('is-open');
      if (!willOpen) { closeRoot(dd); return; }
      dd.classList.add('is-open');
      // after it is visible, measure and possibly flip
      requestAnimationFrame(() => placeRoot(dd));
    });

    // clicks inside
    menu.addEventListener('click', (e) => {
      const li = e.target.closest('li');
      if (!li || !menu.contains(li) || li.hasAttribute('disabled')) return;

      const sub = directSub(li);
      if (sub) {
        e.stopPropagation();
        // toggle this submenu, close sibling submenus
        Array.from(li.parentElement.children).forEach(sib => {
          if (sib !== li) sib.classList.remove('is-sub-open', 'is-sub-flip');
        });
        li.classList.toggle('is-sub-open');
        if (li.classList.contains('is-sub-open')) {
          // ensure it's visible before measuring
          requestAnimationFrame(() => placeSub(li));
        }
        return;
      }
      // leaf → close all
      closeRoot(dd);
    });

    // outside / ESC
    document.addEventListener('click', (e) => { if (!dd.contains(e.target)) closeRoot(dd); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeRoot(dd); });

    // re-place on resize while open
    window.addEventListener('resize', () => { if (dd.classList.contains('is-open')) placeRoot(dd); });
  }

  function initAll(){ document.querySelectorAll('.pk-dropdown').forEach(initOne); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll); else initAll();

  // public API
  window.Panelkit = Object.assign(window.Panelkit || {}, { initDropdowns: initAll });
})();
