// CobexTech — shared behavior (theme & language persist via localStorage)
(function(){
  const root = document.documentElement;
  const STORE_KEY = 'cobextech-prefs';

  let currentTheme = 'dark';
  let currentLang = 'id';

  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    if(saved){
      if(saved.theme === 'light' || saved.theme === 'dark') currentTheme = saved.theme;
      if(saved.lang === 'id' || saved.lang === 'en') currentLang = saved.lang;
    }
  } catch(e){}

  function savePrefs(){
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ theme: currentTheme, lang: currentLang })); } catch(e){}
  }

  /* Theme toggle */
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  function applyTheme(){
    root.setAttribute('data-theme', currentTheme);
    if(themeIcon) themeIcon.textContent = currentTheme === 'dark' ? '☀' : '☾';
  }
  if(themeBtn){
    themeBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme();
      savePrefs();
    });
  }

  /* Language toggle */
  const langIdBtn = document.getElementById('lang-id');
  const langEnBtn = document.getElementById('lang-en');
  const i18nNodes = document.querySelectorAll('[data-id][data-en]');

  function applyLang(){
    root.setAttribute('lang', currentLang);
    i18nNodes.forEach(el => { el.textContent = el.getAttribute('data-' + currentLang); });
    if(langIdBtn) langIdBtn.classList.toggle('active', currentLang === 'id');
    if(langEnBtn) langEnBtn.classList.toggle('active', currentLang === 'en');
    applyTheme();
  }
  if(langIdBtn) langIdBtn.addEventListener('click', () => { currentLang = 'id'; applyLang(); savePrefs(); });
  if(langEnBtn) langEnBtn.addEventListener('click', () => { currentLang = 'en'; applyLang(); savePrefs(); });

  /* Mobile nav */
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  if(menuToggle && mainNav){
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
    mainNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mainNav.classList.remove('open'));
    });
  }

  applyTheme();
  applyLang();
})();