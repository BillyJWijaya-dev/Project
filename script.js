// Foto hero
const heroPhotos = [
    "assets/images/JESTER.JPEG",
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

// Anngota
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
        langs: ["HTML", "PYTHON", "SQL"],
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
        photo: "img/member9.jpg",
        card: { rank: "K", suit: "♥" },
        song: "songs/lagu9.mp3", title: "404", artist: "404"
    }
];

// Foto galeri awal (opsional)
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
/* ========================== */

const $ = id => document.getElementById(id);

// --- Hero slideshow ---
(() => {
    const bg = $("heroBg");
    if (!heroPhotos.length) return;
    heroPhotos.forEach(src => { const d = document.createElement("div"); d.style.backgroundImage = `url(${src})`; bg.append(d); });
    const ds = bg.children; let i = 0; ds[0].classList.add("on");
    setInterval(() => { ds[i].classList.remove("on"); i = (i + 1) % ds.length; ds[i].classList.add("on"); }, 5000);
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
        $("mPhoto").onerror = function () { this.onerror = null; this.src = "img/logo.jpeg"; };
        $("mPhoto").src = m.photo; $("mPhoto").alt = m.name;
        $("mLang").innerHTML = m.langs.map(l => `<li>${l}</li>`).join("");
        $("mHobby").innerHTML = m.hobbies.map(l => `<li>${l}</li>`).join("");
        $("mSong").textContent = m.title; $("mArtist").textContent = m.artist;
        $("count").textContent = `${cur + 1} / ${members.length}`;
        document.querySelectorAll(".dots span").forEach((d, k) => d.classList.toggle("on", k === cur));
        $("card").classList.remove("fade");
    }, 200);
    if (auto) spin();
    audio.src = m.song;
    if (auto && unlocked) audio.play().catch(() => { }); else audio.pause();
}
function goTo(i, dir = 1) {
    if (introRunning || i === cur) return;
    playIntro({ dir, swap: () => { cur = i; render(false); } });
}
const go = d => goTo((cur + d + members.length) % members.length, d);

$("dots").innerHTML = members.map((_, k) => `<span data-i="${k}"></span>`).join("");
$("dots").onclick = e => { if (e.target.dataset.i) goTo(+e.target.dataset.i, +e.target.dataset.i > cur ? 1 : -1); };
$("prev").onclick = () => go(-1);
$("next").onclick = () => go(1);
document.addEventListener("keydown", e => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); });

// Browser
document.addEventListener("click", () => {
    if (unlocked) return;
    unlocked = true; $("note").style.display = "none";
    if (!introRunning && (location.hash === "#people" || inView($("people")))) audio.play().catch(() => { });
}, { once: true });
const inView = el => { const r = el.getBoundingClientRect(); return r.top < innerHeight * .6 && r.bottom > innerHeight * .4; };

playBtn.onclick = () => audio.paused ? audio.play().catch(() => { }) : audio.pause();
audio.onplay = () => playBtn.textContent = "❚❚";
audio.onpause = () => playBtn.textContent = "▶";
// Jeda saat section anggota keluar layar
new IntersectionObserver(([e]) => { if (!e.isIntersecting) audio.pause(); }, { threshold: .1 }).observe($("people"));
render(false);

// --- Animasi logo
const SOUND_EVERY_CHANGE = true;
const intro = $("intro"), dock = $("dock"), snd = $("introSnd");
var introRunning = false;
function fadeOut(a) {
    const t = setInterval(() => { a.volume = Math.max(0, a.volume - .1); if (a.volume <= 0) { clearInterval(t); a.pause(); } }, 60);
}
function playIntro(opts = {}) {
    if (introRunning) return;
    const first = !opts.swap, turn = 720 * (opts.dir || 1);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (opts.swap) { opts.swap(); spin(); }
        dock.style.opacity = 1; if (unlocked) audio.play().catch(() => { }); return;
    }
    introRunning = true; audio.pause();
    intro.classList.add("on");
    if (first) $("people").scrollIntoView({ behavior: "instant", block: "start" });
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
        { background: "rgba(10,31,77,1)", opacity: first ? 1 : 0, offset: 0 },
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