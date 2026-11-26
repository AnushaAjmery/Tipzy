const CONFIG={wa:'923001234567',ig:'tipzy.pk',email:'hello@tipzy.pk',hours:'Mon–Sat, 11am–8pm'};
const rs=n=>'Rs '+Math.round(n).toLocaleString('en-US');
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const PRODUCTS=[
{id:'classic',name:'Classic Custom Set',price:1500,img:'wine-1.jpg',alt:'Glossy wine-red almond press-on nails',tag:'plain',d:'Plain glossy or matte colour in your shape, length and sizes.'},
{id:'designer',name:'Designer Custom Set',price:2200,img:'french-2.jpg',alt:'French tip press-on nails on a card',tag:'french',d:'French tips, hand-painted art and chrome finishes.'},
{id:'premium',name:'Premium 3D / Bridal Set',price:3200,img:'floral-1.jpg',alt:'Pink 3D flower and bow press-on nails',tag:'3d',d:'3D charms, pearls and rhinestones for weddings and events.'},
{id:'kit',name:'Application Kit',price:250,img:'glue.jpg',alt:'Nail glue bottle with brush',tag:'kit',d:'Brush-on nail glue plus 150 sticky tabs (5 sheets).'}];
const GALLERY=[['wine-2.jpg','Wine red almond nails with ring','plain'],['french-1.jpg','French tip almond nails','french'],['floral-2.jpg','Floral 3D nails on hand','3d'],['tabs.jpg','Sticky tabs, 5 sheets','kit'],['french-2.jpg','French tip nail card','french'],['floral-1.jpg','Floral bow nails card','3d']];
const SLIDES=[['floral-1.jpg','Pink Bow Garden','Soft French tips with 3D flowers, pearls and a butterfly bow.','premium'],['wine-1.jpg','Wine Noir','Deep glossy burgundy almonds. Our most-loved classic.','classic'],['french-1.jpg','Clean French','A timeless French tip in your exact sizes.','designer']];
const REVIEWS=[['Ayesha, Karachi','Fit perfectly because I sent my sizes in mm. Lasted 2 weeks!'],['Hira, Lahore','The 3D set got so many compliments at my mehndi.'],['Sana, Islamabad','Delivery was quick and the kit made application easy.']];
const NAV=[['index.html','Home'],['products.html','Shop'],['order.html','Order'],['plan.html','Plan'],['calculator.html','Calculator']];
function layout(){
 const page=location.pathname.split('/').pop()||'index.html';
 $('#site-header').outerHTML=`<header><a class="skip" href="#main">Skip to content</a><div class="wrap bar"><a class="brand" href="index.html"><img src="images/logo.svg" alt="" width="40" height="40">Tipzy</a><button class="menu" aria-expanded="false" aria-controls="nav">Menu</button><nav id="nav" aria-label="Main"><ul>${NAV.map(([h,t])=>`<li><a href="${h}" ${h===page?'class="on" aria-current="page"':''}>${t}</a></li>`).join('')}</ul></nav></div></header>`;
 $('#site-footer').outerHTML=`<footer><div class="wrap grid"><div><h3 style="color:#fff">Tipzy</h3><p>Custom made-to-order press-on nails, made in Karachi.</p></div><ul><li>WhatsApp: <a href="https://wa.me/${CONFIG.wa}">+${CONFIG.wa}</a></li><li>Instagram: <a href="https://instagram.com/${CONFIG.ig}">@${CONFIG.ig}</a></li><li>Email: <a href="mailto:${CONFIG.email}">${CONFIG.email}</a></li></ul><ul><li>Karachi, Pakistan</li><li>${CONFIG.hours}</li><li>© ${new Date().getFullYear()} Tipzy</li></ul></div></footer>`;
 const m=$('.menu'),n=$('#nav');m.onclick=()=>{const o=n.classList.toggle('open');m.setAttribute('aria-expanded',o)};
}
const card=p=>`<article class="card fade"><img src="images/${p.img}" alt="${p.alt}" loading="lazy"><h3>${p.name}</h3><p>${p.d}</p><p class="price">${rs(p.price)}</p><a class="btn alt" href="order.html?set=${p.id}">Order</a></article>`;
function slider(el,items,render){
 el.innerHTML=`<div class="slider" aria-roledescription="carousel"><div class="track">${items.map(render).join('')}</div></div><div class="ctl"><button aria-label="Previous">‹</button>${items.map((_,i)=>`<button class="dot" aria-label="Slide ${i+1}"></button>`).join('')}<button aria-label="Next">›</button></div>`;
 const t=$('.track',el),ds=$$('.dot',el),b=$$('.ctl button',el);let i=0,x0=0,timer;
 const go=k=>{i=(k+items.length)%items.length;t.style.transform=`translateX(-${i*100}%)`;ds.forEach((d,j)=>d.classList.toggle('on',j===i))};
 b[0].onclick=()=>go(i-1);b[b.length-1].onclick=()=>go(i+1);ds.forEach((d,j)=>d.onclick=()=>go(j));
 t.addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});t.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40)go(i+(d<0?1:-1))});
 if(!matchMedia('(prefers-reduced-motion:reduce)').matches){const s=()=>timer=setInterval(()=>go(i+1),5000);s();el.onmouseenter=()=>clearInterval(timer);el.onmouseleave=s}
 go(0);
}
function home(){
 $('#featured').innerHTML=PRODUCTS.slice(0,3).map(card).join('');
 slider($('#slider'),SLIDES,s=>`<div class="slide"><img src="images/${s[0]}" alt="${s[1]}"><div><h3>${s[1]}</h3><p>${s[2]}</p><a class="btn" href="order.html?set=${s[3]}">Customise this</a></div></div>`);
 slider($('#reviews'),REVIEWS,r=>`<div class="slide center" style="display:block;padding:40px 24px"><p style="font-size:1.15rem">“${r[1]}”</p><b>${r[0]}</b></div>`);
}
function shop(){
 $('#products').innerHTML=PRODUCTS.map(card).join('');
 const g=$('#gallery'),draw=f=>g.innerHTML=GALLERY.filter(x=>f==='all'||x[2]===f).map(x=>`<img class="card" style="padding:8px;aspect-ratio:4/5;object-fit:cover" src="images/${x[0]}" alt="${x[1]}" loading="lazy">`).join('');
 $$('.chips button').forEach(b=>b.onclick=()=>{$$('.chips button').forEach(x=>x.classList.remove('on'));b.classList.add('on');draw(b.dataset.f)});draw('all');
}
function order(){
 const f=$('#orderForm'),set=$('#set'),kit=$('#kit');
 set.innerHTML=PRODUCTS.slice(0,3).map(p=>`<option value="${p.id}">${p.name} – ${rs(p.price)}</option>`).join('');
 const q=new URLSearchParams(location.search).get('set');if(q&&q!=='kit')set.value=q;if(q==='kit')kit.checked=true;
 const sz=$('#sizes');sz.innerHTML=['L','R'].flatMap(h=>['Thumb','Index','Middle','Ring','Pinky'].map(n=>`<div><label>${h} ${n}</label><input type="number" min="5" max="25" step="0.5" name="size" placeholder="mm" aria-label="${h} ${n} in mm"></div>`)).join('');
 const calc=()=>{const price=PRODUCTS.find(p=>p.id===set.value).price,sub=price+(kit.checked?250:0),del=sub>3000?0:200;
  $('#tSet').textContent=rs(price);$('#tKit').textContent=kit.checked?rs(250):'Rs 0';$('#tDel').textContent=del?rs(del):'Free';$('#tAll').textContent=rs(sub+del);return sub+del};
 f.addEventListener('input',calc);calc();
 const valid=()=>{let ok=true;[['name',v=>v.trim().length>1,'Enter your name'],['phone',v=>/^(\+?92|0)3\d{9}$/.test(v.replace(/[\s-]/g,'')),'Enter a valid Pakistani mobile, e.g. 0300 1234567'],['address',v=>v.trim().length>5,'Enter your address']].forEach(([id,t,m])=>{const e=$('#'+id),er=$('#e-'+id);const good=t(e.value);er.textContent=good?'':m;if(!good)ok=false});return ok};
 const msg=()=>{const v=id=>$('#'+id).value,sizes=$$('[name=size]',f).map(i=>i.value||'-');
  return `Hi Tipzy! I'd like to order:\nName: ${v('name')}\nPhone: ${v('phone')}\nCity: ${v('city')}\nAddress: ${v('address')}\nSet: ${set.options[set.selectedIndex].text}\nShape: ${v('shape')} | Length: ${v('length')} | Finish: ${v('finish')} | Design: ${v('design')}\nSizes mm (L thumb→pinky, R thumb→pinky): ${sizes.join(', ')}\nApplication kit: ${kit.checked?'Yes':'No'}\nNotes: ${v('notes')||'-'}\nTotal: ${rs(calc())}`};
 f.onsubmit=e=>{e.preventDefault();if(!valid())return;f.hidden=true;$('#thanks').hidden=false;$('#thanks p').textContent=`Thank you, ${$('#name').value}! We'll confirm your ${rs(calc())} order on WhatsApp soon.`;scrollTo(0,0)};
 $('#waBtn').onclick=()=>{if(valid())open(`https://wa.me/${CONFIG.wa}?text=${encodeURIComponent(msg())}`,'_blank')};
}
const D={u:[25,25,10,40],p:[1500,2200,3200,250],m:[450,700,1100,120],o:[15000,12000,6000,3000,500,3000],s:75000};
function calculator(){
 const ids=[...['u','p','m'].flatMap(k=>[0,1,2,3].map(i=>k+i)),...[0,1,2,3,4,5].map(i=>'o'+i),'s0'];
 const num=id=>Math.max(0,parseFloat($('#'+id).value)||0);
 const set=()=>{D.u.forEach((v,i)=>{$('#u'+i).value=v;$('#p'+i).value=D.p[i];$('#m'+i).value=D.m[i]});D.o.forEach((v,i)=>$('#o'+i).value=v);$('#s0').value=D.s};
 const run=()=>{let sales=0,mat=0;for(let i=0;i<4;i++){sales+=num('u'+i)*num('p'+i);mat+=num('u'+i)*num('m'+i)}
  const oth=[0,1,2,3,4,5].reduce((a,i)=>a+num('o'+i),0),exp=mat+oth,profit=sales-exp,start=num('s0');
  const be=sales>0&&mat<sales?oth/(1-mat/sales):null,pay=profit>0?start/profit:null;
  const o={sales:rs(sales),other:rs(oth),exp:rs(exp),profit:(profit<0?'-':'')+rs(Math.abs(profit)),margin:sales?(profit/sales*100).toFixed(1)+'%':'N/A',be:be===null?'N/A':rs(be),pay:pay===null?'Not reached':pay.toFixed(1)+' months'};
  Object.entries(o).forEach(([k,v])=>$('#r-'+k).textContent=v)};
 set();run();$('#calc').addEventListener('input',run);$('#reset').onclick=()=>{set();run()};
}
document.addEventListener('DOMContentLoaded',()=>{layout();({home,shop,order,calculator})[document.body.dataset.page]?.();
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}));$$('.fade').forEach(e=>io.observe(e))});
