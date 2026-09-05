let currentPhoto = 0;
const photoSlides = document.querySelectorAll('.photo-slide');
const photoDots = document.getElementById('photoDots');

function go(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById(id).scrollTop = 0;
  window.scrollTo(0,0);
}

function openEnvelope(){
  const env = document.getElementById('envelope');
  if(env.classList.contains('open')) return;
  env.classList.add('open');
  setTimeout(()=>go('screen-loading'), 2900);
  setTimeout(()=>go('screen-letter'), 5750);
}

function renderPhotoDots(){
  photoDots.innerHTML='';
  photoSlides.forEach((_,i)=>{
    const dot=document.createElement('span');
    if(i===currentPhoto) dot.classList.add('active');
    photoDots.appendChild(dot);
  });
}

function photoChange(dir){
  currentPhoto=(currentPhoto+dir+photoSlides.length)%photoSlides.length;
  photoSlides.forEach((slide,i)=>slide.classList.toggle('active',i===currentPhoto));
  renderPhotoDots();
}

let photoStartX=0;
const carousel=document.getElementById('photoCarousel');
carousel.addEventListener('touchstart',e=>photoStartX=e.changedTouches[0].clientX,{passive:true});
carousel.addEventListener('touchend',e=>{
  const diff=e.changedTouches[0].clientX-photoStartX;
  if(Math.abs(diff)>45) photoChange(diff<0?1:-1);
},{passive:true});

renderPhotoDots();

function restart(){
  currentPhoto=0;
  photoChange(0);
  const env=document.getElementById('envelope');
  env.classList.remove('open');
  go('screen-open');
}
