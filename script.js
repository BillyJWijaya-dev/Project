const members=[
{name:"Zen Auladi",role:"Sepuh",bio:"Bukan orang bener, tapi beneran orang.",langs:["PYTHON","PHP"],hobbies:["Ngoding","Mobil","Musik"],photo:"assets/images/Zen.jpeg",card:{rank:"A",suit:"♠"},song:"assets/audio/zenxi.mp3",title:"Bintang 5",artist:"Tenxi"},
{name:"Billy Jonas Wijaya",role:"Fineshyt",bio:"Aku bukan dipimpin, aku yang memimpin.",langs:["HTML","PYTHON","SQL","JAVASCRIPT"],hobbies:["Game","Menggambar","Baca Buku","Tidur","Musik"],photo:"assets/images/billy.jpeg",card:{rank:"JK",suit:"★"},song:"assets/audio/billy.mp3",title:"Know me",artist:"GEMINI"},
{name:"Pandu Satrio",role:"Master koding jir",bio:"Kejarlah cita-cita, jangan dia yang ngga cinta.",langs:["HTML","PYTHON"],hobbies:["Ngoding","Mobil"],photo:"assets/images/ndu.jpeg",card:{rank:"Q",suit:"♦"},song:"assets/audio/pandu.mp3",title:"Soulmate",artist:"Kahitna"},
{name:"M. Naufal Ariadiansyah",role:"Ambasius",bio:"A lot has changed, but I'm still here.",langs:["HTML","PYTHON"],hobbies:["Musik","Game"],photo:"assets/images/naufal.jpeg",card:{rank:"J",suit:"♣"},song:"assets/audio/naufall.mp3",title:"Can't Take My Eyes Off You",artist:"Lula Band"},
{name:"M. Faris Nur Rizqi",role:"Founding Father",bio:"Try To Be Better.",langs:["PYTHON","HTML"],hobbies:["Game","Musik"],photo:"assets/images/faris.jpeg",card:{rank:"10",suit:"♠"},song:"assets/audio/faris.mp3",title:"Whatever",artist:"Oasis"},
{name:"Althafian Rizqullah Susilo",role:"Master Koding #2",bio:"Hidup itu sederhana, kita yang membuatnya rumit.",langs:["HTML","C","PYTHON"],hobbies:["Game","Ngoding"],photo:"assets/images/althaf.jpeg",card:{rank:"9",suit:"♥"},song:"assets/audio/althaf.mp3",title:"Haruka",artist:"Yoasobi"},
{name:"Muhamad Kiram Albara",role:"Tuan Rumah",bio:"Ga perlu kata-kata, yang penting aksi nyata.",langs:["PYTHON"],hobbies:["Gaming","Futsal","Gym"],photo:"assets/images/kiram.jpeg",card:{rank:"8",suit:"♦"},song:"assets/audio/kiram.mp3",title:"Mimpi Yang Sempurna",artist:"Peterpan"},
{name:"Muhammad Nazmy Syarief",role:"Reminder Tugas",bio:"Build with intention, refined over time.",langs:["PYTHON"],hobbies:["Nugas","Game","Doom Scrolling","Healing","Photoshoot"],photo:"assets/images/nazmy.jpeg",card:{rank:"7",suit:"♣"},song:"assets/audio/nazmy.mp3",title:"Just Give Me A Reason",artist:"Pink"},
{name:"Syafi",role:"Lost Member",bio:"404",langs:["PYTHON"],hobbies:["404"],photo:"assets/images/JESTER.jpeg",card:{rank:"K",suit:"♥"},song:"songs/lagu9.mp3",title:"404",artist:"404"}];
const gallery=[1,2,3,4,5,6,7,8,9,10,11].map(n=>`assets/galeri/${n}.jpeg`),LOGO="assets/images/jesterT.jpeg",$=id=>document.getElementById(id);
const red=m=>"♥♦".includes(m.card.suit),fb=i=>{i.onerror=()=>{i.onerror=null;i.src=LOGO}};
let cur=0,unlocked=false;const au=$("au");
// kartu di tangan jester: berputar terus, ganti anggota di sisi belakang
let hi=0;const hcSpin=$("hcSpin");
function setHand(i){const m=members[i];$("hcImg").src=m.photo;fb($("hcImg"));$("hcRk").textContent=m.card.rank+m.card.suit;$("hcCap").textContent=m.name}
setHand(0);
hcSpin.addEventListener("animationiteration",()=>setTimeout(()=>{hi=(hi+1)%members.length;setHand(hi)},1800));
$("hc").onclick=()=>{select(hi);$("members").scrollIntoView({behavior:"smooth"})};
// deretan kartu
const hand=$("hand"),n=members.length;
hand.innerHTML=members.map((m,i)=>`<button data-i="${i}" style="--a:${((i-(n-1)/2)*6).toFixed(1)}deg" aria-label="${m.name}"><img src="${m.photo}" alt=""></button>`).join("");
hand.querySelectorAll("img").forEach(fb);
hand.onclick=e=>{const b=e.target.closest("button");if(b)select(+b.dataset.i)};
function select(i){
  cur=i;const m=members[i];
  hand.querySelectorAll("button").forEach((b,k)=>b.classList.toggle("on",k===i));
  $("flip").classList.remove("on");
  $("pImg").src=m.photo;$("pImg").alt=m.name;fb($("pImg"));
  $("pf").classList.toggle("red",red(m));
  document.querySelectorAll(".c").forEach(c=>c.textContent=m.card.rank+m.card.suit);
  $("pName").textContent=m.name;$("pRole").textContent=m.role;$("pBio").textContent=m.bio;
  $("pLang").innerHTML=m.langs.map(l=>`<li>${l}</li>`).join("");$("pHob").innerHTML=m.hobbies.map(l=>`<li>${l}</li>`).join("");
  $("pSong").textContent=m.title;$("pArt").textContent=m.artist;
  au.src=m.song;if(unlocked)au.play().catch(()=>{});else au.pause();
  $("tilt").animate([{transform:"rotateY(-90deg) scale(.9)"},{transform:"none"}],{duration:500,easing:"ease-out"});
}
$("play").onclick=()=>{unlocked=true;au.paused?au.play().catch(()=>{}):au.pause()};
au.onplay=()=>$("play").textContent="❚❚";au.onpause=()=>$("play").textContent="▶";
addEventListener("keydown",e=>{if(e.key==="ArrowRight")select((cur+1)%n);if(e.key==="ArrowLeft")select((cur+n-1)%n)});
new IntersectionObserver(([e])=>{if(!e.isIntersecting)au.pause()},{threshold:.05}).observe($("members"));
// tilt ikut kursor + balik kartu
const tilt=$("tilt");
tilt.addEventListener("pointermove",e=>{if(e.pointerType==="touch")return;const r=tilt.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;tilt.style.transform=`rotateX(${-y*16}deg) rotateY(${x*16}deg)`});
tilt.addEventListener("pointerleave",()=>tilt.style.transform="");
$("flip").onclick=()=>$("flip").classList.toggle("on");
select(0);
// skill
const sk=new Map();members.forEach((m,i)=>m.langs.forEach(l=>{if(!sk.has(l))sk.set(l,[]);sk.get(l).push(i)}));
const list=[...sk].sort((a,b)=>b[1].length-a[1].length);
$("chips").innerHTML=list.map(([l,w],k)=>`<button data-k="${k}">${l}<small>${w.length}</small></button>`).join("");
$("who").innerHTML='<span class="mono">pilih bahasa untuk melihat siapa yang menguasainya</span>';
$("chips").onclick=e=>{const b=e.target.closest("button");if(!b)return;
  document.querySelectorAll(".chips button").forEach(x=>x.classList.toggle("on",x===b));
  $("who").innerHTML=list[+b.dataset.k][1].map(i=>`<button data-i="${i}">${members[i].card.rank}${members[i].card.suit} ${members[i].name}</button>`).join("")};
$("who").onclick=e=>{const b=e.target.closest("button");if(b){select(+b.dataset.i);$("members").scrollIntoView({behavior:"smooth"})}};
// galeri
const grid=$("grid"),lb=$("lb");
function add(src){const im=new Image();im.src=src;im.alt="Foto kebersamaan SOLIDARITY";im.onerror=()=>im.remove();im.onclick=()=>{lb.firstElementChild.src=src;lb.classList.add("on")};grid.prepend(im)}
gallery.forEach(add);
$("up").onchange=e=>[...e.target.files].forEach(f=>{const r=new FileReader();r.onload=()=>add(r.result);r.readAsDataURL(f)});
lb.onclick=()=>lb.classList.remove("on");
// ===== suasana sirkus & kartu remi =====
const stg=$("stage");
$("lights").innerHTML=Array.from({length:26},(_,k)=>`<i style="--sag:${Math.round(Math.sin(k/25*Math.PI)*34)}px"></i>`).join("");
$("suits").innerHTML=Array.from({length:18},(_,k)=>`<span style="left:${(k*5.7+Math.random()*4)%98}%;font-size:${18+Math.random()*34}px;animation-duration:${14+Math.random()*16}s;animation-delay:-${Math.random()*20}s;--rot:${(Math.random()*180-90)|0}deg">${"♠♥♦♣"[k%4]}</span>`).join("");
const rb="♠ SOLIDARITY ♥ DIFFERENT MINDS ♦ ONE CONNECTION ♣ ";
$("rt").innerHTML=`<span>${rb.repeat(3)}</span><span>${rb.repeat(3)}</span>`;
addEventListener("pointermove",e=>{
  document.documentElement.style.setProperty("--mx",e.clientX+"px");document.documentElement.style.setProperty("--my",e.clientY+"px");
  stg.style.setProperty("--px",((.5-e.clientX/innerWidth)*24).toFixed(1)+"px");stg.style.setProperty("--py",((.5-e.clientY/innerHeight)*14).toFixed(1)+"px");
});
$("tilt").addEventListener("pointermove",e=>{const r=$("tilt").getBoundingClientRect();$("pf").style.setProperty("--gx",(e.clientX-r.left)/r.width*100+"%");$("pf").style.setProperty("--gy",(e.clientY-r.top)/r.height*100+"%")});
// kartu dibagikan saat meja terlihat, elemen muncul bertahap saat scroll
hand.querySelectorAll("button").forEach((b,i)=>b.style.setProperty("--i",i));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.25});
io.observe(hand);
document.querySelectorAll("h2,.prof,.text,.chips,.who").forEach(el=>{el.classList.add("rv");io.observe(el)});
// foto galeri sedikit miring seperti kartu di meja
const tiltImg=()=>grid.querySelectorAll("img:not([style*='--r'])").forEach(im=>im.style.setProperty("--r",(Math.random()*6-3).toFixed(1)+"deg"));
new MutationObserver(tiltImg).observe(grid,{childList:true});tiltImg();
