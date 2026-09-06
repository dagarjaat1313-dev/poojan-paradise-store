(function(){
  var NEW_IMAGE='https://user30197.na.imgto.link/public/20260906/190256.avif';
  function fix(){
    document.querySelectorAll('img').forEach(function(img){
      var src=img.getAttribute('src')||'';
      if(src.toLowerCase().indexOf('cow ghee batti')!==-1 && src!==NEW_IMAGE){
        img.setAttribute('src',NEW_IMAGE);
      }
    });
  }
  function biggerText(){
    if(document.getElementById('pp-bigger-text')) return;
    var s=document.createElement('style');
    s.id='pp-bigger-text';
    s.textContent="body nav a{font-size:34px!important}.topbar{font-size:20px!important}.trust-strip span{font-size:22px!important}.trust-strip strong{font-size:27px!important}.orn-title h2{font-size:48px!important}.category b{font-size:21px!important}.product-info h3{font-size:23px!important;line-height:1.3!important}.product-info strong{font-size:36px!important}.product-info .add{font-size:22px!important}.product-info .net-quantity{font-size:23px!important}.kit-content p{font-size:23px!important;line-height:1.55!important}.kit-points{font-size:21px!important}.why-grid strong{font-size:21px!important}.footer-brand~div a,.footer-brand~div p,.footer-brand~div small{font-size:21px!important}.copyright{font-size:19px!important}.detail-kicker{font-size:18px!important}.detail-info h2{font-size:40px!important}.detail-price{font-size:36px!important}.detail-info p{font-size:20px!important}.detail-actions button{font-size:20px!important}.detail-note{font-size:17px!important}.pp-about .pp-about-kicker{font-size:25px!important}.pp-about h2{font-size:68px!important}.pp-about p{font-size:26px!important}.pp-about-card h3{font-size:38px!important}.pp-about-card strong{font-size:26px!important}.pp-about-closing strong{font-size:31px!important}@media(max-width:700px){body nav a{font-size:21px!important}.topbar{font-size:18px!important}.trust-strip span{font-size:20px!important}.trust-strip strong{font-size:24px!important}.orn-title h2{font-size:39px!important}.category b{font-size:19px!important}.product-info h3{font-size:22px!important}.product-info strong{font-size:34px!important}.product-info .add{font-size:21px!important}.product-info .net-quantity{font-size:21px!important}.kit-content p{font-size:21px!important}.kit-points{font-size:20px!important}.why-grid strong{font-size:20px!important}.footer-brand~div a,.footer-brand~div p,.footer-brand~div small{font-size:20px!important}.copyright{font-size:18px!important}.detail-kicker{font-size:16px!important}.detail-info h2{font-size:34px!important}.detail-price{font-size:32px!important}.detail-info p{font-size:18px!important}.detail-actions button{font-size:18px!important}.detail-note{font-size:16px!important}.pp-about h2{font-size:58px!important}.pp-about p{font-size:23px!important}.pp-about-card h3{font-size:34px!important}.pp-about-card strong{font-size:23px!important}}@media(max-width:420px){.product-info h3{font-size:21px!important}.product-info strong{font-size:32px!important}.product-info .add{font-size:20px!important}.orn-title h2{font-size:35px!important}.pp-about h2{font-size:52px!important}.pp-about p{font-size:21px!important}}";
    document.head.appendChild(s);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){fix();biggerText()}); else {fix();biggerText();}
  new MutationObserver(function(){fix();biggerText()}).observe(document.documentElement,{childList:true,subtree:true});
})();