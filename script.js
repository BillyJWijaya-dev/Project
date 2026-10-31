/* puppet.js: sembilan tali dari ujung jari di logo (jesterL.png) ke sembilan kartu hero.
   Berdiri sendiri, tidak mengubah script.js. Dimuat sesudah script.js. */
(() => {
    // Koordinat ujung jari pada gambar jesterL.png (1254 x 1254 px), urut dari kiri ke kanan.
    // Jari kesepuluh (kelingking kanan, sekitar 1195,935) dibiarkan bebas.
    const FINGERTIPS = [[72, 925], [272, 948], [378, 890], [485, 738], [518, 872], [742, 890], [792, 748], [910, 922], [1010, 962]];
    const IMG_W = 1254, HAND_CROP = 80;   // HAND_CROP = bagian atas gambar yang dipotong lewat CSS (.pz img)

    const svg = document.getElementById("puppet"), pz = document.getElementById("pz"),
        hi = document.querySelector(".hero-in"), deal = document.getElementById("deal");
    if (!svg || !pz || !hi || !deal) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let items = null, visible = true, running = false;

    function build(animate) {
        const cards = [...deal.querySelectorAll(".dcard")].slice(0, FINGERTIPS.length);
        if (cards.length < FINGERTIPS.length) return;
        svg.classList.toggle("still", !animate);
        svg.innerHTML = cards.map(() => '<path class="str"/><circle class="tipdot" r="2.6"/><circle class="knot" r="2.6"/>').join("");
        items = cards.map((card, k) => ({ card, str: svg.children[k * 3], tip: svg.children[k * 3 + 1], knot: svg.children[k * 3 + 2] }));
        render(0);
        if (!reduced && !running) { running = true; requestAnimationFrame(tick); }
    }

    // Posisi dibaca langsung dari layar tiap frame, jadi tali selalu ikut kartu
    // (naik-turun, hover, saat dibagikan) dan tetap benar saat layar berubah ukuran.
    function render(t) {
        if (!items) return;
        const H = hi.getBoundingClientRect(), Z = pz.getBoundingClientRect(), sc = Z.width / IMG_W;
        svg.setAttribute("viewBox", `0 0 ${H.width} ${H.height}`);
        items.forEach((it, k) => {
            const r = it.card.getBoundingClientRect(), m = new DOMMatrixReadOnly(getComputedStyle(it.card).transform);
            const ang = Math.atan2(m.b, m.a), hh = it.card.offsetHeight / 2;
            const px = r.left + r.width / 2 - H.left + hh * Math.sin(ang), py = r.top + r.height / 2 - H.top - hh * Math.cos(ang);
            const tx = Z.left - H.left + FINGERTIPS[k][0] * sc, ty = Z.top - H.top + (FINGERTIPS[k][1] - HAND_CROP) * sc;
            const sx = Math.sin(t / 900 + k) * 1.4;
            it.str.setAttribute("d", `M${tx.toFixed(1)} ${ty.toFixed(1)}Q${((tx + px) / 2 + sx).toFixed(1)} ${((ty + py) / 2).toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)}`);
            it.tip.setAttribute("cx", tx.toFixed(1)); it.tip.setAttribute("cy", ty.toFixed(1));
            it.knot.setAttribute("cx", px.toFixed(1)); it.knot.setAttribute("cy", py.toFixed(1));
        });
    }
    function tick(t) { if (visible) render(t); requestAnimationFrame(tick); }

    new IntersectionObserver(([e]) => visible = e.isIntersecting).observe(document.getElementById("hero"));
    addEventListener("resize", () => render(0));

    // mulai setelah tirai terbuka (class "wait" di <body> dilepas)
    const body = document.body, start = delay => setTimeout(() => requestAnimationFrame(() => build(true)), delay);
    if (!body.classList.contains("wait")) start(800);
    else {
        const mo = new MutationObserver(() => { if (!body.classList.contains("wait")) { mo.disconnect(); start(600); } });
        mo.observe(body, { attributes: true, attributeFilter: ["class"] });
    }
})();
