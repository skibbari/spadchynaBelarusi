/* Переключение между белорусским и русским языками сайта. */
(()=>{
  const K='spadchyna-lang';
  let memoryLang='by';
  const validLang=l=>l==='ru'?'ru':'by';
  const readLang=()=>{try{return validLang(localStorage.getItem(K)||memoryLang)}catch(_){return memoryLang}};
  const saveLang=l=>{memoryLang=l;try{localStorage.setItem(K,l)}catch(_){/* localStorage может быть недоступен для file:// */}};
  const applyLang=(l,notify)=>{
    l=validLang(l);
    document.documentElement.lang=l==='ru'?'ru':'be';
    document.querySelectorAll('[data-by][data-ru]').forEach(e=>{
      const v=e.dataset[l];
      if(v!==undefined){if(e.matches('input,textarea'))e.placeholder=v;else e.textContent=v;}
    });
    document.querySelectorAll('[data-lang-choice]').forEach(b=>{
      const selected=b.dataset.langChoice===l;
      b.setAttribute('aria-pressed',String(selected));
      b.classList.toggle('is-active',selected);
    });
    document.querySelectorAll('[data-lang-switch]').forEach(g=>g.setAttribute('aria-label',l==='ru'?'Язык сайта':'Мова сайта'));
    if(notify)document.dispatchEvent(new CustomEvent('sp-lang-change',{detail:{lang:l}}));
  };
  window.getLang=readLang;
  window.setLang=l=>{l=validLang(l);saveLang(l);applyLang(l,true)};
  document.addEventListener('click',e=>{const choice=e.target.closest('[data-lang-choice]');if(choice)window.setLang(choice.dataset.langChoice)});
  // Apply the saved language without triggering a second initial page render.
  document.addEventListener('DOMContentLoaded',()=>applyLang(readLang(),false),{once:true});
})();
