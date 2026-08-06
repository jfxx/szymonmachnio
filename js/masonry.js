/* ── masonry.js — Lightweight masonry layout engine ── */
(function () {
  "use strict";

  /**
   * Initialise masonry layout for a container.
   * Items are absolutely-positioned via translate3d (GPU-composited).
   * Layout recalculates automatically on every image load and on resize.
   *
   * @param {string} containerSel  CSS selector for the gallery container.
   * @param {string} itemSel       CSS selector for gallery items.
   * @returns {{ layout: Function } | null}
   */
  function initMasonry(containerSel, itemSel) {
    var container = document.querySelector(containerSel);
    if (!container) return null;

    var rafId = null;
    var resizeTimer = null;
    var GAP = 6; // px — kept in sync with CSS --masonry-gap

    function getColCount() {
      var w = container.clientWidth;
      if (w <= 480) return 1;
      if (w <= 768) return 2;
      if (w <= 1024) return 3;
      return 4;
    }

    function layout() {
      var items = container.querySelectorAll(itemSel);
      if (!items.length) return;

      var colCount = getColCount();

      /* Read container padding so items sit inside the content area */
      var cs = getComputedStyle(container);
      var padL = parseFloat(cs.paddingLeft) || 0;
      var padR = parseFloat(cs.paddingRight) || 0;
      var padT = parseFloat(cs.paddingTop) || 0;
      var padB = parseFloat(cs.paddingBottom) || 0;

      /* Available width = clientWidth minus horizontal padding */
      var contentW = container.clientWidth - padL - padR;
      var colWidth = (contentW - GAP * (colCount - 1)) / colCount;

      /* Column height tracker (relative to content top) */
      var colHeights = [];
      for (var c = 0; c < colCount; c++) colHeights.push(0);

      for (var i = 0; i < items.length; i++) {
        var item = items[i];

        /* Set width so the browser can compute height from image aspect ratio */
        item.style.width = colWidth + "px";
        var h = item.offsetHeight;

        /* Find the shortest column */
        var minH = colHeights[0];
        var minCol = 0;
        for (var j = 1; j < colCount; j++) {
          if (colHeights[j] < minH) {
            minH = colHeights[j];
            minCol = j;
          }
        }

        /* Offset by padding so items sit inside the content area */
        var x = padL + minCol * (colWidth + GAP);
        var y = padT + colHeights[minCol];

        /* Position via CSS custom props consumed by translate3d in CSS */
        item.style.setProperty("--m-x", x + "px");
        item.style.setProperty("--m-y", y + "px");

        colHeights[minCol] += h + GAP;
      }

      /* Tallest column content height */
      var maxH = colHeights[0];
      for (var k = 1; k < colCount; k++) {
        if (colHeights[k] > maxH) maxH = colHeights[k];
      }
      var contentH = maxH > GAP ? maxH - GAP : 0;

      /* With border-box the set height includes padding, so add it back
         so the next sibling (category-nav) flows below all items */
      container.style.height = (padT + contentH + padB) + "px";

      /* Reveal items after first layout pass */
      if (!container.classList.contains("masonry--ready")) {
        container.classList.add("masonry--ready");
      }
    }

    function requestLayout() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(layout);
    }

    /* ── Event delegation: relayout when any child image loads / errors ── */
    container.addEventListener("load", function (e) {
      if (e.target.tagName === "IMG") requestLayout();
    }, true);

    container.addEventListener("error", function (e) {
      if (e.target.tagName === "IMG") requestLayout();
    }, true);

    /* ── Debounced resize ── */
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(requestLayout, 80);
    });

    /* ── Initial layout ── */
    requestLayout();

    return { layout: requestLayout };
  }

  /* Expose globally */
  window.initMasonry = initMasonry;
})();
