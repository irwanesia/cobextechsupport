// Render published articles from the Apps Script-backed Sheet.
(function(){
  var list = document.getElementById('blog-list');
  if (!list) return;

  var GAS_URL = window.COBEX_BLOG_GAS_URL;
  var renderedArticles = [];
  var callbackName = 'cobexBlogArticles_' + Date.now();
  var script = document.createElement('script');
  var timer = setTimeout(showUnavailable, 12000);

  function showUnavailable(){
    clearTimeout(timer);
    var message = document.createElement('p');
    message.className = 'blog-data-message';
    message.textContent = 'Artikel terbaru belum dapat dimuat. Silakan coba kembali nanti.';
    list.appendChild(message);
    delete window[callbackName];
    script.remove();
  }

  window[callbackName] = function(response){
    clearTimeout(timer);
    delete window[callbackName];
    script.remove();
    if (!response || response.result !== 'success' || !Array.isArray(response.articles)) {
      showUnavailable();
      return;
    }

    var fragment = document.createDocumentFragment();
    response.articles.forEach(function(article){
      var item = document.createElement('article');
      item.className = 'blog-item-wrap';
      var link = document.createElement('a');
      link.className = 'blog-item';
      var left = document.createElement('div');
      left.className = 'left';
      var thumb = document.createElement('div');
      thumb.className = 'blog-thumb';
      thumb.setAttribute('aria-hidden', 'true');
      var details = document.createElement('div');
      var title = document.createElement('h4');
      title.setAttribute('data-id', article.titleId);
      title.setAttribute('data-en', article.titleEn || article.titleId);
      var meta = document.createElement('span');
      meta.className = 'blog-meta';
      var category = document.createElement('span');
      category.setAttribute('data-id', article.categoryId);
      category.setAttribute('data-en', article.categoryEn || article.categoryId);
      var date = document.createElement('time');
      date.dateTime = article.publishedAt;
      date.dateTime = article.publishedAt;
      meta.append(category, document.createTextNode(' · '), date);
      details.append(title, meta);
      left.append(thumb, details);
      var arrow = document.createElement('span');
      arrow.className = 'blog-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';
      link.append(left, arrow);
      item.appendChild(link);
      fragment.appendChild(item);
      renderedArticles.push({ article: article, link: link, title: title, category: category, date: date });
    });
    list.insertBefore(fragment, list.firstChild);
    updateLanguage();
  };

  function updateLanguage(){
    var language = document.documentElement.lang === 'en' ? 'en' : 'id';
    renderedArticles.forEach(function(entry){
      entry.title.textContent = entry.article['title' + (language === 'en' ? 'En' : 'Id')] || entry.article.titleId;
      entry.category.textContent = (entry.article['category' + (language === 'en' ? 'En' : 'Id')] || entry.article.categoryId).toUpperCase();
      entry.date.textContent = new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(entry.article.publishedAt));
      entry.link.href = 'blog-post.html?slug=' + encodeURIComponent(entry.article.slug) + '&lang=' + language;
    });
  }

  ['lang-id', 'lang-en'].forEach(function(id){
    var button = document.getElementById(id);
    if (button) button.addEventListener('click', updateLanguage);
  });

  script.onerror = showUnavailable;
  script.src = GAS_URL + '?action=articles&callback=' + callbackName;
  document.head.appendChild(script);
})();
