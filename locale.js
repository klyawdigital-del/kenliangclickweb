(()=>{'use strict';
const copy={
'.skip':'Skip to your next step',
'.hero-copy .eyebrow':'For business owners and people ready to start a side project',
'.hero-copy h1':'Grow your business.<br><em>Build something of your own.</em>',
'.hero-description':"I’m Ken Liang. I share practical ways to use AI, YouTube and digital marketing—helping you find your direction, reach your audience and turn content into customer enquiries, one step at a time.",
'.hero-copy .button':'Your Success Starts Here ↗',
'.hero-copy .helper':'Start with what you know and what you have. Make one useful thing.',
'.door-label small':'Open up another choice for yourself.',
'.arrival>p:last-child':'Your next step<br><em>starts here.</em>',
'.scroll-cue':'Scroll to explore <span>↓</span>',
'#topics h2':'How I can help',
'#topic-ai h3':'AI: take care of a repetitive task',
'#topic-ai p':'From organising information and developing content ideas to everyday workflows, learn to give clear instructions, check the output and apply AI where you actually need it.',
'#topic-web h3':'Websites & sales: make the next step clear',
'#topic-web p':'Explain what you offer, who it is for and how to get in touch. Connect your content, pages and follow-up so interested customers can take the next step.',
'#topic-content h3':'YouTube & content: help the right people find you',
'#topic-content p':'Turn your experience into content people can understand. Start with audience questions, topics and scripts. Practise communicating clearly and build connections with potential customers.',
'#work h2':'Brands I’ve worked with',
'#work .spatial-heading>p:last-child':'Helping each idea find its own expression.',
'.gallery-jump':'Explore all projects ↗',
'#all-work>summary':'Open portfolio · View the full designs',
'.flight-gallery-close':'Back to the journey ×',
'#about figcaption':'KEN LIANG / CREATOR · PRACTITIONER',
'#proof-web dd':'Years in web design',
'#proof-marketing dd':'Years in digital marketing',
'#proof-funnels dd':'Sales funnels designed',
'#about .eyebrow':'About me',
'#about h2':'Put what you learn<br>to work in your job and business.',
'#about>div>p:nth-of-type(2)':'I’m Ken Liang. I share practical approaches to AI, YouTube, content marketing, websites and sales processes.',
'#about>div>p:nth-of-type(3)':'What matters to me is whether you can use what you learn in your work and business.',
'#about>div>p:nth-of-type(4)':'I want to make complex ideas clear, so busy business owners and working adults can start on their own terms, finish something useful and keep moving forward.',
'#about>div>p:nth-of-type(5)':'That is what “A Second Door” means to me: giving yourself another choice.',
'#about .text-link':'Start Your Success Now ↗',
'#start h2':'Your next step. <br>Your choice.',
'#start .heading>p:last-child':'Do what you enjoy. Follow what interests and excites you.',
'.hand-choice:first-child .holo-card>span':'BUSINESS / GROWTH',
'.hand-choice:first-child .holo-card strong':'I run a business.<br>I want more customers.',
'.hand-choice:first-child .holo-card small':'I have a project for you ↗',
'.hand-choice:nth-child(2) .holo-card>span':'CREATE / SIDE PROJECT',
'.hand-choice:nth-child(2) .holo-card strong':'I’m a working professional.<br>I want to start something of my own.',
'.hand-choice:nth-child(2) .holo-card small':'Free resources ↗',
'footer>p':'Practical ideas for AI, content and digital marketing.<br>Build another possibility for your business and your future.',
'footer>a:last-child':'Back to the start ↑',
'#study .close':'Close ×',
'#study>p':'Project images from Ken’s existing portfolio.',
'#study>a':'View the original portfolio ↗',
'#project-form-title':'Let’s talk about your project',
'#project-form-dialog .close':'Close ×',
'.form-fallback':'Can’t see the form? <a href="https://link.marketingprosuite.com/widget/form/uR2I67uJk5cXxG75kR51" target="_blank" rel="noopener">Open it in a new tab ↗</a>'
};
const entries=Object.entries(copy).map(([selector,en])=>{const el=document.querySelector(selector);return{el,en,zh:el?.innerHTML};});
const englishTitles=['EmpowerHER','ASEAN Talent Workshop','Personal Branding Workshop','KLR Personal Brand','Greater Bay Area–ASEAN Talent Development','Neurofitness Masterclass','DPA Self-Discovery Course','SUPERA-TE Masterclass','INiYOU Basic PNL','INiYOU Newsletter'];
const portfolio=window.kenPortfolioItems,original=portfolio.map(row=>[...row]);let language='zh';
const title=document.title,description=document.querySelector('meta[name="description"]'),originalDescription=description.content,portrait=document.querySelector('#about img'),originalAlt=portrait.alt;
function motionLabel(){const off=document.body.classList.contains('reduced');document.querySelector('#motion').innerHTML=language==='en'?`Motion <span>${off?'off':'on'}</span>`:`動效 <span>${off?'關':'開'}</span>`;}
function projectTitle(index){const row=portfolio[index];document.querySelector('#study-title').textContent=row[1];document.querySelector('#study-image').alt=language==='en'?row[1]+' — full design':row[1]+'完整頁面設計';}
function setLanguage(next){language=next==='en'?'en':'zh';const en=language==='en';document.documentElement.lang=en?'en':'zh-Hant';entries.forEach(({el,zh,en:english})=>{if(el)el.innerHTML=en?english:zh;});document.title=en?'Ken Liang | Open another door':title;description.content=en?'Practical ideas for AI, YouTube, content and digital marketing. Build another possibility for your business and your future.':originalDescription;portrait.alt=en?'Ken Liang working at his desk with a laptop and a web design screen.':originalAlt;
portfolio.forEach((row,i)=>{row[1]=en?englishTitles[i]:original[i][1];row[2]=en?(['Event registration page','Event registration page','Event registration page','Event registration page','Conference registration page','Course sales page','Course sales page','Course sales page','Course sales page','Newsletter design example'][i]):original[i][2];});
document.querySelectorAll('.project').forEach((el,i)=>{el.querySelector('strong').textContent=portfolio[i][1];el.querySelector('.project-meta span').textContent=portfolio[i][2];el.setAttribute('aria-label',en?'View '+portfolio[i][1]+' full design':'查看 '+portfolio[i][1]+' 完整設計');el.querySelector('img').alt=portfolio[i][1]+(en?' page design':'頁面設計');});
document.querySelectorAll('dialog .close').forEach(el=>el.setAttribute('aria-label',en?'Close dialog':el.closest('#study')?'關閉作品':'關閉專案表單'));document.querySelectorAll('[data-language]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.language===language)));motionLabel();try{localStorage.setItem('ken-language',language);}catch{}window.dispatchEvent(new Event('resize'));}
document.querySelectorAll('[data-language]').forEach(el=>el.addEventListener('click',()=>setLanguage(el.dataset.language)));document.querySelector('#motion').addEventListener('click',motionLabel);new MutationObserver(motionLabel).observe(document.body,{attributes:true,attributeFilter:['class']});document.querySelectorAll('.project').forEach((el,i)=>el.addEventListener('click',()=>projectTitle(i)));
let saved;try{saved=localStorage.getItem('ken-language');}catch{}setLanguage(saved||'zh');
})();

