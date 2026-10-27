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
        langs: ["HTML", "PYTHON", "SQL", "Java Script"],
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
    $("stats").innerHTML = `<span><b>${n}</b>anggota</span><span><b>${skillMap.size}</b>bahasa</span><span>sejak<b style="margin:0 0 0 .3em">${SINCE}</b></span>`;

    // SOLIDARITY dipas ke lebar layar
    const mark = $("mark");
    const fit = () => {
        mark.style.fontSize = "100px";
        mark.style.fontSize = 100 * mark.parentElement.clientWidth * .96 / mark.getBoundingClientRect().width + "px";
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
if (!galleryPhotos.length) grid.innerHTML = '<p class="empty">Belum ada foto. Upload foto pertama kalian →</p>';
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

// --- Dinding skill ---
(() => {
    const list = [...skillMap.values()].sort((a, b) => b.who.length - a.who.length || a.name.localeCompare(b.name));
    const max = list[0].who.length, wall = $("wall"), who = $("who");
    const hint = '<span class="mono">← pilih salah satu bahasa</span>';
    who.innerHTML = hint;
    wall.innerHTML = list.map((s, k) => `<button class="tile" data-k="${k}"><b>${s.name}</b><span class="mono">${s.who.length} orang</span><i style="width:${s.who.length / max * 100}%"></i></button>`).join("");
    wall.onclick = e => {
        const t = e.target.closest(".tile"); if (!t) return;
        const was = t.classList.contains("on");
        wall.querySelectorAll(".tile").forEach(x => x.classList.remove("on"));
        if (was) { who.innerHTML = hint; return; }
        t.classList.add("on");
        const s = list[+t.dataset.k];
        who.innerHTML = `<span class="mono">${s.name} dikuasai:</span>` + s.who.map(i => `<button class="chip" data-i="${i}">${members[i].card.rank}${members[i].card.suit} ${members[i].name}</button>`).join("");
    };
    who.onclick = e => { const b = e.target.closest(".chip"); if (b) jumpTo(+b.dataset.i); };
})();