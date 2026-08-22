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
  function orderFrom(card){
    const name = nameOf(card);
    const price = priceOf(card);
    window.open(waLink(buyMessage(name, price)), '_blank', 'noopener');
  }

  function openModal(card){
    if(!modal) return;
    const l = lang();
    mThumb.textContent = card.querySelector('.shop-thumb').getAttribute('data-' + l);
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

  document.querySelectorAll('.shop-card').forEach(card => {
    card.addEventListener('click', e => {
      if(e.target.closest('.buy-btn')) return;
      openModal(card);
    });
    const btn = card.querySelector('.buy-btn');
    if(btn) btn.addEventListener('click', () => orderFrom(card));
  });
})();