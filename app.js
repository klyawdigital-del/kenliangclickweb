(() => {
'use strict';
const canvas=document.querySelector('#portal'),ctx=canvas.getContext('2d');
const journey=document.querySelector('.journey'),scene=document.querySelector('.scene'),intro=document.querySelector('.hero-copy');
const caption=document.querySelector('.door-label'),bottom=document.querySelector('.scroll-cue'),arrival=document.querySelector('.arrival'),progress=document.querySelector('.progress i');
const motion=document.querySelector('#motion'),media=matchMedia('(prefers-reduced-motion: reduce)');
let reduced=media.matches,manual=false,width=0,height=0,current=0,target=0,raf=0,visible=true,last=0,elapsed=0;
const clamp=(n,a=0,b=1)=>Math.min(b,Math.max(a,n));
const smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t);};
let seed=4187;const random=()=>{seed=seed*16807%2147483647;return(seed-1)/2147483646;};
const dust=Array.from({length:200},()=>({x:random(),y:random(),z:random(),r:random(),phase:random()*6.28}));
const edge=Array.from({length:1300},()=>({side:Math.floor(random()*4),t:random(),offset:(random()-.5)*.075,z:random()*.15,r:random(),phase:random()*6.28}));
function kick(){if(!raf&&visible&&!document.hidden)raf=requestAnimationFrame(draw);}
function readScroll(){const rect=journey.getBoundingClientRect();const navHeight=document.querySelector('.nav').offsetHeight;const track=document.querySelector('.flight-spacer');target=reduced?0:document.body.classList.contains('flight')&&track?clamp(scrollY/Math.max(1,track.offsetHeight-innerHeight)/.20):clamp((navHeight-rect.top)/Math.max(1,journey.offsetHeight-height));kick();}
function measure(){width=scene.clientWidth;height=scene.clientHeight;const d=Math.min(devicePixelRatio||1,1.75);canvas.width=width*d;canvas.height=height*d;if(ctx)ctx.setTransform(d,0,0,d,0,0);readScroll();}
  function point(x,y,r,alpha,green){ctx.fillStyle=green?`rgba(106,191,144,${alpha})`:`rgba(213,235,220,${alpha})`;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
  function draw(time){raf=0;if(!ctx)return;const dt=Math.min(40,time-last||16);last=time;if(!reduced)elapsed+=dt;
    current=reduced?0:current+(target-current)*(1-Math.exp(-dt*.012));if(Math.abs(target-current)<.0001)current=target;
    const t=elapsed*.0004,p=reduced?1:current,pass=smooth(.02,.43,p),returnDoor=smooth(.48,.66,p);
    const doorH=Math.min(height*.67,600),doorW=doorH*.48;
    const finalH=Math.max(100,Math.min(height*.37,height-intro.offsetHeight-85));
    const zoom=p<.48?1/(1-.985*pass):(.7+.3*returnDoor)*finalH/doorH;
    const cx=width/2,cy=p<.48?height*.49:28+finalH/2;ctx.clearRect(0,0,width,height);
    ctx.globalAlpha=p<.48?1-smooth(.39,.47,p):returnDoor;
    for(const d of dust){const z=1+(p<.48?pass*18:returnDoor)*d.z,x=cx+(d.x*width-cx)*z,y=cy+(d.y*height-cy)*z;
      point(x,y,.4+d.r*1.2,(.10+d.z*.20)*(reduced?1:.7+.3*Math.sin(t+d.phase)),d.r>.3);}
    const dw=doorW*zoom,dh=doorH*zoom,left=cx-dw/2,top=cy-dh/2;
    if(zoom<18){const glow=ctx.createRadialGradient(cx,cy,0,cx,cy,Math.max(dw,dh)*.7);glow.addColorStop(0,'rgba(20,60,51,.025)');glow.addColorStop(.65,'rgba(47,143,98,.045)');glow.addColorStop(1,'rgba(47,143,98,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);
      ctx.strokeStyle='rgba(67,140,99,.22)';ctx.lineWidth=Math.min(2,zoom*.65);ctx.strokeRect(left,top,dw,dh);
      // The thin inner frame suggests the selected open-door direction.
      ctx.strokeStyle='rgba(89,164,119,.16)';ctx.beginPath();ctx.moveTo(left+dw*.12,top+dh*.045);ctx.lineTo(left+dw*.12,top+dh*.955);ctx.lineTo(left+dw*.34,top+dh*.89);ctx.lineTo(left+dw*.34,top+dh*.11);ctx.closePath();ctx.stroke();
    }
    const count=width<700?800:edge.length;
    for(let i=0;i<count;i++){const d=edge[i];let x,y;
      const drift=reduced?0:Math.sin(t+d.phase)*.006;
      // Continuous flow around the perimeter, with depth and an organic drift.
      const flow=(d.side+d.t+(reduced?0:t*.065*(.7+d.z)))%4,side=Math.floor(flow),along=flow-side;
      if(side===0){x=-.5;y=.5-along;}else if(side===1){x=along-.5;y=-.5;}else if(side===2){x=.5;y=along-.5;}else{x=.5-along;y=.5;}
      x=cx+(x+d.offset+drift)*dw;y=cy+(y+d.offset*.35+drift)*dh;
      if(x< -20||x>width+20||y< -20||y>height+20)continue;
      const radius=Math.min(8,(.45+d.r*1.5)*Math.sqrt(zoom));const alpha=(.22+d.r*.6)*(reduced?1:.75+.25*Math.sin(t*1.4+d.phase));
      if(d.r>.96){ctx.shadowBlur=8;ctx.shadowColor='#8be2b0';}point(x,y,radius,alpha,d.r<.83);ctx.shadowBlur=0;
    }
    // A soft ellipse grounds the threshold without copying the reference's star.
    if(zoom<8){ctx.save();ctx.translate(cx,top+dh);ctx.scale(1,.14);const glow=ctx.createRadialGradient(0,0,0,0,0,dw*.8);glow.addColorStop(0,'rgba(47,143,98,.17)');glow.addColorStop(1,'rgba(47,143,98,0)');ctx.fillStyle=glow;ctx.fillRect(-dw,-dw,dw*2,dw*2);ctx.restore();}
    ctx.globalAlpha=1;
    intro.style.top=`${28+finalH+24}px`;intro.style.opacity=1;intro.style.visibility='visible';intro.style.transform='none';intro.inert=false;
    [...intro.children].forEach((el,index)=>{const begin=.57+index*.045;const reveal=reduced?1:smooth(begin,begin+.11,p);el.style.opacity=reveal;el.style.transform=`translateY(${(1-reveal)*38}px)`;el.style.visibility=reveal<.01?'hidden':'visible';if(el.matches('a'))el.inert=reveal<.95;});
    caption.style.opacity=1-smooth(.06,.20,p);bottom.style.opacity=1-smooth(.12,.30,p);
    arrival.style.opacity=0;progress.style.transform=`scaleX(${p})`;
    scene.dataset.scVerifyState=`zoom:${zoom.toFixed(2)};doorBottom:${(cy+dh/2).toFixed(1)};copy:${smooth(.57,.68,p).toFixed(2)}`;
    scene.dataset.scVerifyHold=String(p>=.89||reduced);
    if(!reduced||Math.abs(target-current)>.0001)kick();
  }
function setMotion(){document.body.classList.toggle('reduced',reduced);motion.setAttribute('aria-pressed',String(reduced));motion.querySelector('span').textContent=reduced?'關':'開';cancelAnimationFrame(raf);raf=0;last=0;current=0;measure();}
motion.addEventListener('click',()=>{manual=true;reduced=!reduced;setMotion();});media.addEventListener('change',e=>{if(!manual){reduced=e.matches;setMotion();}});
addEventListener('resize',measure);addEventListener('scroll',readScroll,{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else{last=0;kick();}});
new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible){last=0;readScroll();}else{cancelAnimationFrame(raf);raf=0;}}).observe(journey);
// Own the popup lifecycle so the vendor's alwaysShow trigger cannot open it on page load.
const inquiry=document.querySelector('#project-inquiry'),formDialog=document.querySelector('#project-form-dialog');
inquiry.addEventListener('click',event=>{event.preventDefault();if(formDialog.open)return;formDialog.showModal();document.body.classList.add('dialog-open');const frame=formDialog.querySelector('iframe');if(!frame.hasAttribute('src'))frame.src=frame.dataset.src;});
formDialog.querySelector('.close').addEventListener('click',()=>formDialog.close());
formDialog.addEventListener('click',event=>{if(event.target===formDialog){const r=formDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)formDialog.close();}});
formDialog.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('dialog-open');inquiry.focus();});
const items=[
['c91c8dac59358b0a','EmpowerHER','活動報名頁'],
['ec313e9c323d22e4','ASEAN Talent Workshop','活動報名頁'],
['63d8eb48101d5749','個人品牌分享會','活動報名頁'],
['90a4d7c9ad2d0bf8','KLR 個人品牌','活動報名頁'],
['48acaae4b4b71f23','粵港澳大灣區・東盟人才發展','研討會報名頁'],
['c0c1aea448e26ab9','Neurofitness Masterclass','課程銷售頁'],
['5a845d0bfbbbd5f9','DPA 自我探索課程','課程銷售頁'],
['59983b38dca9063b','SUPERA-TE Masterclass','課程銷售頁'],
['1acda0f856c538fd','INiYOU Basic PNL','課程銷售頁'],
['c0f44ecc86adfc91','INiYOU Newsletter','訂閱頁設計示例']];
window.kenPortfolioItems=items;
const dialog=document.querySelector('#study');let opener;
for(const [id,title,type]of items){const button=document.createElement('button');button.type='button';button.className='project';button.setAttribute('aria-label','查看 '+title+' 完整設計');button.innerHTML='<div class="project-image"><img loading="lazy" src="assets/portfolio/'+id+'.png" alt="'+title+'頁面設計"></div><div class="project-meta"><strong>'+title+'</strong><span>'+type+'</span></div>';document.querySelector('#project-grid').append(button);button.addEventListener('click',()=>{opener=button;document.querySelector('#study-title').textContent=title;const img=document.querySelector('#study-image');img.src='assets/portfolio/'+id+'.png';img.alt=title+'完整頁面設計';dialog.showModal();document.body.classList.add('dialog-open');});}
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');opener?.focus();});
measure();setMotion();
})();
