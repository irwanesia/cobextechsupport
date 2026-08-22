// CobexTech — contact form: send to Google Sheets via Apps Script web app
(function(){
  var GAS_URL =
    "https://script.google.com/macros/s/AKfycbxLattHayGs5JFx-diTBKDxJDi-UWOIXXWSIc-XzMth17D9dZO0V6fK7AqDhq8aTdUmYg/exec";

  var form = document.getElementById('contact-form');
  var toast = document.getElementById('form-toast');
  var toastIcon = document.getElementById('toast-icon');
  var toastMsg = document.getElementById('toast-msg');
  var submitBtn = form ? form.querySelector('.form-submit') : null;

  if(!form || !toast || !toastIcon || !toastMsg || !submitBtn) return;

  function lang(){ return document.documentElement.getAttribute('lang') || 'id'; }

  var STRINGS = {
    id: { sending: 'Mengirim…', success: 'Pesan berhasil dikirim. Terima kasih!', error: 'Gagal mengirim pesan. Silakan coba lagi.' },
    en: { sending: 'Sending…', success: 'Your message was sent successfully. Thank you!', error: 'Failed to send your message. Please try again.' }
  };

  var toastTimer = null;

  function showToast(kind){
    toast.classList.remove('success', 'error');
    toast.classList.add(kind);
    toastIcon.textContent = kind === 'success' ? '✓' : '✕';
    toastMsg.textContent = STRINGS[lang()][kind];
    toast.hidden = false;
    if(toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ toast.hidden = true; }, 6000);
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var email = form.elements.email.value.trim();
    var message = form.elements.message.value.trim();
    if(!name || !email || !message){
      showToast('error');
      return;
    }

    var originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = STRINGS[lang()].sending;

    fetch(GAS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ name: name, email: email, message: message })
    })
    .then(function(){
      form.reset();
      showToast('success');
    })
    .catch(function(){
      showToast('error');
    })
    .then(function(){
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    });
  });
})();