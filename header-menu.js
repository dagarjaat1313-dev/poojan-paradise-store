(function(){
  'use strict';
  if(window.__PP_HEADER_MENU__) return;
  window.__PP_HEADER_MENU__=true;

  function init(){
    var header=document.querySelector('header');
    if(!header){ setTimeout(init,120); return; }
    if(header.querySelector('.pp-menu-button')) return;

    var style=document.createElement('style');
    style.id='pp-header-menu-style';
    style.textContent=`
      header{position:sticky!important;}
      header .pp-menu-button{display:flex!important;flex:0 0 46px!important;width:46px!important;height:46px!important;margin:0 6px 0 0!important;padding:0!important;border:1px solid #d5b56f!important;border-radius:10px!important;background:#fffaf0!important;color:#7a1f1f!important;align-items:center!important;justify-content:center!important;flex-direction:column!important;gap:5px!important;cursor:pointer!important;box-shadow:0 3px 10px rgba(76,35,12,.10)!important;z-index:60!important;}
      header .pp-menu-button span{display:block!important;width:24px!important;height:2.5px!important;border-radius:4px!important;background:#7a1f1f!important;transition:.2s!important;}
      header .pp-menu-button:hover{background:#fff3d8!important;transform:translateY(-1px)!important;}
      header>nav{display:none!important;}
      .pp-menu-overlay{position:fixed;inset:0;background:rgba(24,7,4,.48);backdrop-filter:blur(3px);z-index:99998;opacity:0;visibility:hidden;transition:.22s ease;}
      .pp-menu-overlay.open{opacity:1;visibility:visible;}
      .pp-side-menu{position:absolute;left:0;top:0;height:100%;width:min(350px,86vw);background:#fffdf8;border-right:1px solid #dfc99e;box-shadow:18px 0 45px rgba(38,10,5,.22);transform:translateX(-105%);transition:.25s ease;display:flex;flex-direction:column;overflow:auto;}
      .pp-menu-overlay.open .pp-side-menu{transform:translateX(0);}
      .pp-menu-head{height:92px;display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid #eadbc5;background:linear-gradient(135deg,#fffdf8,#f8ecd4);}
      .pp-menu-title{font:700 22px/1.1 'Playfair Display',Georgia,serif;color:#7a1f1f;}
      .pp-menu-sub{display:block;margin-top:5px;font:600 10px/1.2 'DM Sans',Arial,sans-serif;color:#a8793d;letter-spacing:.8px;}
      .pp-menu-close{width:38px;height:38px;border:1px solid #d8bf8e;border-radius:50%;background:#fff;color:#7a1f1f;font-size:25px;line-height:1;cursor:pointer;}
      .pp-menu-links{padding:14px 12px 22px;}
      .pp-menu-links a{display:flex;align-items:center;gap:14px;padding:15px 14px;margin:3px 0;border-radius:9px;text-decoration:none;color:#4b3023;font:700 16px/1.2 'DM Sans',Arial,sans-serif;}
      .pp-menu-links a:hover{background:#f8ecd8;color:#7a1f1f;}
      .pp-menu-links a .pp-menu-icon{width:27px;text-align:center;color:#a8793d;font-size:19px;}
      .pp-menu-divider{height:1px;background:#eadbc5;margin:10px 14px;}
      @media(max-width:700px){
        header{height:68px!important;padding:0 12px!important;display:flex!important;gap:7px!important;}
        header .pp-menu-button{width:42px!important;height:42px!important;flex-basis:42px!important;margin-right:1px!important;border-radius:9px!important;}
        header .pp-menu-button span{width:22px!important;}
      }
    `;
    document.head.appendChild(style);

    var button=document.createElement('button');
    button.className='pp-menu-button';
    button.type='button';
    button.setAttribute('aria-label','Open menu');
    button.setAttribute('aria-expanded','false');
    button.innerHTML='<span></span><span></span><span></span>';
    header.insertBefore(button,header.firstChild);

    var overlay=document.createElement('div');
    overlay.className='pp-menu-overlay';
    overlay.innerHTML='<aside class="pp-side-menu" aria-label="Website menu"><div class="pp-menu-head"><div><div class="pp-menu-title">Poojan Paradise</div><small class="pp-menu-sub">Shuddh Samagri • Shreshth Seva</small></div><button class="pp-menu-close" type="button" aria-label="Close menu">×</button></div><div class="pp-menu-links"></div></aside>';
    document.body.appendChild(overlay);

    var links=overlay.querySelector('.pp-menu-links');
    var sourceLinks=Array.from(header.querySelectorAll('nav a'));
    sourceLinks.forEach(function(a){
      var copy=a.cloneNode(true);
      copy.innerHTML='<span class="pp-menu-icon">'+iconFor(a.textContent.trim())+'</span><span>'+a.textContent.trim()+'</span>';
      links.appendChild(copy);
    });
    var divider=document.createElement('div'); divider.className='pp-menu-divider'; links.appendChild(divider);
    addLink('Loyalty Program','/#loyalty','★');
    addLink('Login / Signup','/login','♙');

    function iconFor(t){
      if(t==='Home') return '⌂';
      if(t==='Shop') return '▦';
      if(t==='Poojan Kit') return '✦';
      if(t==='About Us') return '◎';
      if(t==='Contact') return '✆';
      return '•';
    }
    function addLink(label,href,icon){
      var a=document.createElement('a'); a.href=href; a.innerHTML='<span class="pp-menu-icon">'+icon+'</span><span>'+label+'</span>'; links.appendChild(a);
    }
    function open(){overlay.classList.add('open');button.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';}
    function close(){overlay.classList.remove('open');button.setAttribute('aria-expanded','false');document.body.style.overflow='';}
    button.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();overlay.classList.contains('open')?close():open();});
    overlay.querySelector('.pp-menu-close').addEventListener('click',close);
    overlay.addEventListener('click',function(e){if(e.target===overlay)close();});
    links.addEventListener('click',function(e){if(e.target.closest('a')) close();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
  var observer=new MutationObserver(function(){if(!document.querySelector('.pp-menu-button')) init();});
  observer.observe(document.documentElement,{childList:true,subtree:true});
})();
