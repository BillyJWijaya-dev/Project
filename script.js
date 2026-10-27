// Foto hero (berganti otomatis).
const heroPhotos = [
    "assets/images/solidarity.jpeg",
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
];

// Data anggota 
const members = [
    {
        name: "Zen Auladi", role: "Sepuh",
        bio: "Bukan orang bener, tapi beneran orang.",
        langs: ["PYTHON", "PHP"],
        hobbies: ["Ngoding", "Mobil", "Musik"],
        photo: "assets/images/Zen.jpeg",
        song: "assets/audio/zenxi.mp3", title: "Bintang 5", artist: "Tenxi"
    },
    {
        name: "Billy Jonas Wijaya", role: "Fineshyt",
        bio: "Aku bukan dipimpin, aku yang memimpin.",
        langs: ["HTML", "PYTHON", "SQL"],
        hobbies: ["Game", "Menggambar", "Baca Buku", "Tidur", "Musik"],
        photo: "assets/images/billy.jpeg",
        song: "assets/audio/billy.mp3", title: "Know me", artist: "GEMINI"
    },
    {
        name: "Pandu Satrio", role: "Master koding jir",
        bio: "Kejarlah cita-cita, jangan dia yang ngga cinta.",
        langs: ["HTML", "PYTHON"],
        hobbies: ["Ngoding", "Mobil"],
        photo: "assets/images/ndu.jpeg",
        song: "assets/audio/pandu.mp3", title: "Soulmate", artist: "Kahitna"
    },
    {
        name: "M. Naufal Ariadiansyah", role: "Ambasius",
        bio: "A lot has changed, but I'm still here.",
        langs: ["HTML", "PYTHON"],
        hobbies: ["Musik", "Game"],
        photo: "assets/images/naufal.jpeg",
        song: "assets/audio/naufall.mp3", title: "Can't Take My Eyes Off You", artist: "Lula Band"
    },
    {
        name: "M. Faris Nur Rizqi", role: "Founding Father",
        bio: "Try To Be Better.",
        langs: ["PYTHON", "HTML"],
        hobbies: ["Game", "Musik"],
        photo: "assets/images/faris.jpeg",
        song: "assets/audio/faris.mp3", title: "Whatever", artist: "Oasis"
    },
    {
        name: "Althafian Rizqullah Susilo", role: "Master Koding #2",
        bio: "Hidup itu sederhana, kita yang membuatnya rumit.",
        langs: ["HTML", "C", "PYTHON"],
        hobbies: ["Game", "Ngoding"],
        photo: "assets/images/althaf.jpeg",
        song: "assets/audio/althaf.mp3", title: "Haruka", artist: "Yoasobi"
    },
    {
        name: "Muhamad Kiram Albara", role: "Tuan Rumah",
        bio: "Ga perlu kata-kata, yang penting aksi nyata.",
        langs: ["PYTHON"],
        hobbies: ["Futsal", "Gym"],
        photo: "assets/images/kiram.jpeg",
        song: "assets/audio/kiram.mp3", title: "Mimpi Yang Sempurna", artist: "Peterpan"
    },
    {
        name: "Nazmy", role: "Reminder Tugas",
        bio: "Build with intention, refined over time.",
        langs: ["PYTHON"],
        hobbies: ["Nugas", "Game"],
        photo: "assets/images/nazmy.jpeg",
        song: "assets/audio/nazmy.mp3", title: "Just Give Me A Reason ", artist: "Pink"
    },
    {
        name: "Syafi", role: "Lost Member",
        bio: "404",
        langs: ["PYTHON"],
        hobbies: ["404"],
        photo: "img/member9.jpg",
        song: "songs/lagu9.mp3", title: "404", artist: "404"
    }
];

// Foto galeri
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

function render(auto) {
    const m = members[cur];
    $("card").classList.add("fade");
    setTimeout(() => {
        $("mName").textContent = m.name;
        $("mRole").textContent = m.role;
        $("mBio").textContent = m.bio;
        $("mPhoto").onerror = function () { this.onerror = null; this.src = "img/logo.jpeg"; };
        $("mPhoto").src = m.photo; $("mPhoto").alt = m.name;
        $("mLang").innerHTML = m.langs.map(l => `<li>${l}</li>`).join("");
        $("mHobby").innerHTML = m.hobbies.map(l => `<li>${l}</li>`).join("");
        $("mSong").textContent = m.title; $("mArtist").textContent = m.artist;
        $("count").textContent = `${cur + 1} / ${members.length}`;
        document.querySelectorAll(".dots span").forEach((d, k) => d.classList.toggle("on", k === cur));
        $("card").classList.remove("fade");
    }, 200);
    audio.src = m.song;
    if (auto && unlocked) audio.play().catch(() => { }); else audio.pause();
}
const go = d => { cur = (cur + d + members.length) % members.length; render(true); };

$("dots").innerHTML = members.map((_, k) => `<span data-i="${k}"></span>`).join("");
$("dots").onclick = e => { if (e.target.dataset.i) { cur = +e.target.dataset.i; render(true); } };
$("prev").onclick = () => go(-1);
$("next").onclick = () => go(1);
document.addEventListener("keydown", e => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); });

// browser
document.addEventListener("click", () => {
    if (unlocked) return;
    unlocked = true; $("note").style.display = "none";
    if (location.hash === "#people" || inView($("people"))) audio.play().catch(() => { });
}, { once: true });
const inView = el => { const r = el.getBoundingClientRect(); return r.top < innerHeight * .6 && r.bottom > innerHeight * .4; };

playBtn.onclick = () => audio.paused ? audio.play().catch(() => { }) : audio.pause();
audio.onplay = () => playBtn.textContent = "❚❚";
audio.onpause = () => playBtn.textContent = "▶";
// Jeda saat section anggota keluar layar
new IntersectionObserver(([e]) => { if (!e.isIntersecting) audio.pause(); }, { threshold: .1 }).observe($("people"));
render(false);

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
