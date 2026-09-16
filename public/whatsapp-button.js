(function(){
  var phone='918178855766';
  var msg='Namaste Poojan Paradise, mujhe pooja samagri ke baare mein jankari chahiye.';
  function add(){
    if(document.getElementById('pp-whatsapp-float')) return;
    var s=document.createElement('style');
    s.textContent='#pp-whatsapp-float-static{display:none!important}#pp-whatsapp-float{position:fixed;right:20px;bottom:22px;z-index:999999;display:flex;align-items:center;gap:10px;padding:15px 20px;border-radius:999px;background:#25D366;color:#fff;text-decoration:none;font:700 16px/1 Arial,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.22);transition:transform .2s,box-shadow .2s}#pp-whatsapp-float:hover{transform:translateY(-2px);box-shadow:0 11px 28px rgba(0,0,0,.28)}.pp-wa-icon{width:30px;height:30px;display:block;object-fit:contain}.pp-wa-text{white-space:nowrap}@media(max-width:600px){#pp-whatsapp-float{right:14px;bottom:16px;padding:14px 17px;font-size:15px;gap:9px}.pp-wa-icon{width:28px;height:28px}}';
    document.head.appendChild(s);
    var a=document.createElement('a');
    a.id='pp-whatsapp-float';
    a.href='https://wa.me/'+phone+'?text='+encodeURIComponent(msg);
    a.target='_blank';
    a.rel='noopener noreferrer';
    a.setAttribute('aria-label','Chat with Poojan Paradise on WhatsApp');
    a.innerHTML='<img class="pp-wa-icon" src="https://cdn.simpleicons.org/whatsapp/ffffff" alt="WhatsApp"><span class="pp-wa-text">WhatsApp</span>';
    document.body.appendChild(a);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',add); else add();
})();
