/* Пераключэнне паміж беларускай і рускай мовамі сайта. */
(()=>{
  const K='spadchyna-lang';
  const validLang=l=>l==='ru'?'ru':'by';
  window.getLang=()=>validLang(localStorage.getItem(K)||'by');
  window.setLang=l=>{
    l=validLang(l);
    localStorage.setItem(K,l);
    document.documentElement.lang=l==='ru'?'ru':'be';
    document.querySelectorAll('[data-by][data-ru]').forEach(e=>{
      const v=e.dataset[l];
      if(v!==undefined){
        if(e.matches('input,textarea'))e.placeholder=v;
        else e.textContent=v;
      }
    });
    document.querySelectorAll('[data-lang-choice]').forEach(b=>{
      const selected=b.dataset.langChoice===l;
      b.setAttribute('aria-pressed',String(selected));
      b.classList.toggle('is-active',selected);
    });
    document.querySelectorAll('[data-lang-switch]').forEach(g=>{
      g.setAttribute('aria-label',l==='ru'?'Язык сайта':'Мова сайта');
    });
    document.dispatchEvent(new CustomEvent('sp-lang-change',{detail:{lang:l}}));
  };
  document.addEventListener('click',e=>{
    const choice=e.target.closest('[data-lang-choice]');
    if(choice)window.setLang(choice.dataset.langChoice);
  });
  document.addEventListener('DOMContentLoaded',()=>window.setLang(window.getLang()));
})();
