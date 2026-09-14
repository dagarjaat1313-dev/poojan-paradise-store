(function(){
  'use strict';
  if(window.__PP_PREMIUM_HEADER_MENU__)return;
  window.__PP_PREMIUM_HEADER_MENU__=true;
  var css=`
  header{position:sticky!important;min-height:92px!important;height:92px!important;display:grid!important;grid-template-columns:1fr auto 1fr!important;align-items:center!important;padding:0 clamp(18px,4vw,70px)!important;gap:20px!important}
  header .brand{grid-column:2;grid-row:1;justify-self:center;min-width:0!important;gap:12px!important;transform:none!important}
  header .brand>div:last-child{text-align:center!important}
  header .brand>div:last-child>b{font-size:30px!important;line-height:1.05!important;letter-spacing:1.8px!important}
  header .brand em{font-size:18px!important;letter-spacing:3px!important}
  header .brand small{font-size:10px!important;letter-spacing:.6px!important}
  header .logo-mark{width:64px!important;height:64px!important}
  header nav{display:none!important}
  header .header-actions{grid-column:3;grid-row:1;justify-self:end;margin:0!important;display:flex!important;align-items:center!important;gap:8px!important}
  .pp-menu-trigger{width:42px!important;height:42px!important;border:1px solid #d7b77c!important;border-radius:50%!important;background:#fffaf0!important;color:#6f100b!important;display:inline-flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:5px!important;cursor:pointer!important;box-shadow:0 3px 12px rgba(91,38,10,.10)!important;padding:0!important}
  .pp-menu-trigger span{display:block!important;width:20px!important;height:2px!important;border-radius:2px!important;background:#6f100b!important}
  .pp-menu-overlay{position:fixed!important;inset:0!important;background:rgba(29,8,4,.42)!important;backdrop-filter:blur(2px)!important;z-index:9998!important;opacity:0!important;visibility:hidden!important;transition:.22s ease!important}
  .pp-menu-overlay.open{opacity:1!important;visibility:visible!important}
  .pp-menu-drawer{position:absolute!important;top:0!important;right:0!important;width:min(330px,82vw)!important;height:100%!important;background:#fffdf8!important;box-shadow:-16px 0 45px rgba(42,12,4,.22)!important;border-left:1px solid #e4cfaa!important;padding:28px 22px!important;transform:translateX(100%)!important;transition:.25s ease!important;display:flex!important;flex-direction:column!important}
  .pp-menu-overlay.open .pp-menu-drawer{transform:translateX(0)!important}
  .pp-menu-head{display:flex!important;align-items:center!important;justify-content:space-between!important;padding-bottom:18px!important;border-bottom:1px solid #eadbc5!important;margin-bottom:12px!important}
  .pp-menu-title{font:700 23px 'Playfair Display',Georgia,serif!important;color:#6f100b!important}
  .pp-menu-close{width:38px!important;height:38px!important;border:1px solid #ddc69b!important;border-radius:50%!important;background:#fff8e9!important;color:#6f100b!important;font-size:25px!important;line-height:1!important;cursor:pointer!important}
  .pp-menu-sub{font-size:10px!important;color:#9a7650!important;letter-spacing:1px!important;margin-top:2px!important}
  .pp-menu-links{display:flex!important;flex-direction:column!important;gap:4px!important;margin-top:8px!important}
  .pp-menu-links a{display:flex!important;align-items:center!important;min-height:50px!important;padding:0 14px!important;border-radius:8px!important;color:#4d3022!important;text-decoration:none!important;font-size:16px!important;font-weight:700!important;transition:.18s ease!important}
  .pp-menu-links a:hover{background:#f8eedc!important;color:#7b130e!important;padding-left:18px!important}
  @media(max-width:700px){
    header{height:72px!important;min-height:72px!important;grid-template-columns:52px 1fr auto!important;padding:0 12px!important;gap:7px!important}
    header .brand{grid-column:2!important;justify-self:center!important;gap:6px!important}
    header .brand .logo-mark{width:46px!important;height:46px!important}
    header .brand>div:last-child>b{font-size:21px!important;letter-spacing:1.1px!important}
    header .brand em{font-size:12px!important;letter-spacing:2px!important}
    header .brand small{font-size:7px!important}
    header .header-actions{grid-column:3!important;gap:4px!important}
    header .header-actions .pp-menu-trigger{order:5!important;width:40px!important;height:40px!important}
  }
  `;
  function installStyle(){if(document.getElementById('pp-premium-header-style'))return;var s=document.createElement('style');s.id='pp-premium-header-style';s.textContent=css;document.head.appendChild(s)}
  function setup(){
    installStyle();
    var header=document.querySelector('header');
    if(!header)return;
    var actions=header.querySelector('.header-actions');
    var nav=header.querySelector('nav');
    if(nav)nav.style.display='none';
    if(!actions)return;
    if(actions.querySelector('.pp-menu-trigger'))return;
    var trigger=document.createElement('button');
    trigger.className='pp-menu-trigger';trigger.type='button';trigger.setAttribute('aria-label','Open menu');trigger.setAttribute('aria-expanded','false');
    trigger.innerHTML='<span></span><span></span><span></span>';
    actions.appendChild(trigger);
    var overlay=document.createElement('div');overlay.className='pp-menu-overlay';overlay.innerHTML='<aside class="pp-menu-drawer" aria-label="Main navigation"><div class="pp-menu-head"><div><div class="pp-menu-title">Poojan Paradise</div><div class="pp-menu-sub">SHUDDH SAMAGRI • SHRESHTH SEVA</div></div><button class="pp-menu-close" type="button" aria-label="Close menu">×</button></div><nav class="pp-menu-links"><a href="/#home">Home</a><a href="/#shop">Shop</a><a href="/#kit">Poojan Kit</a><a href="/about">About Us</a><a href="/#contact">Contact</a></nav></aside>';
    document.body.appendChild(overlay);
    var close=function(){overlay.classList.remove('open');trigger.setAttribute('aria-expanded','false');document.body.style.overflow=''};
    trigger.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();overlay.classList.add('open');trigger.setAttribute('aria-expanded','true');document.body.style.overflow='hidden'});
    overlay.addEventListener('click',function(e){if(e.target===overlay)close()});
    overlay.querySelector('.pp-menu-close').addEventListener('click',close);
    overlay.querySelectorAll('a').forEach(function(a){a.addEventListener('click',close)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  }
  var observer=new MutationObserver(function(){setup()});
  observer.observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
