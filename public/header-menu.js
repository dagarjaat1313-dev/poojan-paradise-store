(function(){
  const STYLE_ID='pp-centered-header-menu-style';
  const STYLE=`
    header{position:relative!important;min-height:82px!important;display:flex!important;align-items:center!important;justify-content:flex-end!important;padding:10px 24px!important;z-index:1000!important}
    header .brand{position:absolute!important;left:50%!important;top:50%!important;transform:translate(-50%,-50%)!important;z-index:2!important;margin:0!important;display:flex!important;align-items:center!important;gap:10px!important;white-space:nowrap!important}
    header .brand>div:last-child{display:flex!important;flex-direction:column!important;align-items:flex-start!important}
    header .brand b,header .brand em{font-size:25px!important;line-height:.95!important;letter-spacing:1.5px!important}
    header .brand small{font-size:11px!important;margin-top:5px!important;white-space:nowrap!important}
    header .logo-mark{width:48px!important;height:48px!important}
    header nav{display:none!important}
    .pp-menu-button{width:46px!important;height:42px!important;border:1px solid rgba(122,31,31,.22)!important;border-radius:12px!important;background:#fffaf2!important;display:inline-flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:5px!important;cursor:pointer!important;box-shadow:0 4px 14px rgba(80,35,10,.08)!important;padding:0!important;z-index:5!important}
    .pp-menu-button span{display:block!important;width:23px!important;height:2.5px!important;border-radius:4px!important;background:#7a1f1f!important}
    .pp-menu-backdrop{position:fixed!important;inset:0!important;background:rgba(31,15,8,.38)!important;z-index:9998!important;opacity:0!important;pointer-events:none!important;transition:opacity .22s ease!important}
    .pp-menu-backdrop.open{opacity:1!important;pointer-events:auto!important}
    .pp-side-menu{position:fixed!important;top:0!important;right:0!important;width:min(310px,84vw)!important;height:100dvh!important;background:#fdf7ee!important;z-index:9999!important;box-shadow:-14px 0 35px rgba(47,20,8,.2)!important;transform:translateX(105%)!important;transition:transform .26s ease!important;display:flex!important;flex-direction:column!important;padding:24px 20px!important;box-sizing:border-box!important}
    .pp-side-menu.open{transform:translateX(0)!important}
    .pp-menu-head{display:flex!important;align-items:center!important;justify-content:space-between!important;padding-bottom:18px!important;border-bottom:1px solid rgba(201,162,39,.3)!important}
    .pp-menu-title{font-family:inherit!important;color:#7a1f1f!important;font-weight:800!important;font-size:21px!important;letter-spacing:.5px!important}
    .pp-menu-sub{display:block!important;color:#8a6a54!important;font-size:11px!important;margin-top:3px!important}
    .pp-menu-close{border:0!important;background:transparent!important;color:#7a1f1f!important;font-size:31px!important;line-height:1!important;cursor:pointer!important;padding:2px 7px!important}
    .pp-menu-links{display:flex!important;flex-direction:column!important;gap:7px!important;padding-top:18px!important}
    .pp-menu-links a{display:flex!important;align-items:center!important;min-height:48px!important;padding:0 15px!important;border-radius:12px!important;text-decoration:none!important;color:#4d2a1d!important;font-size:16px!important;font-weight:700!important;background:rgba(255,255,255,.55)!important;border:1px solid rgba(201,162,39,.14)!important;box-sizing:border-box!important;transition:background .15s ease,transform .15s ease!important}
    .pp-menu-links a:hover{background:#fff!important;transform:translateX(-2px)!important}
    .pp-menu-footer{margin-top:auto!important;padding-top:18px!important;color:#8a6a54!important;font-size:11px!important;text-align:center!important}
    body.pp-menu-open{overflow:hidden!important}
    @media(max-width:700px){
      header{min-height:74px!important;padding:8px 14px!important}
      header .brand{gap:7px!important}
      header .brand b,header .brand em{font-size:20px!important;letter-spacing:1px!important}
      header .brand small{font-size:9px!important;margin-top:3px!important}
      header .logo-mark{width:39px!important;height:39px!important}
      .pp-menu-button{width:42px!important;height:38px!important;border-radius:10px!important}
      .pp-menu-button span{width:21px!important;height:2.3px!important}
    }
  `;
  function install(){
    if(!document.getElementById(STYLE_ID)){const s=document.createElement('style');s.id=STYLE_ID;s.textContent=STYLE;document.head.appendChild(s)}
    const header=document.querySelector('header');
    const nav=header&&header.querySelector('nav');
    if(!header||!nav)return false;
    if(header.querySelector('.pp-menu-button'))return true;
    const links=[...nav.querySelectorAll('a')].map(a=>({text:(a.textContent||'').trim(),href:a.getAttribute('href')||'#'})).filter(x=>x.text);
    const actions=header.querySelector('.header-actions');
    const btn=document.createElement('button');
    btn.className='pp-menu-button';btn.type='button';btn.setAttribute('aria-label','Open navigation menu');btn.setAttribute('aria-expanded','false');
    btn.innerHTML='<span></span><span></span><span></span>';
    if(actions)actions.prepend(btn);else header.appendChild(btn);
    const backdrop=document.createElement('div');backdrop.className='pp-menu-backdrop';backdrop.setAttribute('aria-hidden','true');
    const drawer=document.createElement('aside');drawer.className='pp-side-menu';drawer.setAttribute('aria-label','Navigation menu');
    const navLinks=links.map(x=>'<a href="'+x.href.replace(/&/g,'&amp;').replace(/"/g,'&quot;')+'">'+x.text+'</a>').join('');
    drawer.innerHTML='<div class="pp-menu-head"><div><div class="pp-menu-title">Poojan Paradise</div><span class="pp-menu-sub">Shuddh Samagri • Shreshth Seva</span></div><button class="pp-menu-close" type="button" aria-label="Close navigation menu">×</button></div><nav class="pp-menu-links">'+navLinks+'</nav><div class="pp-menu-footer">Pure devotion • Better tomorrow</div>';
    document.body.append(backdrop,drawer);
    const close=()=>{drawer.classList.remove('open');backdrop.classList.remove('open');document.body.classList.remove('pp-menu-open');btn.setAttribute('aria-expanded','false')};
    const open=()=>{drawer.classList.add('open');backdrop.classList.add('open');document.body.classList.add('pp-menu-open');btn.setAttribute('aria-expanded','true')};
    btn.addEventListener('click',open);backdrop.addEventListener('click',close);drawer.querySelector('.pp-menu-close').addEventListener('click',close);drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
    return true;
  }
  let tries=0;const timer=setInterval(()=>{if(install()||++tries>80)clearInterval(timer)},150);
  new MutationObserver(()=>install()).observe(document.documentElement,{childList:true,subtree:true});
})();
