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
function setHand(i){const m=members[i];$("hcImg").src=m.photo;fb($("hcImg"));$("hcRk").innerHTML=m.card.rank+"<br>"+m.card.suit;$("hcFace").classList.toggle("red",red(m));$("hcCap").textContent="> "+m.name}
setHand(0);
$("hc").onclick=()=>{select(hi);$("members").scrollIntoView({behavior:"smooth"})};
// deretan kartu
const hand=$("hand"),n=members.length;
hand.innerHTML=members.map((m,i)=>`<button data-i="${i}" style="--a:${((i-(n-1)/2)*6).toFixed(1)}deg" aria-label="${m.name}"><span class="ix${red(m)?" red":""}">${m.card.rank}<br>${m.card.suit}</span><img src="${m.photo}" alt=""></button>`).join("");
hand.querySelectorAll("img").forEach(fb);
hand.onclick=e=>{const b=e.target.closest("button");if(b)select(+b.dataset.i)};
function select(i){
  cur=i;const m=members[i];
  hand.querySelectorAll("button").forEach((b,k)=>b.classList.toggle("on",k===i));
  $("flip").classList.remove("on");
  $("pImg").src=m.photo;$("pImg").alt=m.name;fb($("pImg"));
  $("pf").classList.toggle("red",red(m));
  document.querySelectorAll(".c").forEach(c=>c.innerHTML=m.card.rank+"<i>"+m.card.suit+"</i>");document.querySelectorAll(".pip").forEach(p=>p.textContent=m.card.suit);
  scramble($("pName"),m.name);$("pRole").textContent=m.role;$("pBio").textContent=m.bio;
  $("pLang").innerHTML=m.langs.map(l=>`<li>${l}</li>`).join("");$("pHob").innerHTML=m.hobbies.map(l=>`<li>${l}</li>`).join("");
  $("pSong").textContent=m.title;$("pArt").textContent=m.artist;
  au.src=m.song;renderLyrics(i);if(unlocked)au.play().catch(()=>{});else au.pause();
  gl($("tilt"));
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

// ===== glitch ala terminal + transisi kartu di tangan jester =====
function gl(el,ms=560){el.classList.remove("gl");void el.offsetWidth;el.classList.add("gl");setTimeout(()=>el.classList.remove("gl"),ms)}
const CH="01<>/\\|#$%&@";
function scramble(el,txt){let f=0;const t=setInterval(()=>{f++;el.textContent=[...txt].map((c,k)=>c===" "||k<f*txt.length/14?c:CH[Math.random()*CH.length|0]).join("");if(f>=14){clearInterval(t);el.textContent=txt}},32)}
const fly=$("fly"),RM=matchMedia("(prefers-reduced-motion: reduce)").matches,wait=ms=>new Promise(r=>setTimeout(r,ms));
function burst(){const s=stg.getBoundingClientRect(),r=$("hc").getBoundingClientRect();
  for(let k=0;k<10;k++){const e=document.createElement("span");e.className="bst";e.textContent="♠♥♦♣"[k%4];
    e.style.left=r.left-s.left+r.width/2+"px";e.style.top=r.top-s.top+r.height/2+"px";stg.append(e);
    const a=k/10*6.28,d=70+Math.random()*90;
    e.animate([{transform:"translate(-50%,-50%) scale(1)",opacity:1},{transform:`translate(calc(-50% + ${Math.cos(a)*d}px),calc(-50% + ${Math.sin(a)*d-50}px)) rotate(${Math.random()*360}deg) scale(.4)`,opacity:0}],{duration:900,easing:"ease-out"}).onfinish=()=>e.remove()}}
async function cycle(){
  if(RM)return;
  for(;;){
    await wait(4300);
    gl(fly);burst();
    const a1=fly.animate([{transform:"none",opacity:1},{transform:"translateY(-80%) rotate(20deg) scale(.5)",opacity:0}],{duration:720,easing:"cubic-bezier(.5,0,.9,.4)",fill:"forwards"});
    await a1.finished;
    hi=(hi+1)%members.length;setHand(hi);scramble($("hcCap"),"> "+members[hi].name);gl(fly);
    const a2=fly.animate([{transform:"translateY(50%) scale(.2)",opacity:0},{transform:"none",opacity:1}],{duration:850,easing:"cubic-bezier(.2,.9,.3,1.3)",fill:"forwards"});
    a1.cancel();await a2.finished;a2.cancel();
  }
}
cycle();
const h1=document.querySelector("h1");setInterval(()=>gl(h1,520),5600);

// ===== lirik (data ada di lyrics.js) =====
var lyTr=true,lyData=[],lyIdx=-1;
function esc(s){return String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]))}
function renderLyrics(i){
  var d=(window.LYRICS||{})[members[i].name]||{},box=$("lyr");
  if(d.file&&!d.lines&&!d.loading){d.loading=1;fetch(d.file).then(r=>r.ok?r.text():"").then(t=>{d.lines=parseLy(t);if(cur===i)renderLyrics(i)}).catch(()=>{d.lines=[]})}
  var L=d.lines||[];
  lyData=L.map(x=>typeof x==="string"?{l:x}:x);lyIdx=-1;
  box.innerHTML=lyData.length?lyData.map((x,k)=>`<p data-k="${k}"><span>${esc(x.l)}</span>${x.ro?`<em class="ro">${esc(x.ro)}</em>`:""}${x.tr?`<em class="tr">${esc(x.tr)}</em>`:""}</p>`).join(""):'<p class="empty mono">lirik belum ditambahkan</p>';
  $("trBtn").hidden=!lyData.some(x=>x.tr);
  box.classList.toggle("notr",lyTr===false);box.scrollTop=0;
}
$("lyBtn").onclick=()=>{$("lyr").hidden=!$("lyr").hidden;$("lyBtn").classList.toggle("on",!$("lyr").hidden)};
$("trBtn").onclick=()=>{lyTr=!lyTr;$("lyr").classList.toggle("notr",!lyTr);$("trBtn").textContent="terjemahan: "+(lyTr?"on":"off")};
au.addEventListener("timeupdate",()=>{
  if(!lyData.some(x=>x.t!=null))return;
  var k=-1;lyData.forEach((x,n)=>{if(x.t!=null&&x.t<=au.currentTime)k=n});
  if(k===lyIdx)return;lyIdx=k;var box=$("lyr");
  box.querySelectorAll("p.on").forEach(p=>p.classList.remove("on"));
  var p=box.querySelector(`p[data-k="${k}"]`);if(!p)return;
  p.classList.add("on");gl(p,420);
  if(!box.hidden)box.scrollTo({top:p.offsetTop-box.clientHeight/2+p.clientHeight/2,behavior:"smooth"});
});
$("lyr").addEventListener("click",e=>{var p=e.target.closest("p[data-k]");if(!p)return;var t=lyData[+p.dataset.k].t;if(t!=null){au.currentTime=t;unlocked=true;au.play().catch(()=>{})}});
renderLyrics(cur);

// baca file lirik .txt: satu baris = satu lirik. Format: [mm:ss.xx] lirik | terjemahan | romaji (semua bagian selain lirik opsional); baris berawalan # diabaikan
function parseLy(t){return t.split(/\r?\n/).map(s=>s.trim()).filter(s=>s&&!s.startsWith("#")).map(s=>{var o={},m=s.match(/^\[(\d+):(\d+(?:\.\d+)?)\]\s*/);if(m){o.t=+m[1]*60+ +m[2];s=s.slice(m[0].length)}var p=s.split(/\s\|\s/);o.l=p[0];if(p[1])o.tr=p[1];if(p[2])o.ro=p[2];return o})}
