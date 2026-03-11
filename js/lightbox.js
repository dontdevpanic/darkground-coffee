// ══════════════════════════════════════════════
//  DARKGROUND COFFEE — lightbox.js
//  Vanilla JS lightbox — no dependencies
//  Features: prev/next, captions, swipe, keyboard
//
//  Usage:
//  data-lightbox-group="any-name" — grouped, with prev/next arrows
//                                   images with the same name navigate together
//  class="lightbox-solo"          — single image, no arrows
//
//  DevPanicZone
// ══════════════════════════════════════════════

(function () {

    // ── Build dialog element ──
    const dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.setAttribute("aria-label", "Image lightbox");
    dialog.innerHTML = `
        <button class="lightbox-close" aria-label="Close lightbox">&#x2715;</button>
        <button class="lightbox-prev" aria-label="Previous image">&#x2039;</button>
        <button class="lightbox-next" aria-label="Next image">&#x203A;</button>
        <figure class="lightbox-figure">
            <img class="lightbox-img" src="" alt="">
            <figcaption class="lightbox-caption"></figcaption>
        </figure>
    `;
    document.body.appendChild(dialog);

    const imgEl = dialog.querySelector(".lightbox-img");
    const caption = dialog.querySelector(".lightbox-caption");
    const btnClose = dialog.querySelector(".lightbox-close");
    const btnPrev = dialog.querySelector(".lightbox-prev");
    const btnNext = dialog.querySelector(".lightbox-next");

    let group = [];   // current active group of images
    let current = 0;    // current index within group
    let opener = null; // element that opened the lightbox (for focus return)

    // ── Make an image lightbox-ready ──
    function prepare(el, index, groupArr) {
        el.style.cursor = "zoom-in";
        el.setAttribute("tabindex", "0");
        el.setAttribute("role", "button");
        if (!el.getAttribute("aria-label")) {
            el.setAttribute("aria-label", el.alt || `Open image ${index + 1}`);
        }
        el.addEventListener("click", () => open(el, groupArr, index));
        el.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                open(el, groupArr, index);
            }
        });
    }

    // ── Collect all lightbox images ──
    function collectImages() {
        // Solo images — open individually, no arrows
        document.querySelectorAll(".lightbox-solo").forEach((el) => {
            if (el.closest(".is-clone")) return; // skip clones in endless loop
            prepare(el, 0, [el]);
        });

        // Grouped images — same group name navigates together
        const groupMap = {};
        document.querySelectorAll("[data-lightbox-group]").forEach((el) => {
            if (el.closest(".is-clone")) return; // skip clones in endless loop
            const name = el.dataset.lightboxGroup;
            if (!groupMap[name]) groupMap[name] = [];
            groupMap[name].push(el);
        });

        Object.values(groupMap).forEach((groupArr) => {
            groupArr.forEach((el, i) => prepare(el, i, groupArr));
        });
    }

    // ── Open lightbox ──
    function open(el, groupArr, index) {
        opener = el;
        group = groupArr;
        current = index;
        show(current);
        dialog.showModal();
    }

    // ── Show image at index ──
    function show(index) {
        const el = group[index];
        imgEl.src = el.src;
        imgEl.alt = el.alt || "";
        caption.textContent = el.alt || "";
        caption.hidden = !el.alt;

        // Only show arrows when group has more than one image
        const hasMultiple = group.length > 1;
        btnPrev.hidden = !hasMultiple;
        btnNext.hidden = !hasMultiple;
    }

    // ── Navigate ──
    function prev() {
        current = (current - 1 + group.length) % group.length;
        show(current);
    }

    function next() {
        current = (current + 1) % group.length;
        show(current);
    }

    // ── Close ──
    function close() {
        dialog.close();
        if (opener) opener.focus();
    }

    // ── Event listeners ──
    btnClose.addEventListener("click", close);
    btnPrev.addEventListener("click", prev);
    btnNext.addEventListener("click", next);

    // Click on backdrop closes lightbox
    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) close();
    });

    // Keyboard navigation
    dialog.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
        // ESC is handled natively by <dialog>
    });

    // ── Swipe (touch) ──
    let touchStartX = 0;

    dialog.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    dialog.addEventListener("touchend", (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? next() : prev();
        }
    }, { passive: true });

    // ── Init ──
    window.addEventListener("load", collectImages);

})();