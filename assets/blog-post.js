// Load and render one published article from the Apps Script-backed Sheet.
(function(){
  var articleNode = document.getElementById('blog-article');
  var slug = new URLSearchParams(window.location.search).get('slug');
  var GAS_URL = window.COBEX_BLOG_GAS_URL;
  if (!articleNode || !slug) return showError();
  var postData = null;

  var callbackName = 'cobexBlogPost_' + Date.now();
  var script = document.createElement('script');
  var timer = setTimeout(showError, 12000);

  function showError(){
    clearTimeout(timer);
    articleNode.textContent = 'Artikel tidak ditemukan atau belum dapat dimuat.';
    delete window[callbackName];
    script.remove();
  }

  window[callbackName] = function(response){
    clearTimeout(timer);
    delete window[callbackName];
    script.remove();
    postData = response && response.articles && response.articles.find(function(item){ return item.slug === slug; });
    if (!postData) return showError();
    renderLanguage(document.documentElement.lang === 'en' ? 'en' : 'id', false);
  };

  function renderLanguage(language, updateUrl){
    var isEnglish = language === 'en';
    var title = isEnglish ? (postData.titleEn || postData.titleId) : postData.titleId;
    var category = isEnglish ? (postData.categoryEn || postData.categoryId) : postData.categoryId;
    var excerpt = isEnglish ? (postData.excerptEn || postData.excerptId) : postData.excerptId;
    var contentText = isEnglish ? (postData.contentEn || postData.contentId) : postData.contentId;
    var pageUrl = new URL(window.location.href);
    pageUrl.searchParams.set('slug', slug);
    pageUrl.searchParams.set('lang', language);
    if (updateUrl) window.history.replaceState({}, '', pageUrl.href);

    document.documentElement.lang = language;
    document.title = title + ' — CobexTech';
    document.querySelector('meta[name="description"]').content = excerpt;
    document.querySelector('meta[property="og:title"]').content = title;
    document.querySelector('meta[property="og:description"]').content = excerpt;
    document.querySelector('meta[property="og:url"]').content = pageUrl.href;
    document.querySelector('link[rel="canonical"]').href = pageUrl.href;
    document.querySelector('meta[name="twitter:title"]').content = title;
    document.querySelector('meta[name="twitter:description"]').content = excerpt;

    var alternateLinks = document.head.querySelectorAll('link[hreflang]');
    alternateLinks.forEach(function(link){ link.remove(); });
    addAlternateLink('id', 'id');
    if (postData.titleEn && postData.contentEn) addAlternateLink('en', 'en');
    addAlternateLink('x-default', 'id');

    function addAlternateLink(hreflang, lang){
      var alternateUrl = new URL(window.location.href);
      alternateUrl.searchParams.set('slug', slug);
      alternateUrl.searchParams.set('lang', lang);
      var link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hreflang;
      link.href = alternateUrl.href;
      document.head.appendChild(link);
    }

    var heading = document.createElement('h1');
    heading.textContent = title;
    var meta = document.createElement('div');
    meta.className = 'blog-meta';
    var categoryNode = document.createElement('span');
    categoryNode.textContent = category.toUpperCase();
    var date = document.createElement('time');
    date.dateTime = postData.publishedAt;
    date.textContent = new Intl.DateTimeFormat(isEnglish ? 'en-US' : 'id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(postData.publishedAt));
    meta.append(categoryNode, document.createTextNode(' · '), date);
    var lead = document.createElement('p');
    lead.className = 'lead';
    lead.textContent = excerpt;
    var content = document.createElement('div');
    contentText.split(/\n\s*\n/).forEach(function(paragraphText){
      var text = paragraphText.trim();
      if (!text) return;
      var paragraph = document.createElement('p');
      paragraph.textContent = text;
      content.appendChild(paragraph);
    });
    articleNode.replaceChildren(heading, meta, lead, content);
  }

  ['lang-id', 'lang-en'].forEach(function(id){
    var button = document.getElementById(id);
    if (button) button.addEventListener('click', function(){
      if (postData) renderLanguage(id === 'lang-en' ? 'en' : 'id', true);
    });
  });

  script.onerror = showError;
  script.src = GAS_URL + '?action=articles&callback=' + callbackName;
  document.head.appendChild(script);
})();
