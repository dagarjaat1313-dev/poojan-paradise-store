import React,{useMemo,useState}from'react';import'./CustomizeKitPremium.css';

// Poojan Paradise ₹1,299 kit: selected products from the catalogue.
const ITEMS=[
['Peela Kapda',75],['Lal Kapda',53],['Pooja Ghee',76],['Bheem Seni Kapoor',261],
['Honey',66],['Dhoop Batti',44],['Perfume / Itra',44],['Mauli Kalava',15],['Cow Ghee Batti',95],
['Hawan Samagri',45],['Peeli Kaudi',95],['Gomti Chakra',75],['Rudraksh Mala',225]
];
const PRICE=1299;
const DEFAULT_QTY=Object.fromEntries(ITEMS.map(([name])=>[name,1]));

export default function CustomizeKit(){
const[selected,setSelected]=useState(()=>({...DEFAULT_QTY}));
const total=useMemo(()=>ITEMS.reduce((sum,[name,price])=>sum+price*(selected[name]||0),0),[selected]);
const remaining=Math.max(0,PRICE-total);
const over=total-PRICE;
const canOrder=total===PRICE;
const add=name=>setSelected(s=>({...s,[name]:(s[name]||0)+1}));
const remove=name=>setSelected(s=>({...s,[name]:Math.max(0,(s[name]||0)-1)}));
const addToCart=()=>{if(!canOrder)return;try{const cart=JSON.parse(localStorage.getItem('pp_cart')||'[]');const key='customized-poojan-kit';const variant=ITEMS.filter(([n])=>selected[n]>0).map(([n])=>`${n} × ${selected[n]}`).join(', ');const item={name:'Customized Poojan Kit',price:PRICE,priceText:'₹1,299',image:'/visuals/poojan-premium-kit~2 (1).jpg',variant:variant||'Custom selection',qty:1,key};const found=cart.find(x=>x.key===key);const next=found?cart.map(x=>x.key===key?{...x,qty:x.qty+1,variant}:x):[...cart,item];localStorage.setItem('pp_cart',JSON.stringify(next));window.location.href='/#kit';}catch{alert('Unable to add the customized kit. Please try again.')}};
return <div className="custom-kit-page"><header><a className="brand" href="/#home"><div className="logo-mark"><span>ॐ</span><b>PP</b></div><div><b>POOJAN</b><em>PARADISE</em><small>Pure Pooja Essentials • Exceptional Service</small></div></a></header><main className="custom-kit"><a className="back-link" href="/#kit">← Back to Poojan Kit</a><div className="orn-title"><span>⌁</span><h1>Customize Your Poojan Kit</h1><span>⌁</span></div><p className="custom-kit-sub">Your ₹1,299 kit starts with these <b>13 selected pooja essentials</b>. Remove, add or adjust quantities as you like. To purchase the kit, your selected contents must total <b>exactly ₹1,299</b>.</p><div className="kit-price-card"><span>FIXED POOJAN KIT VALUE</span><strong>₹1,299</strong><div className="kit-progress"><i style={{width:`${Math.min(100,(total/PRICE)*100)}%`}}/></div><b>{total<PRICE?`₹${remaining} more required to complete your kit`:over>0?`₹${over} over ₹1,299 — remove or reduce items`:'✓ ₹1,299 kit is complete and ready to buy'}</b></div><section className="custom-items">{ITEMS.map(([name,price])=><article key={name} className={selected[name]?'chosen':''}><div><h3>{name}</h3><span>₹{price} each</span></div><div className="item-controls"><button type="button" onClick={()=>remove(name)} disabled={!selected[name]} aria-label={`Remove ${name}`}>−</button><b>{selected[name]||0}</b><button type="button" onClick={()=>add(name)} aria-label={`Add ${name}`}>+</button></div></article>)}</section><div className="custom-kit-bottom"><div><span>Selected Kit Value</span><strong>₹{total.toLocaleString('en-IN')}</strong></div><button type="button" onClick={addToCart} disabled={!canOrder}>{canOrder?'Add Customized Kit to Cart':total<PRICE?`Add ₹${remaining} More`:'Reduce ₹'+over}</button></div></main></div>}
