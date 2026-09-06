/* Performance guard: keep the storefront responsive on mobile by deferring heavy images. */
(function(){
  try{
    var oldSet=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,'src');
    if(oldSet&&oldSet.set){
      var pending=new WeakMap();
      Object.defineProperty(HTMLImageElement.prototype,'src',{configurable:true,enumerable:oldSet.enumerable,get:oldSet.get,set:function(v){
        if(typeof v==='string'&&v){
          pending.set(this,v);
          if(this.dataset.ppReady==='1') oldSet.set.call(this,v);
          else { this.dataset.ppSrc=v; this.setAttribute('data-pp-src',v); }
        } else oldSet.set.call(this,v);
      }});
      var release=function(img){
        if(!img||img.dataset.ppReady==='1')return;
        var v=img.dataset.ppSrc||img.getAttribute('data-pp-src');
        if(v){img.dataset.ppReady='1';img.removeAttribute('data-pp-src');oldSet.set.call(img,v)}
      };
      var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)release(e.target)})},{rootMargin:'250px 0px'});
      var scan=function(){document.querySelectorAll('img[data-pp-src]').forEach(function(img){io.observe(img)})};
      new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true});
      scan();
      window.addEventListener('load',function(){document.querySelectorAll('img[data-pp-src]').forEach(function(img,i){if(i<4)release(img)})},{once:true});
    }
    /* Disable the old auto-open offer overlay that was forcing two ~3MB coin images at startup. */
    var removePopup=function(){var p=document.getElementById('pp-offer-live');if(p)p.remove()};
    removePopup();
    new MutationObserver(removePopup).observe(document.body,{childList:true});
  }catch(e){console.warn('Poojan Paradise performance guard:',e)}
})();