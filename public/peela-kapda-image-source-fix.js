(function(){
  var A='https://kommodo.ai/i/3KxQ74jiSVmk6toCsH2j';
  var B='https://kommodo.ai/i/cSY4ETSiMhN8E9z9jlD0';
  function fix(){
    if(!location.pathname.includes('/product/peela-kapda')) return;
    document.querySelectorAll('img').forEach(function(img){
      var s=(img.getAttribute('src')||'')+' '+(img.getAttribute('data-lazy-src')||'');
      if(s.includes('peela kapda 6.svg')){img.removeAttribute('data-lazy-src');img.src=A;}
      else if(s.includes('peela kapda 7.svg')){img.removeAttribute('data-lazy-src');img.src=B;}
    });
  }
  new MutationObserver(fix).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['src','data-lazy-src']});
  document.addEventListener('DOMContentLoaded',fix);
  setTimeout(fix,100);setTimeout(fix,500);setTimeout(fix,1500);setTimeout(fix,3000);
})();