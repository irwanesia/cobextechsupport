// Private article editor for the Apps Script-backed blog Sheet.
(function(){
  var GAS_URL = window.COBEX_BLOG_GAS_URL;
  var accessForm = document.getElementById('access-form');
  var keyInput = document.getElementById('admin-key');
  var workspace = document.getElementById('admin-workspace');
  var articleForm = document.getElementById('article-form');
  var statusNode = document.getElementById('admin-status');
  var savedList = document.getElementById('saved-articles');
  var titleInput = document.getElementById('article-title-id');
  var slugInput = document.getElementById('article-slug');
  var currentKey = '';
  var slugWasEdited = false;

  function setStatus(message, kind){
    statusNode.textContent = message;
    statusNode.className = 'admin-status' + (kind ? ' ' + kind : '');
  }

  function requestJsonp(parameters, onSuccess, onError){
    var callbackName = 'cobexAdmin_' + Date.now() + '_' + Math.random().toString(36).slice(2);
    var script = document.createElement('script');
    var timer = setTimeout(fail, 12000);
    function cleanup(){
      clearTimeout(timer);
      delete window[callbackName];
      script.remove();
    }
    function fail(){ cleanup(); onError(); }
    window[callbackName] = function(response){ cleanup(); onSuccess(response); };
    script.onerror = fail;
    var query = Object.keys(parameters).map(function(key){
      return encodeURIComponent(key) + '=' + encodeURIComponent(parameters[key]);
    }).join('&');
    script.src = GAS_URL + '?' + query + '&callback=' + callbackName;
    document.head.appendChild(script);
  }

  function localDateValue(){
    var date = new Date();
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
  }

  function slugify(value){
    return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function renderArticleList(articles){
    savedList.replaceChildren();
    if (!articles.length){
      var empty = document.createElement('p');
      empty.textContent = 'Belum ada artikel. Mulai dengan membuat artikel baru.';
      savedList.appendChild(empty);
      return;
    }
    articles.forEach(function(article){
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'saved-article';
      var title = document.createElement('strong');
      title.textContent = article.titleId;
      var detail = document.createElement('span');
      detail.textContent = article.status === 'published' ? 'Terbit · ' + article.slug : 'Draft · ' + article.slug;
      button.append(title, detail);
      button.addEventListener('click', function(){ populateForm(article); });
      savedList.appendChild(button);
    });
  }

  function loadArticles(onLoaded){
    requestJsonp({ action: 'admin_articles', key: currentKey }, function(response){
      if (!response || response.result !== 'success'){
        workspace.hidden = true;
        setStatus('Kunci admin tidak valid atau akses Apps Script belum tersedia.', 'error');
        if (onLoaded) onLoaded(false);
        return;
      }
      workspace.hidden = false;
      renderArticleList(response.articles || []);
      setStatus('Editor siap. ' + response.articles.length + ' artikel dimuat.', 'success');
      if (onLoaded) onLoaded(true, response.articles);
    }, function(){
      setStatus('Gagal menghubungi Apps Script. Periksa URL deployment dan koneksi.', 'error');
      if (onLoaded) onLoaded(false);
    });
  }

  function populateForm(article){
    articleForm.elements.titleId.value = article.titleId;
    articleForm.elements.titleEn.value = article.titleEn || '';
    articleForm.elements.slug.value = article.slug;
    articleForm.elements.categoryId.value = article.categoryId;
    articleForm.elements.categoryEn.value = article.categoryEn || '';
    articleForm.elements.excerptId.value = article.excerptId;
    articleForm.elements.excerptEn.value = article.excerptEn || '';
    articleForm.elements.contentId.value = article.contentId;
    articleForm.elements.contentEn.value = article.contentEn || '';
    articleForm.elements.publishedAt.value = article.publishedAt ? new Date(article.publishedAt).toISOString().slice(0, 10) : localDateValue();
    articleForm.elements.published.checked = article.status === 'published';
    slugWasEdited = true;
    document.getElementById('editor-title').textContent = 'Edit artikel';
    document.getElementById('save-article').textContent = 'Perbarui artikel';
    titleInput.focus();
  }

  function resetForm(){
    articleForm.reset();
    articleForm.elements.publishedAt.value = localDateValue();
    slugWasEdited = false;
    document.getElementById('editor-title').textContent = 'Artikel baru';
    document.getElementById('save-article').textContent = 'Simpan artikel';
  }

  titleInput.addEventListener('input', function(){
    if (!slugWasEdited) slugInput.value = slugify(titleInput.value);
  });
  slugInput.addEventListener('input', function(){ slugWasEdited = true; });
  document.getElementById('new-article').addEventListener('click', resetForm);
  document.getElementById('refresh-articles').addEventListener('click', function(){ loadArticles(); });
  accessForm.addEventListener('submit', function(event){
    event.preventDefault();
    currentKey = keyInput.value.trim();
    if (!currentKey) return;
    setStatus('Memeriksa kunci admin...');
    loadArticles(function(ok){ if (ok) keyInput.value = ''; });
  });

  articleForm.addEventListener('submit', function(event){
    event.preventDefault();
    if (!articleForm.reportValidity()) return;
    var saveButton = document.getElementById('save-article');
    var payload = {
      action: 'save_article',
      key: currentKey,
      titleId: articleForm.elements.titleId.value.trim(),
      titleEn: articleForm.elements.titleEn.value.trim(),
      slug: articleForm.elements.slug.value.trim().toLowerCase(),
      categoryId: articleForm.elements.categoryId.value.trim(),
      categoryEn: articleForm.elements.categoryEn.value.trim(),
      excerptId: articleForm.elements.excerptId.value.trim(),
      excerptEn: articleForm.elements.excerptEn.value.trim(),
      contentId: articleForm.elements.contentId.value.trim(),
      contentEn: articleForm.elements.contentEn.value.trim(),
      publishedAt: articleForm.elements.publishedAt.value,
      status: articleForm.elements.published.checked ? 'published' : 'draft'
    };
    saveButton.disabled = true;
    saveButton.textContent = 'Menyimpan...';
    setStatus('Menyimpan artikel ke Google Sheets...');
    fetch(GAS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    }).then(function(){
      loadArticles(function(ok, articles){
        saveButton.disabled = false;
        saveButton.textContent = 'Simpan artikel';
        var saved = ok && articles.some(function(item){ return item.slug === payload.slug && item.titleId === payload.titleId && item.status === payload.status; });
        if (saved){
          setStatus('Artikel berhasil disimpan ke Google Sheets.', 'success');
          renderArticleList(articles);
        } else if (ok){
          setStatus('Perubahan belum terverifikasi. Periksa slug dan coba simpan kembali.', 'error');
        }
      });
    }).catch(function(){
      saveButton.disabled = false;
      saveButton.textContent = 'Simpan artikel';
      setStatus('Gagal mengirim artikel. Periksa koneksi lalu coba lagi.', 'error');
    });
  });

  resetForm();
})();
