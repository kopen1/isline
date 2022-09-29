function sura(t){
window.location.href = "/surah/"+t;
} 
function selectsurah(){
  let select = document.getElementById("listsurah").value;
  window.location.href = "/surah/"+select;
}
function ayah(){
  let t = document.getElementById("ayah").value;
  window.location.href = "#"+t;
}

 
 
function cin(){
let logoimg = document.querySelector('#logoimg');
let img = ["bg.png","bg1.png","bg.webp"];
var i = Math.floor(Math.random() * img.length);
logoimg.src = "img/bg/"+ img[i];
}

function wait(){
document.querySelector('.home').innerHTML = `
<div class="popup">
<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
</div>
`;
}
function audio(id){
var x = id - 1;
url = `https://cdn.islamic.network/quran/audio/64/ar.alafasy/${id}.mp3`
pl = document.querySelectorAll("#pl")[x];
var audio = document.querySelectorAll("audio")[x];
audio.src = url;


if(audio.classList.contains("playaudio")){
audio.classList.toggle("playaudio");
pl.src = "img/pause.svg";
audio.play();
}else{
audio.classList.toggle("playaudio");
pl.src = "img/play.svg";
audio.pause();
audio.currentTime = 0;
}




}




const nav = document.querySelector('nav');
const n = document.getElementById('night');
let box = document.querySelector('.box');
const cn = document.querySelectorAll('.cnt');
let base = window.location.pathname;


let bb = base.split("/")[1];
let bbb = base.split("/");

if(bb == "home" || bb == "/" || bb == ""){
const flip = document.querySelector('.logo');
flip.addEventListener("click",function(){
flip.classList.toggle("logob");
});
setInterval(function(){cin()},10000);
}



// Mode Night
n.addEventListener("click",function(){
  document.body.classList.toggle("night");
  const cn = document.querySelectorAll('.cnt');
  const bdn = document.querySelectorAll('.bdn');
  const ayat = document.querySelectorAll('#ayat');
  nav.classList.toggle("text-bg-info");
  
  ayat.forEach(e => {
  e.classList.toggle("bg-gray");
  e.classList.toggle("text-white");
  });
  
  bdn.forEach(e => {
  e.classList.toggle("text-bg-body");
  });
  
  cn.forEach(e => {
  e.classList.toggle("bg-gr");
  e.classList.toggle("night");
});
});
// Navbar Stiky
window.addEventListener('scroll', function() {
if(window.scrollY > 50){
nav.classList.add('fixed-top');
nav.classList.add('bg-light');
}else{
nav.classList.remove('bg-light');
nav.classList.remove('fixed-top');
}
  });

if(bbb[1] == "surah"){
c = document.getElementById("jumayat").value;
let oo = "";
for(x=0;x<c;x++){
i = x + 1;
oo += `<option value="${i}">${i}</option>`;
}

layah  = `
<select id="ayah" class="w-auto" onchange="ayah()">
<option selected>List Ayah</option>
${oo}
</select>`;

select = document.getElementById("select");
let terjemah = `
<div class="form-check form-switch fluid-form w-auto">
<label class="form-check-label" for="terjemah">Terjemah</label>
<input id="terjemah" class="form-check-input" type="checkbox" role="switch" >
</div>`;

$("#listayah").html(terjemah+layah);
//$("#listayah").html(terjemah);




}
