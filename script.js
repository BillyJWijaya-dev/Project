// tahun kelompok dibentuk (tampil di baris angka hero)
const SINCE = 2026;

// anggota
const members = [
    {
        name: "Zen Auladi", role: "Sepuh",
        bio: "Bukan orang bener, tapi beneran orang.",
        langs: ["PYTHON", "PHP"],
        hobbies: ["Ngoding", "Mobil", "Musik"],
        photo: "assets/images/Zen.jpeg",
        card: { rank: "A", suit: "♠" },
        song: "assets/audio/zenxi.mp3", title: "Bintang 5", artist: "Tenxi"
    },
    {
        name: "Billy Jonas Wijaya", role: "Fineshyt",
        bio: "Aku bukan dipimpin, aku yang memimpin.",
        langs: ["HTML", "PYTHON", "SQL", "JAVASCRIPT"],
        hobbies: ["Game", "Menggambar", "Baca Buku", "Tidur", "Musik"],
        photo: "assets/images/billy.jpeg",
        card: { rank: "JK", suit: "★" },
        song: "assets/audio/billy.mp3", title: "Know me", artist: "GEMINI"
    },
    {
        name: "Pandu Satrio", role: "Master koding jir",
        bio: "Kejarlah cita-cita, jangan dia yang ngga cinta.",
        langs: ["HTML", "PYTHON"],
        hobbies: ["Ngoding", "Mobil"],
        photo: "assets/images/ndu.jpeg",
        card: { rank: "Q", suit: "♦" },
        song: "assets/audio/pandu.mp3", title: "Soulmate", artist: "Kahitna"
    },
    {
        name: "M. Naufal Ariadiansyah", role: "Ambasius",
        bio: "A lot has changed, but I'm still here.",
        langs: ["HTML", "PYTHON"],
        hobbies: ["Musik", "Game"],
        photo: "assets/images/naufal.jpeg",
        card: { rank: "J", suit: "♣" },
        song: "assets/audio/naufall.mp3", title: "Can't Take My Eyes Off You", artist: "Lula Band"
    },
    {
        name: "M. Faris Nur Rizqi", role: "Founding Father",
        bio: "Try To Be Better.",
        langs: ["PYTHON", "HTML"],
        hobbies: ["Game", "Musik"],
        photo: "assets/images/faris.jpeg",
        card: { rank: "10", suit: "♠" },
        song: "assets/audio/faris.mp3", title: "Whatever", artist: "Oasis"
    },
    {
        name: "Althafian Rizqullah Susilo", role: "Master Koding #2",
        bio: "Hidup itu sederhana, kita yang membuatnya rumit.",
        langs: ["HTML", "C", "PYTHON"],
        hobbies: ["Game", "Ngoding"],
        photo: "assets/images/althaf.jpeg",
        card: { rank: "9", suit: "♥" },
        song: "assets/audio/althaf.mp3", title: "Haruka", artist: "Yoasobi"
    },
    {
        name: "Muhamad Kiram Albara", role: "Tuan Rumah",
        bio: "Ga perlu kata-kata, yang penting aksi nyata.",
        langs: ["PYTHON"],
        hobbies: ["Gaming", "Futsal", "Gym"],
        photo: "assets/images/kiram.jpeg",
        card: { rank: "8", suit: "♦" },
        song: "assets/audio/kiram.mp3", title: "Mimpi Yang Sempurna", artist: "Peterpan"
    },
    {
        name: "Muhammad Nazmy Syarief", role: "Reminder Tugas",
        bio: "Build with intention, refined over time.",
        langs: ["PYTHON"],
        hobbies: ["Nugas", "Game", "Doom Scrolling", "Healing", "Photoshoot"],
        photo: "assets/images/nazmy.jpeg",
        card: { rank: "7", suit: "♣" },
        song: "assets/audio/nazmy.mp3", title: "Just Give Me A Reason ", artist: "Pink"
    },
    {
        name: "Syafi", role: "Lost Member",
        bio: "404",
        langs: ["PYTHON"],
        hobbies: ["404"],
        photo: "assets/images/JESTER.jpeg",
        card: { rank: "K", suit: "♥" },
        song: "songs/lagu9.mp3", title: "404", artist: "404"
    }
];

// Foto galeri awal
const galleryPhotos = [
    "assets/galeri/1.jpeg",
    "assets/galeri/2.jpeg",
    "assets/galeri/3.jpeg",
    "assets/galeri/4.jpeg",
    "assets/galeri/5.jpeg",
    "assets/galeri/6.jpeg",
    "assets/galeri/7.jpeg",
    "assets/galeri/8.jpeg",
    "assets/galeri/9.jpeg",
    "assets/galeri/10.jpeg",
    "assets/galeri/11.jpeg",
];
const LOGO = "assets/images/jesterT.jpeg";
/* ========================== */

const $ = id => document.getElementById(id);

// --- Hero: kartu dibagikan + poster ---
// Bahasa unik dihitung sekali, dipakai hero dan dinding skill
const skillMap = new Map();
members.forEach((m, i) => m.langs.forEach(l => {
    const k = l.trim().toLowerCase();
    if (!skillMap.has(k)) skillMap.set(k, { name: l.trim(), who: [] });
    skillMap.get(k).who.push(i);
}));

(() => {
    const n = members.length, suits = ["♠", "♥", "♦", "♣"];

    // --t: posisi dari tengah, --d: urutan dibagi (kartu paling atas duluan)
    $("deal").innerHTML = members.map((m, i) =>
        `<button class="dcard${"♥♦".includes(m.card.suit) ? " red" : ""}" data-i="${i}" style="--i:${i};--d:${n - 1 - i};--t:${(i - (n - 1) / 2).toFixed(1)}" aria-label="Lihat profil ${m.name}">` +
        `<span class="dflip"><span class="dfront"><img src="${m.photo}" alt="" onerror="this.onerror=null;this.src='${LOGO}'"><span class="hc">${m.card.rank}${m.card.suit}</span></span>` +
        `<span class="dback"><img src="${LOGO}" alt=""></span></span></button>`).join("");
    $("deal").onclick = e => { const b = e.target.closest(".dcard"); if (b) jumpTo(+b.dataset.i); };

    // pita berjalan: bahasa terbanyak dulu, diulang 3x lalu digandakan agar loop mulus
    const langs = [...skillMap.values()].sort((a, b) => b.who.length - a.who.length).map(s => s.name);
    const half = [...langs, ...langs, ...langs].map((l, k) => `<span>${l}<i>${suits[k % 4]}</i></span>`).join("");
    $("track").innerHTML = half + half;

    // angka otomatis dari data
    $("stats").innerHTML = `<span><b data-to="${n}">${n}</b><em>anggota</em></span><span><b data-to="${skillMap.size}">${skillMap.size}</b><em>bahasa</em></span><span><b>${SINCE}</b><em>sejak</em></span>`;
    // angka menghitung naik dari nol saat baris angka terlihat
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const nums = document.querySelectorAll("#stats b[data-to]");
        nums.forEach(b => b.textContent = 0);
        new IntersectionObserver(([e], o) => {
            if (!e.isIntersecting) return; o.disconnect();
            const t0 = performance.now();
            const tick = t => {
                const p = Math.min(1, (t - t0) / 1200);
                nums.forEach(b => b.textContent = Math.round(+b.dataset.to * (1 - Math.pow(1 - p, 3))));
                if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        }, { threshold: .6 }).observe($("stats"));
    }

    // SOLIDARITY dipas ke lebar layar
    const mark = $("mark");
    const fit = () => {
        mark.style.fontSize = "100px";
        mark.style.fontSize = 100 * mark.parentElement.clientWidth * .92 / mark.getBoundingClientRect().width + "px";
    };
    fit(); addEventListener("resize", fit);
    if (document.fonts) document.fonts.ready.then(fit);
})();

// --- Member slider ---
let cur = 0, unlocked = false;
const audio = $("audio"), playBtn = $("playBtn");

function paintCard(m, i) {
    const pc = $("pcard");
    pc.classList.toggle("red", "♥♦".includes(m.card.suit));
    pc.querySelectorAll(".rk").forEach(e => e.textContent = m.card.rank);
    pc.querySelectorAll(".st").forEach(e => e.textContent = m.card.suit);
    $("pmark").textContent = m.card.suit;
    $("pflip").classList.remove("on");
    pc.style.setProperty("--bs", ["solid", "double", "dashed", "dotted", "solid", "double", "dashed", "dotted", "solid"][i % 9]);
}
function spin() {
    $("pcard").animate([{ transform: "rotateY(0)" }, { transform: "rotateY(360deg)" }], { duration: 1000, easing: "ease-in-out" });
}
function render(auto) {
    const m = members[cur];
    $("card").classList.add("fade");
    setTimeout(() => {
        $("mName").textContent = m.name;
        $("mRole").textContent = m.role;
        $("mBio").textContent = m.bio;
        paintCard(m, cur);
        $("mPhoto").onerror = function () { this.onerror = null; this.src = LOGO; };
        $("mPhoto").src = m.photo; $("mPhoto").alt = m.name;
        $("mLang").innerHTML = m.langs.map(l => `<li>${l}</li>`).join("");
        $("mHobby").innerHTML = m.hobbies.map(l => `<li>${l}</li>`).join("");
        $("mSong").textContent = m.title; $("mArtist").textContent = m.artist;
        $("count").textContent = `${cur + 1} / ${members.length}`;
        document.querySelectorAll(".dots span").forEach((d, k) => d.classList.toggle("on", k === cur));
        document.querySelectorAll(".hcard").forEach((d, k) => d.classList.toggle("on", k === cur));
        $("card").classList.remove("fade");
    }, 200);
    if (auto) spin();
    audio.src = m.song;
    if (auto && unlocked) audio.play().catch(() => { }); else audio.pause();
}
function goTo(i, dir = 1, jump = false) {
    if (introRunning || i === cur) return;
    playIntro({ dir, jump, swap: () => { cur = i; render(false); } });
}
const go = d => goTo((cur + d + members.length) % members.length, d);

$("dots").innerHTML = members.map((_, k) => `<span data-i="${k}"></span>`).join("");
$("dots").onclick = e => { if (e.target.dataset.i) goTo(+e.target.dataset.i, +e.target.dataset.i > cur ? 1 : -1); };
$("prev").onclick = () => go(-1);
$("next").onclick = () => go(1);
document.addEventListener("keydown", e => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); });

document.addEventListener("click", () => {
    if (unlocked) return;
    unlocked = true; $("note").style.display = "none";
    if (!introRunning && (location.hash === "#people" || inView($("people")))) audio.play().catch(() => { });
}, { once: true });
const inView = el => { const r = el.getBoundingClientRect(); return r.top < innerHeight * .6 && r.bottom > innerHeight * .4; };

playBtn.onclick = () => audio.paused ? audio.play().catch(() => { }) : audio.pause();
audio.onplay = () => playBtn.textContent = "❚❚";
audio.onpause = () => playBtn.textContent = "▶";
new IntersectionObserver(([e]) => { if (!e.isIntersecting) audio.pause(); }, { threshold: .1 }).observe($("people"));
render(false);

// --- Intro logo ---
const SOUND_EVERY_CHANGE = true;
const intro = $("intro"), dock = $("dock"), snd = $("introSnd");
var introRunning = false;
function fadeOut(a) {
    const t = setInterval(() => { a.volume = Math.max(0, a.volume - .1); if (a.volume <= 0) { clearInterval(t); a.pause(); } }, 60);
}
function playIntro(opts = {}) {
    if (introRunning) return;
    const first = !opts.swap, jump = first || opts.jump, turn = 720 * (opts.dir || 1);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (opts.swap) { opts.swap(); spin(); }
        if (opts.jump) $("people").scrollIntoView({ behavior: "instant", block: "start" });
        dock.style.opacity = 1; if (unlocked) audio.play().catch(() => { }); return;
    }
    introRunning = true; audio.pause();
    intro.classList.add("on");
    if (jump) $("people").scrollIntoView({ behavior: "instant", block: "start" });
    document.body.style.overflow = "hidden";
    const logo = intro.firstElementChild, r = dock.getBoundingClientRect(), D = first ? 3600 : 2600;
    const dx = r.left + r.width / 2 - innerWidth / 2, dy = r.top + r.height / 2 - innerHeight / 2, sc = r.width / 200;
    dock.style.opacity = 0;
    if (first || SOUND_EVERY_CHANGE) {
        snd.currentTime = 0; snd.volume = 1;
        snd.play().catch(() => addEventListener("pointerdown", () => { if (introRunning) snd.play().catch(() => { }); }, { once: true }));
    }
    if (opts.swap) setTimeout(opts.swap, D * .2);
    const ov = intro.animate([
        { background: "rgba(10,31,77,1)", opacity: jump ? 1 : 0, offset: 0 },
        { background: "rgba(10,31,77,1)", opacity: 1, offset: .1 },
        { background: "rgba(10,31,77,1)", opacity: 1, offset: .6 },
        { background: "rgba(10,31,77,0)", opacity: 1, offset: 1 }
    ], { duration: D, fill: "forwards" });
    const P = "perspective(900px)";
    const lg = logo.animate([
        { transform: `translate(0,0) ${P} scale(.3) rotateY(0deg)`, opacity: 0, offset: 0 },
        { transform: `translate(0,0) ${P} scale(1) rotateY(0deg)`, opacity: 1, offset: .18, easing: "ease-in-out" },
        { transform: `translate(0,0) ${P} scale(1) rotateY(${turn}deg)`, opacity: 1, offset: .6, easing: "cubic-bezier(.6,0,.2,1)" },
        { transform: `translate(${dx}px,${dy}px) ${P} scale(${sc}) rotateY(${turn}deg)`, opacity: 1, offset: 1 }
    ], { duration: D, fill: "forwards" });
    lg.onfinish = () => {
        ov.cancel(); lg.cancel();
        intro.classList.remove("on"); dock.style.opacity = 1;
        document.body.style.overflow = ""; introRunning = false;
        fadeOut(snd); spin();
        if (unlocked) audio.play().catch(() => { });
    };
}
dock.onclick = playIntro;
new IntersectionObserver(([e], o) => { if (e.isIntersecting) { o.disconnect(); playIntro(); } },
    { rootMargin: "0px 0px -35% 0px", threshold: 0 }).observe($("people"));

// --- Gallery ---
const grid = $("grid"), lb = $("lb");
function addPhoto(src) {
    const e = grid.querySelector(".empty"); if (e) e.remove();
    const img = new Image(); img.src = src; img.alt = "Foto kebersamaan SOLIDARITY";
    img.onclick = () => { lb.firstElementChild.src = src; lb.classList.add("on"); };
    grid.prepend(img);
}
if (!galleryPhotos.length) grid.innerHTML = '<p class="empty">404: kenangan belum di-upload. Klik &quot;+ Upload foto&quot; →</p>';
galleryPhotos.forEach(addPhoto);
$("upload").onchange = e => [...e.target.files].forEach(f => {
    const r = new FileReader(); r.onload = () => addPhoto(r.result); r.readAsDataURL(f);
});
lb.onclick = () => lb.classList.remove("on");

// --- Satu tangan kartu ---
const jumpTo = i => i === cur ? $("people").scrollIntoView({ behavior: "smooth" }) : goTo(i, i > cur ? 1 : -1, true);
const hand = $("hand");
hand.innerHTML = members.map((m, i) => `<button class="hcard${"♥♦".includes(m.card.suit) ? " red" : ""}" data-i="${i}" style="--a:${((i - (members.length - 1) / 2) * 7).toFixed(1)}deg;--z:${i}" aria-label="${m.name}"><img src="${m.photo}" alt="" onerror="this.onerror=null;this.src='${LOGO}'"><span class="hc">${m.card.rank}${m.card.suit}</span></button>`).join("");
hand.onclick = e => { const b = e.target.closest(".hcard"); if (b) goTo(+b.dataset.i, +b.dataset.i > cur ? 1 : -1); };
$("draw").onclick = () => {
    if (members.length < 2) return;
    let r; do { r = Math.floor(Math.random() * members.length); } while (r === cur);
    goTo(r, r > cur ? 1 : -1);
};

// --- Kartu: miring mengikuti kursor + bisa dibalik ---
(() => {
    const pc = $("pcard");
    pc.addEventListener("pointermove", e => {
        if (e.pointerType === "touch") return;
        const r = pc.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        pc.style.transform = `rotateX(${(-y * 14).toFixed(1)}deg) rotateY(${(x * 14).toFixed(1)}deg)`;
    });
    pc.addEventListener("pointerleave", () => pc.style.transform = "");
    pc.onclick = () => $("pflip").classList.toggle("on");
    pc.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pc.click(); } };
})();

// --- Dinding skill: diagram relasi anggota <-> bahasa ---
(() => {
    const list = [...skillMap.values()].sort((a, b) => b.who.length - a.who.length || a.name.localeCompare(b.name));
    const erd = $("erd"), links = $("links"), who = $("who");
    const hint = '<span class="mono">← pilih anggota atau bahasa untuk menyalakan garis hubungannya</span>';
    const pairs = [];
    list.forEach((s, k) => s.who.forEach(i => pairs.push([i, k])));
    const mN = members.map((m, i) => {
        const b = document.createElement("button");
        b.className = "nd m" + ("♥♦".includes(m.card.suit) ? " red" : ""); b.dataset.i = i;
        b.innerHTML = `<span class="nm"><i>${m.card.rank}${m.card.suit}</i> ${m.name}</span>`;
        $("colM").append(b); return b;
    });
    const lN = list.map((s, k) => {
        const b = document.createElement("button");
        b.className = "nd l"; b.dataset.k = k;
        b.innerHTML = `<span class="nm">${s.name}</span><small>${s.who.length}</small>`;
        $("colL").append(b); return b;
    });
    let sel = null;
    who.innerHTML = hint;

    function paint() {
        const rel = sel ? pairs.filter(([i, k]) => sel.t === "m" ? i === sel.id : k === sel.id) : [];
        const ri = new Set(rel.map(p => p[0])), rk = new Set(rel.map(p => p[1])), rs = new Set(rel.map(p => p.join("-")));
        mN.forEach((b, i) => {
            const me = !!sel && sel.t === "m" && sel.id === i;
            b.classList.toggle("sel", me); b.classList.toggle("rel", ri.has(i) && !me); b.classList.toggle("dim", !!sel && !ri.has(i));
        });
        lN.forEach((b, k) => {
            const me = !!sel && sel.t === "l" && sel.id === k;
            b.classList.toggle("sel", me); b.classList.toggle("rel", rk.has(k) && !me); b.classList.toggle("dim", !!sel && !rk.has(k));
        });
        links.classList.toggle("focus", !!sel);
        links.querySelectorAll("[data-p]").forEach(el => el.classList.toggle("on", rs.has(el.dataset.p)));
        if (!sel) { who.innerHTML = hint; return; }
        if (sel.t === "m") {
            const m = members[sel.id];
            who.innerHTML = `<span class="mono">${m.card.rank}${m.card.suit} ${m.name} menguasai: ${m.langs.join(", ")}</span><button class="chip" data-i="${sel.id}">lihat kartunya →</button>`;
        } else {
            const s = list[sel.id];
            who.innerHTML = `<span class="mono">${s.name} dikuasai:</span>` + s.who.map(i => `<button class="chip" data-i="${i}">${members[i].card.rank}${members[i].card.suit} ${members[i].name}</button>`).join("");
        }
    }
    function draw() {
        const E = erd.getBoundingClientRect();
        links.setAttribute("viewBox", `0 0 ${E.width} ${E.height}`);
        links.innerHTML = pairs.map(([i, k]) => {
            const a = mN[i].getBoundingClientRect(), b = lN[k].getBoundingClientRect();
            const x1 = a.right - E.left, y1 = a.top + a.height / 2 - E.top, x2 = b.left - E.left, y2 = b.top + b.height / 2 - E.top, dx = (x2 - x1) * .5;
            return `<path data-p="${i}-${k}" d="M${x1} ${y1}C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}"/>`;
        }).join("");
        paint();
    }
    erd.onclick = e => {
        const n = e.target.closest(".nd"); if (!n) return;
        const next = n.classList.contains("m") ? { t: "m", id: +n.dataset.i } : { t: "l", id: +n.dataset.k };
        sel = sel && sel.t === next.t && sel.id === next.id ? null : next;
        paint();
    };
    who.onclick = e => { const b = e.target.closest(".chip"); if (b) jumpTo(+b.dataset.i); };
    new ResizeObserver(draw).observe(erd);
    draw();
})();

// --- Label section gaya nama tabel: jumlah baris dari data ---
$("lbPeople").insertAdjacentHTML("beforeend", `<em>${members.length} rows</em>`);
$("lbSkills").insertAdjacentHTML("beforeend", `<em>${skillMap.size} rows</em>`);

// --- Easter egg: klik logo 10x berturut-turut, kartu Joker jatuh ke layar ---
(() => {
    let n = 0, timer;
    document.addEventListener("click", e => {
        if (!e.target.closest(".mark img, .brand img, footer img")) return;
        n++; clearTimeout(timer); timer = setTimeout(() => n = 0, 2500);
        if (n < 10 || document.querySelector(".wild")) return;
        n = 0;
        const w = document.createElement("div");
        w.className = "wild";
        w.innerHTML = `<div class="jk"><b>JK<br>★</b><img src="${LOGO}" alt=""><b class="br">JK<br>★</b></div><p class="mono">kartu liar! kamu menemukan rahasia SOLIDARITY.</p>`;
        w.onclick = () => w.remove();
        document.body.append(w);
        setTimeout(() => w.remove(), 4500);
    });
})();

// --- Lonceng: bunyi halus saat kartu dibalik, bisa dimatikan ---
let bellOn = true;
try { bellOn = localStorage.getItem("bell") !== "off"; } catch { }
let audioCtx;
function ding(f = 1568, vol = .05) {
    if (!bellOn) return;
    try {
        audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
        const t = audioCtx.currentTime;
        [[f, 1], [f * 1.5, .45], [f * 2.76, .2]].forEach(([fr, g]) => {
            const o = audioCtx.createOscillator(), a = audioCtx.createGain();
            o.type = "sine"; o.frequency.value = fr;
            a.gain.setValueAtTime(0, t); a.gain.linearRampToValueAtTime(vol * g, t + .006); a.gain.exponentialRampToValueAtTime(.0001, t + .9);
            o.connect(a).connect(audioCtx.destination); o.start(t); o.stop(t + 1);
        });
    } catch { }
}
$("bell").textContent = "lonceng: " + (bellOn ? "on" : "off");
$("bell").onclick = () => {
    bellOn = !bellOn;
    try { localStorage.setItem("bell", bellOn ? "on" : "off"); } catch { }
    $("bell").textContent = "lonceng: " + (bellOn ? "on" : "off");
    ding();
};
$("pcard").addEventListener("click", () => ding());

// --- Dalang kartu: dua tangan menarik tali ke sembilan kartu ---
let pup = null, pupRun = false, pupVisible = true;
function buildPuppet(animate) {
    const hi = document.querySelector(".hero-in"), svg = $("puppet"), pz = $("pz"), deal = $("deal");
    const cards = [...deal.querySelectorAll(".dcard")];
    if (cards.length < 9) return;
    const H = hi.getBoundingClientRect(), Z = pz.getBoundingClientRect(), D = deal.getBoundingClientRect(), W = H.width;
    svg.classList.toggle("still", !animate);
    svg.setAttribute("viewBox", `0 0 ${W} ${H.height}`);
    // titik tengah sisi atas tiap kartu, dihitung dari rumus kipas
    const pts = cards.map(c => {
        const w = c.offsetWidth, t = parseFloat(c.style.getPropertyValue("--t")), a = t * 8 * Math.PI / 180;
        const cx = D.left + D.width / 2 + t * w * .55 - H.left, cy = D.top + D.height / 2 + (t * t * .045 - .3) * w - H.top;
        return [cx + .7 * w * Math.sin(a), cy - .7 * w * Math.cos(a)];
    });
    const zt = Z.top - H.top, zh = Z.height;
    const pw = Math.min(W * .3, 150), ph = Math.min(54, zh * .42), fw = Math.max(9, pw * .16);
    const palmY = zt + 6 + ph / 2, palmB = palmY + ph / 2 - 2, flen = Math.max(26, zh - ph - 18);
    const lerp = (a, b, t) => a + (b - a) * t, NAVY = "#0a1f4d", WHITE = "#f7f8fb";
    const items = []; let hands = "", strings = "";
    [["l", W * .25, 1], ["r", W * .75, -1]].forEach(([id, cx, sg]) => {
        const X = o => cx + sg * o;
        const map = id === "l" ? [0, 1, 2, 3] : [null, 8, 7, 6];      // kelingking -> telunjuk
        const thumb = id === "l" ? 4 : 5, lens = [.7, .9, 1, .9];
        const finger = (bx, by, tx, ty, card) => {
            const d = `M${bx} ${by}Q${(bx + (tx - bx) * .1).toFixed(1)} ${((by + ty) / 2).toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}`;
            const g = `<g class="fg" data-g="${card}"><path d="${d}" fill="none" stroke="${NAVY}" stroke-width="${fw + 4}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${WHITE}" stroke-width="${fw}" stroke-linecap="round"/></g>`;
            if (card != null) {
                items.push({ k: card, tx, ty, px: pts[card][0], py: pts[card][1], card: cards[card] });
                strings += `<path class="str" data-s="${card}"/><circle class="knot" data-n="${card}" r="2.6"/>`;
            }
            return g;
        };
        let fs = "";
        map.forEach((card, j) => {
            const bx = X(-pw / 2 + pw * (.13 + .25 * j)), by = palmB - 4;
            if (card == null) fs += finger(bx, by, bx, palmB + flen * .4, null);
            else fs += finger(bx, by, lerp(pts[card][0], cx, .5), palmB + flen * lens[j], card);
        });
        fs += finger(X(pw / 2 - fw * .3), palmY + ph * .1, lerp(pts[thumb][0], cx, .5), palmB + flen * .6, thumb);
        const ax = id === "l" ? -40 : cx + pw / 2, aw = id === "l" ? cx - pw / 2 + 40 : W + 40 - (cx + pw / 2);
        const arm = `<rect x="${ax}" y="${palmY - ph * .4}" width="${aw}" height="${ph * .8}" fill="url(#hp)" stroke="${NAVY}" stroke-width="2.5"/>`;
        const cuff = `<rect x="${id === "l" ? cx - pw / 2 - 7 : cx + pw / 2 - 2}" y="${palmY - ph * .47}" width="9" height="${ph * .94}" rx="3" fill="${WHITE}" stroke="${NAVY}" stroke-width="2"/>`;
        const palm = `<rect x="${cx - pw / 2}" y="${palmY - ph / 2}" width="${pw}" height="${ph}" rx="${ph * .35}" fill="${WHITE}" stroke="${NAVY}" stroke-width="2.5"/>`;
        hands += `<g class="hand ${id}">${arm}${fs}${palm}${cuff}</g>`;
    });
    svg.innerHTML = `<defs><pattern id="hp" width="18" height="18" patternUnits="userSpaceOnUse"><rect width="18" height="18" fill="#0d2760"/><path d="M9 0 18 9 9 18 0 9Z" fill="#a9bde0" fill-opacity=".38"/></pattern></defs>${hands}${strings}`;
    items.forEach(it => { it.g = svg.querySelector(`[data-g="${it.k}"]`); it.s = svg.querySelector(`[data-s="${it.k}"]`); it.n = svg.querySelector(`[data-n="${it.k}"]`); it.n.setAttribute("cx", it.px); });
    pup = items;
    renderPuppet(0);
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches && !pupRun) { pupRun = true; requestAnimationFrame(tickPuppet); }
}
// jari ikut bergerak mengikuti kartu yang sedang naik-turun
function renderPuppet(t) {
    if (!pup) return;
    pup.forEach(it => {
        const tr = getComputedStyle(it.card).translate, ty = tr && tr !== "none" ? parseFloat(tr.split(" ")[1]) || 0 : 0;
        const dy = ty * .7, sx = Math.sin(t / 900 + it.k) * 1.4, sy = it.ty + dy, ey = it.py + ty;
        it.g.setAttribute("transform", `translate(0 ${dy.toFixed(2)})`);
        it.s.setAttribute("d", `M${it.tx.toFixed(1)} ${sy.toFixed(1)}Q${((it.tx + it.px) / 2 + sx).toFixed(1)} ${((sy + ey) / 2).toFixed(1)} ${it.px.toFixed(1)} ${ey.toFixed(1)}`);
        it.n.setAttribute("cy", ey.toFixed(1));
    });
}
function tickPuppet(t) { if (pupVisible) renderPuppet(t); requestAnimationFrame(tickPuppet); }
new IntersectionObserver(([e]) => pupVisible = e.isIntersecting).observe($("hero"));
let pupTimer;
addEventListener("resize", () => { clearTimeout(pupTimer); pupTimer = setTimeout(() => requestAnimationFrame(() => buildPuppet(false)), 150); });

// --- Tirai panggung: terbuka saat klik (atau otomatis), sekali per sesi ---
(() => {
    const k = $("curtain"), body = document.body;
    let seen = false;
    try { seen = sessionStorage.getItem("curtain") === "1"; } catch { }
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startHero = delay => setTimeout(() => requestAnimationFrame(() => buildPuppet(true)), delay);
    if (seen || reduced) { k.remove(); body.classList.remove("wait"); startHero(1800); return; }
    body.style.overflow = "hidden";
    let done = false;
    const open = () => {
        if (done) return; done = true;
        k.classList.add("open"); body.classList.remove("wait");
        ding(1318); setTimeout(() => ding(1760), 200);
        try { sessionStorage.setItem("curtain", "1"); } catch { }
        startHero(2600);
        setTimeout(() => { k.remove(); body.style.overflow = ""; }, 1700);
    };
    k.addEventListener("click", open);
    addEventListener("keydown", open, { once: true });
    setTimeout(open, 3500);
})();
