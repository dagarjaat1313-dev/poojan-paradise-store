(function(){
  var phone='918178855766';
  var msg='Namaste Poojan Paradise, mujhe pooja samagri ke baare mein jankari chahiye.';
  function add(){
    if(document.getElementById('pp-whatsapp-float')) return;
    var s=document.createElement('style');
    s.textContent='#pp-whatsapp-float{position:fixed;right:20px;bottom:22px;z-index:99999;display:flex;align-items:center;gap:9px;padding:13px 18px;border-radius:999px;background:#25D366;color:#fff;text-decoration:none;font:700 15px/1 Arial,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.22);transition:transform .2s,box-shadow .2s}#pp-whatsapp-float:hover{transform:translateY(-2px);box-shadow:0 11px 28px rgba(0,0,0,.28)}.pp-wa-icon{width:23px;height:23px;border:2px solid #fff;border-radius:50%;display:grid;place-items:center;font-size:13px}.pp-wa-text{white-space:nowrap}@media(max-width:600px){#pp-whatsapp-float{right:14px;bottom:16px;padding:12px 15px;font-size:14px}.pp-wa-icon{width:21px;height:21px}}';
    document.head.appendChild(s);
    var a=document.createElement('a');
    a.id='pp-whatsapp-float';
    a.href='https://wa.me/'+phone+'?text='+encodeURIComponent(msg);
    a.target='_blank';
    a.rel='noopener noreferrer';
    a.setAttribute('aria-label','Chat with Poojan Paradise on WhatsApp');
    a.innerHTML='<span class="pp-wa-icon">◉</span><span class="pp-wa-text">WhatsApp</span>';
    document.body.appendChild(a);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',add); else add();
})();
