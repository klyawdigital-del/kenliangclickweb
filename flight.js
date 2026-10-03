(()=>{'use strict';
const $=s=>document.querySelector(s),main=$('main'),layers=[$('#entrance'),$('#topics'),$('#work'),$('#about'),$('#start')],slides=[...document.querySelectorAll('.service-slides article')],gallery=$('#all-work');
const spacer=document.createElement('div');spacer.className='flight-spacer';spacer.setAttribute('aria-hidden','true');main.after(spacer);
const field=$('.spatial-field');main.prepend(field);const ctx=field.getContext('2d');const footer=$('footer');main.append(footer);
const close=document.createElement('button');close.className='flight-gallery-close';close.textContent='返回旅程 ×';gallery.prepend(close);close.onclick=()=>{gallery.open=false;$('.gallery-jump').focus();};
const items=window.kenPortfolioItems||[],planes=items.map(([id,title])=>{const el=document.createElement('div');el.className='brand-plane';const img=new Image();img.src='assets/portfolio/'+id+'.png';img.alt='';el.append(img);$('.brand-space').append(el);return el;});
const clamp=x=>Math.max(0,Math.min(1,x)),smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t);};let width=0,height=0,raf=0;
const stops={entrance:0,topics:.255,work:.49,about:.79,start:.98};
function show(el,alpha,z=0,x=0){el.style.opacity=alpha;el.style.visibility=alpha<.015?'hidden':'visible';el.inert=alpha<.5;el.style.transform=`perspective(1200px) translate3d(${x}px,0,${z}px)`;}
let ambientFrame=0,ambientTime=0,ambientLast=0,ambientPaint=0;
function draw(p){if(!ctx)return;ctx.clearRect(0,0,width,height);const travel=p*120,phase=ambientTime*.00018;for(let row=0;row<40;row++){const d=1+((row+travel)%40)*.22,s=1/d;for(let col=-28;col<=28;col++){const x=width/2+(col*70+Math.sin(p*7)*90+Math.sin(phase)*28)*s,y=height*.42+(height*.73+Math.sin(col*.25+row*.3+phase)*75)*s;ctx.fillStyle=`rgba(138,209,170,${.08+s*.4})`;ctx.beginPath();ctx.arc(x,y,.4+s*1.6,0,7);ctx.fill();}}}
function ambientAllowed(){return !document.hidden&&!document.body.classList.contains('reduced')&&(window.kenFlightProgress||0)>.055;}
function animateField(now){ambientFrame=0;if(!ambientAllowed()){ambientLast=0;return;}if(ambientLast)ambientTime+=Math.min(80,now-ambientLast);ambientLast=now;if(now-ambientPaint>=32){draw(window.kenFlightProgress||0);ambientPaint=now;}ambientFrame=requestAnimationFrame(animateField);}
function syncAmbient(){if(ambientAllowed()){if(!ambientFrame)ambientFrame=requestAnimationFrame(animateField);}else{cancelAnimationFrame(ambientFrame);ambientFrame=0;ambientLast=0;}}
function update(){raf=0;const reduced=document.body.classList.contains('reduced');document.body.classList.toggle('flight',!reduced);if(reduced){delete window.kenFlightProgress;syncAmbient();layers.forEach(el=>{el.removeAttribute('style');el.inert=false;});slides.forEach(el=>{el.removeAttribute('style');el.inert=false;});gallery.open=true;return;}
const p=clamp(scrollY/Math.max(1,spacer.offsetHeight-innerHeight));window.kenFlightProgress=p;syncAmbient();main.dataset.flightProgress=p.toFixed(4);draw(p);field.style.opacity=smooth(.055,.17,p)*.7;
show(layers[0],1-smooth(.185,.225,p),smooth(.18,.23,p)*180);
const sa=smooth(.19,.235,p)*(1-smooth(.425,.47,p));show(layers[1],sa);slides.forEach((el,i)=>{const begin=.225+i*.07,end=begin+.083;const enter=smooth(begin-.025,begin+.005,p),exit=smooth(end-.02,end+.003,p);show(el,enter*(1-exit),-240*(1-enter)+210*exit,(i%2?1:-1)*65*(1-enter));});
$('.service-track i').style.transform=`scaleX(${clamp((p-.22)/.22)})`;
const wa=smooth(.435,.475,p)*(1-smooth(.715,.755,p));show(layers[2],wa);const bp=clamp((p-.46)/.275),travel=(items.length-1)*650+2900,mobile=innerWidth<701;planes.forEach((el,i)=>{const z=-2000-i*650+bp*travel,side=i%2?-1:1;el.style.transform=`translate3d(${side*(mobile?118:260)}px,${((i%3)-1)*45}px,${z}px) rotateY(${side*-13}deg) rotateZ(${side*3}deg)`;el.style.opacity=smooth(-2500,-1350,z)*(1-smooth(mobile?450:600,mobile?620:790,z));});$('.brand-caption').textContent=items[Math.min(items.length-1,Math.max(0,Math.round((bp*travel-2000)/650)))]?.[1]||'';
const ai=smooth(.725,.765,p),ao=smooth(.855,.89,p);show(layers[3],ai*(1-ao),-220*(1-ai)+220*ao,60*(1-ai));
const ci=smooth(.875,.935,p);show(layers[4],ci,-250*(1-ci));footer.style.opacity=smooth(.96,.99,p);footer.style.visibility=p>.96?'visible':'hidden';footer.inert=p<.96;
}
function schedule(){if(!raf)raf=requestAnimationFrame(update);}
document.addEventListener('visibilitychange',syncAmbient);
function resize(){width=innerWidth;height=innerHeight;const d=Math.min(devicePixelRatio||1,1.5);field.width=width*d;field.height=height*d;ctx?.setTransform(d,0,0,d,0,0);schedule();}
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a||document.body.classList.contains('reduced'))return;const id=a.getAttribute('href').slice(1);if(id==='all-work'){e.preventDefault();gallery.open=true;close.focus();return;}if(stops[id]!==undefined){e.preventDefault();gallery.open=false;scrollTo({top:stops[id]*(spacer.offsetHeight-innerHeight),behavior:'smooth'});history.replaceState(null,'','#'+id);}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&gallery.open&&!document.querySelector('dialog[open]')){gallery.open=false;$('.gallery-jump').focus();}});
new MutationObserver(()=>{const reduced=document.body.classList.contains('reduced');if(reduced!==!document.body.classList.contains('flight')){gallery.open=reduced;schedule();}}).observe(document.body,{attributes:true,attributeFilter:['class']});
addEventListener('scroll',()=>{if(!document.body.classList.contains('reduced'))window.kenFlightProgress=clamp(scrollY/Math.max(1,spacer.offsetHeight-innerHeight));schedule();},{passive:true});addEventListener('resize',resize);resize();update();
if(location.hash&&stops[location.hash.slice(1)]!==undefined&&!document.body.classList.contains('reduced'))scrollTo(0,stops[location.hash.slice(1)]*(spacer.offsetHeight-innerHeight));
})();
