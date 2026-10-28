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

// ===== SOUND EFFECT TIRAI =====
// Taruh file suaramu di folder assets/audio/ lalu tulis nama filenya di sini.
// Kosongkan ("") kalau mau pakai bunyi lonceng bawaan. Kalau file tidak ketemu, otomatis pakai lonceng.
const CURTAIN_SOUND = "";   // contoh: "assets/audio/tirai.mp3"
const CURTAIN_VOLUME = 0.8;   // 0 sampai 1

// ===== SOUND EFFECT EASTER EGG (kartu Joker) =====
// Sama seperti di atas: taruh file di assets/audio/ lalu tulis namanya. Kosongkan ("") untuk bunyi lonceng bawaan.
const EASTER_SOUND = "";    // contoh: "assets/audio/joker.mp3"
const EASTER_VOLUME = 0.9;    // 0 sampai 1
// Foto di tengah kartu Joker. Taruh di assets/images/ lalu tulis namanya.
const EASTER_IMAGE = "assets/images/jesterT.jpeg";
// ==============================
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
        { background: "rgba(11,29,51,1)", opacity: jump ? 1 : 0, offset: 0 },
        { background: "rgba(11,29,51,1)", opacity: 1, offset: .1 },
        { background: "rgba(11,29,51,1)", opacity: 1, offset: .6 },
        { background: "rgba(11,29,51,0)", opacity: 1, offset: 1 }
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
    const easterSnd = EASTER_SOUND ? new Audio(EASTER_SOUND) : null;
    if (easterSnd) { easterSnd.preload = "auto"; easterSnd.volume = EASTER_VOLUME; }
    const fanfare = () => [1568, 1976, 2349, 3136].forEach((f, i) => setTimeout(() => ding(f, .06), i * 140));
    function playEaster() {
        if (!bellOn) return;                       // ikut tombol "lonceng: on/off"
        if (!easterSnd) return fanfare();
        easterSnd.currentTime = 0;
        easterSnd.play().catch(fanfare);           // file hilang / diblokir -> lonceng bawaan
    }
    let n = 0, timer;
    document.addEventListener("click", e => {
        if (!e.target.closest(".mark img, .brand img, footer img")) return;
        n++; clearTimeout(timer); timer = setTimeout(() => n = 0, 2500);
        if (n < 10 || document.querySelector(".wild")) return;
        n = 0;
        const w = document.createElement("div");
        w.className = "wild";
        w.innerHTML = `<div class="jk"><b>JK<br>★</b><img src="${EASTER_IMAGE}" alt=""><b class="br">JK<br>★</b></div><p class="mono">kartu liar! kamu menemukan rahasia SOLIDARITY.</p>`;
        w.onclick = () => w.remove();
        document.body.append(w);
        playEaster();
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

// --- Kabel dari logo ke kartu yang dibagikan ---
function drawCable(still) {
    const hi = document.querySelector(".hero-in"), cab = $("cable"), logo = document.querySelector(".mark img"), deal = $("deal");
    const H = hi.getBoundingClientRect(), L = logo.getBoundingClientRect(), D = deal.getBoundingClientRect();
    cab.classList.toggle("still", !!still);
    cab.setAttribute("viewBox", `0 0 ${H.width} ${H.height}`);
    const x0 = L.left + L.width / 2 - H.left, y0 = L.bottom - H.top;
    // posisi ujung atas tiap kartu dihitung dari rumus kipas (tidak bergantung animasi)
    const pts = [...deal.querySelectorAll(".dcard")].map(c => {
        const w = c.offsetWidth, t = parseFloat(c.style.getPropertyValue("--t")), a = t * 8 * Math.PI / 180;
        const cx = D.left + D.width / 2 + t * w * .55 - H.left, cy = D.top + D.height / 2 + (t * t * .045 - .3) * w - H.top;
        return [cx + .7 * w * Math.sin(a), cy - .7 * w * Math.cos(a) - 10];
    });
    const yb = y0 + (Math.min(...pts.map(p => p[1])) - y0) * .5;
    cab.innerHTML = pts.map(([x, y], k) =>
        `<path pathLength="1" d="M${x0} ${y0}V${yb}H${x}V${y}" style="animation-delay:${(.15 + k * .08).toFixed(2)}s"/>` +
        `<circle cx="${x}" cy="${y}" r="3" style="animation-delay:${(1 + k * .08).toFixed(2)}s"/>`).join("") +
        `<circle cx="${x0}" cy="${y0}" r="3.5" style="animation-delay:0s"/>`;
}
let cableTimer;
addEventListener("resize", () => { clearTimeout(cableTimer); cableTimer = setTimeout(() => requestAnimationFrame(() => drawCable(true)), 150); });

// --- Choose Your Fate: pilih satu kartu tertutup, dapat pesan misterius ---
(() => {
    const FATES = [
        "Seseorang di kelas ini diam-diam sudah mengerjakan tugasnya. Bukan kamu.",
        "Deadline mendekat. Kopi tidak akan menyelamatkanmu, tapi tetap coba.",
        "Kartu ini bilang: commit dulu, mikir belakangan.",
        "Hari ini kamu akan menemukan bug yang ternyata salah ketik.",
        "Satu teman akan mengajakmu belajar bareng. Terima. Itu jebakan yang baik.",
        "Yang kamu cari ada di baris yang kamu skip.",
        "Sinyal wifi akan putus tepat saat kamu mau submit.",
        "Joker sedang mengawasimu. Tenang, dia di pihak kita.",
        "Kamu lebih siap dari yang kamu kira. Sedikit.",
        "Jangan hapus folder itu. Kamu tahu folder yang mana.",
        "Akan ada yang bilang 'gampang kok'. Jangan percaya, tapi tanya caranya.",
        "Takdirmu: begadang sekali lagi, lalu tidur panjang."
    ];
    const SUITS = ["♠", "♥", "♦", "♣"], RANKS = ["A", "K", "Q", "J", "10", "9", "7"];
    const row = $("fateRow"), box = $("fateMsg");
    const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    function deal() {
        const msgs = shuffle(FATES), ranks = shuffle(RANKS);
        box.innerHTML = '<p class="mono">belum ada kartu terpilih</p>';
        row.innerHTML = [0, 1, 2, 3, 4].map(i => {
            const suit = SUITS[Math.floor(Math.random() * 4)], red = "♥♦".includes(suit);
            return `<button class="fcard" data-m="${i}" style="--a:${((i - 2) * 5)}deg" aria-label="Kartu tertutup ${i + 1}">` +
                `<span class="fflip"><span class="ff fbk"><img src="${LOGO}" alt=""></span>` +
                `<span class="ff ffr${red ? " red" : ""}"><b>${ranks[i]}</b><i>${suit}</i></span></span></button>`;
        }).join("");
        row._msgs = msgs;
    }
    row.onclick = e => {
        const c = e.target.closest(".fcard");
        if (!c || row.querySelector(".fcard.on")) return;
        c.classList.add("on");
        row.querySelectorAll(".fcard").forEach(x => { if (x !== c) x.classList.add("lock"); });
        ding(1318); setTimeout(() => ding(1760), 180);
        setTimeout(() => {
            box.innerHTML = "";
            const p = document.createElement("p"); p.className = "t"; p.textContent = row._msgs[+c.dataset.m];
            box.appendChild(p);
        }, 450);
    };
    $("fateReset").onclick = deal;
    deal();
})();

// --- Latar: partikel simbol kartu yang melayang pelan ---
(() => {
    const cv = $("fx");
    if (!cv) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { cv.remove(); return; }
    const ctx = cv.getContext("2d"), SYM = ["♠", "♥", "♦", "♣", "•", "•"];
    let W = 0, H = 0, items = [], raf = 0;
    const mk = (init) => ({
        x: Math.random() * W, y: init ? Math.random() * H : H + 30,
        s: 10 + Math.random() * 14, v: .12 + Math.random() * .35, d: (Math.random() - .5) * .25,
        ph: Math.random() * 6.28, a: .05 + Math.random() * .13, g: SYM[Math.floor(Math.random() * SYM.length)], r: (Math.random() - .5) * .01
    });
    function size() {
        const dpr = Math.min(devicePixelRatio || 1, 2);
        W = innerWidth; H = innerHeight;
        cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const n = W < 700 ? 20 : 40;
        while (items.length < n) items.push(mk(true));
        items.length = n;
    }
    function frame(t) {
        ctx.clearRect(0, 0, W, H);
        for (const p of items) {
            p.y -= p.v; p.x += p.d + Math.sin(t / 2200 + p.ph) * .18;
            if (p.y < -30) Object.assign(p, mk(false));
            ctx.globalAlpha = p.a; ctx.fillStyle = "#A9C5E8";
            ctx.font = `${p.s}px 'Archivo', serif`;
            ctx.fillText(p.g, p.x, p.y);
        }
        raf = requestAnimationFrame(frame);
    }
    addEventListener("resize", size);
    document.addEventListener("visibilitychange", () => { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(frame); });
    size(); raf = requestAnimationFrame(frame);
})();

// --- Tirai panggung: muncul tiap halaman dibuka, terbuka saat klik (atau otomatis) ---
(() => {
    const k = $("curtain"), body = document.body;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const curtainSnd = CURTAIN_SOUND ? new Audio(CURTAIN_SOUND) : null;
    if (curtainSnd) { curtainSnd.preload = "auto"; curtainSnd.volume = CURTAIN_VOLUME; }
    const bellFallback = () => { ding(1318); setTimeout(() => ding(1760), 200); };
    function playCurtain() {
        if (!bellOn) return;                       // ikut tombol "lonceng: on/off"
        if (!curtainSnd) return bellFallback();
        curtainSnd.currentTime = 0;
        curtainSnd.play().catch(bellFallback);     // file hilang / diblokir -> lonceng bawaan
    }
    const startHero = delay => setTimeout(() => requestAnimationFrame(() => drawCable(false)), delay);
    if (reduced) k.classList.add("calm");
    body.style.overflow = "hidden";
    let done = false;
    const open = () => {
        if (done) return; done = true;
        k.classList.add("open"); body.classList.remove("wait");
        playCurtain();
        startHero(2600);
        setTimeout(() => { k.remove(); body.style.overflow = ""; }, reduced ? 700 : 1700);
    };
    k.addEventListener("click", open);
    k.addEventListener("pointerdown", open);
    k.addEventListener("touchstart", open, { passive: true });
    addEventListener("keydown", open, { once: true });
    setTimeout(open, 3500);
})();
