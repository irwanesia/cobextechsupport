// CobexTech — shop: product detail modal + buy via WhatsApp
(function(){
  const WA_NUMBER = '6287789066519'; // CobexTech WhatsApp number
  const STRINGS = {
    id: { feats: 'Fitur', buy: 'Beli via WhatsApp', order: 'Pesan via WhatsApp' },
    en: { feats: 'Features', buy: 'Buy via WhatsApp', order: 'Order via WhatsApp' }
  };

  const modal = document.getElementById('product-modal');
  const mThumb = document.getElementById('modal-thumb');
  const mTag = document.getElementById('modal-tag');
  const mName = document.getElementById('modal-name');
  const mDesc = document.getElementById('modal-desc');
  const mFeatsLabel = document.getElementById('modal-feats-label');
  const mFeats = document.getElementById('modal-feats');
  const mPrice = document.getElementById('modal-price');
  const mBuy = document.getElementById('modal-buy');

  function lang(){ return document.documentElement.getAttribute('lang') || 'id'; }
  function s(key){ return STRINGS[lang()][key]; }
  function waLink(msg){ return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg); }
  function buyMessage(name, price){
    if(lang() === 'en') return 'Hello CobexTech, I would like to buy "' + name + '" (Price: ' + price + '). Please share more details.';
    return 'Halo CobexTech, saya ingin membeli "' + name + '" (Harga: ' + price + '). Mohon info lebih lanjut.';
  }
  function priceOf(card){ return card.querySelector('.price').textContent.trim(); }
  function nameOf(card){ return card.querySelector('h4').getAttribute('data-' + lang()); }
  function thumbTextOf(thumb){ const el = thumb.querySelector('.shop-thumb-text'); return el ? el.getAttribute('data-' + lang()) : (thumb.getAttribute('data-' + lang()) || ''); }
  function orderFrom(card){
    const name = nameOf(card);
    const price = priceOf(card);
    window.open(waLink(buyMessage(name, price)), '_blank', 'noopener');
  }

  function openModal(card){
    if(!modal) return;
    const l = lang();
    const cardThumb = card.querySelector('.shop-thumb');
    mThumb.classList.remove('has-img');
    mThumb.innerHTML = '';
    const thumbImg = cardThumb.querySelector('img');
    const thumbSrc = (cardThumb.dataset && cardThumb.dataset.img) || (thumbImg && (thumbImg.getAttribute('src') || thumbImg.dataset.src));
    const loadedImg = thumbImg && thumbImg.naturalWidth > 0 ? thumbImg : null;
    if(loadedImg){
      const mImg = document.createElement('img');
      mImg.className = 'modal-thumb-img';
      mImg.src = loadedImg.src;
      mImg.alt = loadedImg.alt || '';
      mThumb.appendChild(mImg);
      mThumb.classList.add('has-img');
    } else if(thumbSrc){
      const mImg = document.createElement('img');
      mImg.className = 'modal-thumb-img';
      mImg.alt = thumbTextOf(cardThumb) || '';
      mImg.addEventListener('load', () => mThumb.classList.add('has-img'));
      mImg.addEventListener('error', () => { mImg.remove(); mThumb.textContent = thumbTextOf(cardThumb); });
      mThumb.appendChild(mImg);
      mImg.src = thumbSrc;
    } else {
      mThumb.textContent = thumbTextOf(cardThumb);
    }
    mTag.textContent = card.querySelector('.shop-tag').getAttribute('data-' + l);
    mName.textContent = nameOf(card);
    mDesc.textContent = card.querySelector('p').getAttribute('data-' + l);
    mFeatsLabel.textContent = s('feats');
    const feats = (l === 'en' ? card.dataset.featEn : card.dataset.featId).split('|');
    mFeats.innerHTML = '';
    feats.forEach(f => {
      const li = document.createElement('li');
      li.textContent = f.trim();
      mFeats.appendChild(li);
    });
    mPrice.textContent = priceOf(card);
    mBuy.textContent = s('buy');
    mBuy.href = waLink(buyMessage(nameOf(card), priceOf(card)));
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeModal(){
    if(!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  if(modal){
    modal.querySelectorAll('[data-modal-close]').forEach(el => el.addEventListener('click', closeModal));
    modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });
    if(mBuy) mBuy.addEventListener('click', closeModal);
  }

  // Thumbnail image support (optional): add data-img="path" to .shop-thumb or nest an <img>
  // (src or data-src). If the image is missing/fails to load, the default text thumbnail remains.
  // Note: .shop-thumb itself must NOT carry data-id/data-en (main.js i18n would wipe children).
  document.querySelectorAll('.shop-thumb').forEach(thumb => {
    const dataSrc = thumb.dataset.img;
    if(dataSrc){
      const img = document.createElement('img');
      img.className = 'shop-thumb-img';
      img.alt = thumbTextOf(thumb) || '';
      img.loading = 'lazy';
      const onLoad = () => thumb.classList.add('has-img');
      const onErr = () => { img.remove(); thumb.classList.remove('has-img'); };
      img.addEventListener('load', onLoad, {once:true});
      img.addEventListener('error', onErr, {once:true});
      thumb.appendChild(img);
      img.src = dataSrc;
    }
    thumb.querySelectorAll('img').forEach(img => {
      // Support lazy-load style: data-src instead of src
      if(!img.getAttribute('src') && img.dataset.src){
        const onLoad = () => thumb.classList.add('has-img');
        const onErr = () => { img.remove(); thumb.classList.remove('has-img'); };
        img.addEventListener('load', onLoad, {once:true});
        img.addEventListener('error', onErr, {once:true});
        img.src = img.dataset.src;
        return;
      }
      const onLoad = () => thumb.classList.add('has-img');
      const onErr = () => { img.remove(); thumb.classList.remove('has-img'); };
      if(img.complete && img.naturalWidth > 0){
        onLoad();
      } else if(img.complete && img.naturalWidth === 0 && img.loading !== 'lazy'){
        onErr();
      } else {
        img.addEventListener('load', onLoad, {once:true});
        img.addEventListener('error', onErr, {once:true});
      }
    });
  });

  // Donation handling for Web Yayasan card
  const donationCards = document.querySelectorAll('.shop-card[data-donation="true"]');
  donationCards.forEach(card => {
    const btn = card.querySelector('.donate-btn');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const input = card.querySelector('.donation-input-field');
      const amount = input ? parseInt(input.value) : 50000;
      if (!amount || amount < 50000) {
        alert(lang() === 'en' ? 'Minimum donation is Rp 50.000' : 'Minimal donasi Rp 50.000');
        return;
      }
      const name = nameOf(card);
      const msg = lang() === 'en'
        ? 'Hello CobexTech, I would like to donate for "' + name + '" (Donation Amount: Rp ' + amount.toLocaleString('id-ID') + '). I am ready to transfer. Please share payment details.'
        : 'Halo CobexTech, saya ingin mendonasikan untuk "' + name + '" (Jumlah Donasi: Rp ' + amount.toLocaleString('id-ID') + '). Saya sudah siap untuk transfer. Mohon info rekening tujuan.';
      window.open(waLink(msg), '_blank', 'noopener');
    });
  });

  // Prevent modal opening when clicking donation input
  document.querySelectorAll('.donation-input-field').forEach(input => {
    input.addEventListener('click', e => e.stopPropagation());
  });

  document.querySelectorAll('.shop-card').forEach(card => {
    card.addEventListener('click', e => {
      if(e.target.closest('.buy-btn')) return;
      openModal(card);
    });
    const btn = card.querySelector('.buy-btn');
    if(btn) btn.addEventListener('click', () => orderFrom(card));
  });
})();
