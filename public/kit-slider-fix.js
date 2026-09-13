(function(){
  function fix(){
    var el=document.querySelector('.pp-kit-slider');
    if(!el) return false;
    var track=el.querySelector('.pp-kit-track'), slides=el.querySelectorAll('.pp-kit-slide');
    if(!track || slides.length<2) return false;
    /* Correct the two loyalty-coin image locations used by the slider. */
    el.querySelectorAll('img').forEach(function(img){
      if((img.getAttribute('src')||'').indexOf('/products/shagun coin.png')!==-1) img.src='/offers/shagun coin.png';
      if((img.getAttribute('src')||'').indexOf('/visuals/para coin.png')!==-1) img.src='/offers/para coin.png';
    });
    /* Force the slider track/layout even if another stylesheet overrides it. */
    track.style.display='flex';
    track.style.width='100%';
    track.style.willChange='transform';
    slides.forEach(function(s){s.style.flex='0 0 100%';s.style.minWidth='100%'});
    if(el.dataset.ppFixInstalled==='1') return true;
    el.dataset.ppFixInstalled='1';
    var index=0,timer=null,startX=null,startY=null;
    function render(){
      index=(index+slides.length)%slides.length;
      track.style.transform='translate3d(-'+(index*100)+'%,0,0)';
      el.querySelectorAll('.pp-kit-dot').forEach(function(d,i){d.classList.toggle('active',i===index)});
    }
    function restart(){clearInterval(timer);timer=setInterval(function(){index++;render()},4800)}
    el.querySelector('.pp-kit-arrow.left')?.addEventListener('click',function(e){e.stopPropagation();index--;render();restart()});
    el.querySelector('.pp-kit-arrow.right')?.addEventListener('click',function(e){e.stopPropagation();index++;render();restart()});
    el.addEventListener('touchstart',function(e){if(e.touches.length===1){startX=e.touches[0].clientX;startY=e.touches[0].clientY}},{passive:true});
    el.addEventListener('touchend',function(e){if(startX===null)return;var dx=e.changedTouches[0].clientX-startX,dy=e.changedTouches[0].clientY-startY;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)){index+=dx<0?1:-1;render();restart()}startX=startY=null},{passive:true});
    el.addEventListener('mouseenter',function(){clearInterval(timer)});
    el.addEventListener('mouseleave',restart);
    render();restart();
    return true;
  }
  var n=0,t=setInterval(function(){if(fix()||++n>120)clearInterval(t)},150);
  if(document.readyState!=='loading') fix(); else document.addEventListener('DOMContentLoaded',fix);
})();
