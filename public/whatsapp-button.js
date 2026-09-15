(function(){
  var phone='918178855766';
  var msg='Namaste Poojan Paradise, mujhe pooja samagri ke baare mein jankari chahiye.';
  function add(){
    if(document.getElementById('pp-whatsapp-float')) return;
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
