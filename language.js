(() => {
  'use strict';
  const translations = {
    '.skip':'直接查看作品',
    '.nav nav a[href="#about"]':'关于我', '.nav nav a[href="#work"]':'作品', '.nav nav a[href="#next"]':'下一步',
    '.scene-top span:first-child':'KENLIANG / 数字创作探索', '.scene-top span:last-child':'01 — 从这里开始',
    '.intro-copy .eyebrow':'前方，还有另一种可能', '#intro-title':'打开另一扇<em>门。</em>', '.intro-note':'你的下一篇章<br>可以从小开始。',
    '.door-caption>span':'AI · 内容 · 数字体验', '.door-caption>a':'走进新的可能 <span aria-hidden="true">↗</span>',
    '.scene-bottom>span:first-child':'一步一步，做出真正有用的东西', '.scroll-cue':'向下滚动，走进来 <span aria-hidden="true">↓</span>', '.scene-bottom>span:last-child':'从可能开始',
    '.arrival>span':'你的下一篇章', '.arrival>p':'为新的<em>可能</em><br>留一点空间。',
    '.services-heading .eyebrow':'一个想法，更多可能。', '#services-title':'我可以帮你<br><em>做到什么。</em>',
    '.service-list li:nth-child(1)':'<span>01</span>网站开发', '.service-list li:nth-child(2)':'<span>02</span>营销漏斗设计', '.service-list li:nth-child(3)':'<span>03</span>AI 工具', '.service-list li:nth-child(4)':'<span>04</span>AI 落地应用', '.service-list li:nth-child(5)':'<span>05</span>AI 视频制作', '.service-list li:nth-child(6)':'<span>06</span>YouTube 频道管理', '.service-list li:nth-child(7)':'<span>07</span>社交媒体管理',
    '.services-bottom':'一起，开启你的下一篇章。<span>继续查看作品 ↓</span>',
    '.section-top .eyebrow':'02 / 创作探索', '.section-top .small-note':'个人品牌设计探索 · 2026',
    '.section-heading h2':'让想法<br><em>看得见。</em>', '.section-heading>p':'AI、内容与设计。<br>从一个有用的下一步，连接起来。',
    '.project .view':'查看设计 ↗',
    '[data-project="hero"] h3':'另一扇门', '[data-project="hero"] .project-meta>span':'01 / 网站体验', '[data-project="hero"]>p':'让看得见的可能，成为品牌的第一印象。',
    '[data-project="identity"] h3':'品牌的视觉语言', '[data-project="identity"] .project-meta>span':'02 / 品牌探索', '[data-project="identity"]>p':'沉稳的底色，加上恰到好处的绿色。',
    '[data-project="logo"] h3':'一扇门，一个符号', '[data-project="logo"] .project-meta>span':'03 / 标识探索', '[data-project="logo"]>p':'用简单的形状，表达另一条向前的路。',
    '.about-copy .eyebrow':'03 / 门后的那个人', '.about-copy h2':'从你已经<br><em>懂的开始。</em>',
    '.about-copy>p:nth-of-type(2)':'我是 Kenliang。在这里，我探索如何将 AI、内容和数字系统连接起来，帮助生意人和上班族，为自己创造另一种选择。',
    '.about-copy>p:nth-of-type(3)':'不承诺一夜成功。分享实用的想法和技能，一次走好一小步。',
    '.about-copy .text-link':'看看设计探索 <span aria-hidden="true">↗</span>',
    '.next .eyebrow':'04 / 为可能留一扇门', '.next h2':'先做好一件事。<br><em>再走下一步。</em>', '.next>p:not(.eyebrow)':'新的篇章，总要从某一步开始。', '.next .text-link':'回到起点 <span aria-hidden="true">↑</span>',
    'footer>span:nth-child(2)':'互动设计样稿 / 尚未发布的作品集', '#study .close':'关闭 ×', '#study>.small-note':'个人设计探索。展示的是视觉概念，并非客户案例。'
  };
  const attributes = [
    ['.nav .brand','aria-label','kenliang.click 首页'],['.nav nav','aria-label','主导航'],['.language-switch','aria-label','语言'],['#study .close','aria-label','关闭作品详情'],
    ['[data-project="hero"] img','alt','kenliang.click 桌面与手机版首页设计探索'],['[data-project="identity"] img','alt','kenliang.click 品牌视觉情绪板'],['[data-project="logo"] img','alt','十二款 kenliang.click 标识设计概念']
  ];
  const entries = Object.entries(translations).flatMap(([selector,zh])=>[...document.querySelectorAll(selector)].map(element=>({element,en:element.innerHTML,zh})));
  const attrs = attributes.map(([selector,name,zh])=>{const element=document.querySelector(selector);return {element,name,en:element.getAttribute(name),zh};});
  const englishDescription=document.querySelector('meta[name="description"]').content;
  const chineseStudies={
    hero:{title:'另一扇门',category:'网站体验 / 个人设计探索',description:'kenliang.click 的桌面与手机版设计探索。绿色品牌元素搭配黑色与深蓝背景，以一个清晰的行动邀请，鼓励访客开始学习。'},
    identity:{title:'品牌的视觉语言',category:'品牌世界 / 个人设计探索',description:'围绕「可能性」展开的品牌探索：真实的工作场景、务实的乐观，以及反复出现的绿色门框。'},
    logo:{title:'一扇门，一个符号',category:'标识探索 / 个人设计探索',description:'十二款围绕「另一扇门」展开的标识概念。目前的网站探索选用了 Open Door 方向；这些仍是设计探索，并非最终制作文件。'}
  };
  let language='en';
  function updateMotion(reduced){document.querySelector('#motion').innerHTML=language==='zh'?`动态 <span>${reduced?'关':'开'}</span>`:`Motion <span>${reduced?'off':'on'}</span>`;}
  function setLanguage(value){
    language=value==='zh'?'zh':'en';document.documentElement.lang=language==='zh'?'zh-Hans':'en';
    entries.forEach(entry=>{entry.element.innerHTML=entry[language];});attrs.forEach(entry=>entry.element.setAttribute(entry.name,entry[language]));
    document.querySelectorAll('[data-lang]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===language)));
    document.title=language==='zh'?'kenliang.click — 另一扇门':'kenliang.click — A Second Door';
    document.querySelector('meta[name="description"]').content=language==='zh'?'另一扇门。Kenliang 的 AI、内容与数字体验创作。':englishDescription;
    updateMotion(document.querySelector('#motion').getAttribute('aria-pressed')==='true');
    try{localStorage.setItem('kenliang-language',language);}catch{/* Language still works if storage is blocked. */}
    document.dispatchEvent(new Event('portfolio-language-change'));
  }
  globalThis.portfolioI18n={updateMotion,study:(key,english)=>language==='zh'?{...english,...chineseStudies[key]}:english,setLanguage,getLanguage:()=>language};
  document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));
  let saved;try{saved=localStorage.getItem('kenliang-language');}catch{}
  setLanguage(saved==='zh'?'zh':'en');
})();
