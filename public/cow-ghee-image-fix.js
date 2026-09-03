(function(){
  var NEW_IMAGE='/products/cow ghee batti.jpg';
  function fix(){
    document.querySelectorAll('img').forEach(function(img){
      var src=img.getAttribute('src')||'';
      if(src.toLowerCase().indexOf('cow ghee batti')!==-1 && src!==NEW_IMAGE){
        img.setAttribute('src',NEW_IMAGE);
      }
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fix); else fix();
  new MutationObserver(fix).observe(document.documentElement,{childList:true,subtree:true});
})();