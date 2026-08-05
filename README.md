# CobexTech — Website

Website resmi **CobexTech** (sebelumnya *Cobex Tech Support*) — jasa Web
Development, AI Solutions, dan IT Support yang berbasis di Losari, Cirebon,
Jawa Barat.

Repo ini merupakan hasil revisi besar dari template awal, dengan tujuan
mengubah website dari sekadar landing page menjadi website portfolio +
blog yang lebih modern, elegan, dan siap dikembangkan lebih lanjut
(termasuk CMS/admin panel di tahap berikutnya).

---

## ✨ Apa yang berubah di revisi ini

| # | Perubahan | Status |
|---|---|---|
| 1 | Logo baru (`<CobexTech />`) dipasang di navbar, favicon, dan footer | ✅ |
| 2 | Rebrand penuh dari "Cobex Tech Support" → "CobexTech" di seluruh halaman | ✅ |
| 3 | Refresh warna & komponen (navy `#0f172a` + teal `#14b8a6`, tombol pill, card lebih rounded/soft-shadow) — tetap di atas template **FlexStart** | ✅ |
| 4 | Section baru **Proyek & Unduhan**: project client yang sudah live dapat tombol *Kunjungi Website*, project pribadi dapat tombol *Download* + *GitHub*, dengan filter | ✅ |
| 5 | Form kontak fungsional (`forms/contact.php`) ditambahkan di section Kontak, berdampingan dengan peta lokasi | ✅ |
| 6 | Blog sudah tersedia sebagai halaman terpisah (`blog.html`, `blog-details-*.html`) dan ditautkan jelas di navbar & footer — website tidak lagi single landing page | ✅ |
| 7 | Visitor counter di footer (CountAPI, fallback ke localStorage bila API tidak dapat diakses) | ✅ |
| 8 | Semua penyesuaian CSS/JS ditulis **mobile-first** (base style dulu, lalu `min-width` media query untuk tablet & desktop) | ✅ |
| 9 | Data proyek, blog, dan statistik masih **dummy/placeholder** — menunggu halaman admin | ⏳ |

---

## 🗂️ Struktur folder penting

```
├── index.html                  # Homepage (hero, about, services, portfolio,
│                                #   proyek & unduhan, testimoni, team, kontak)
├── blog.html                   # Daftar artikel blog
├── blog-details-1..4.html      # Detail artikel blog
├── portfolio-details.html
├── service-detail(s).html
├── forms/
│   └── contact.php             # Handler form kontak (PHP)
├── assets/
│   ├── css/
│   │   ├── main.css            # CSS bawaan template FlexStart (variabel warna)
│   │   └── custom.css          # ⭐ Kustomisasi CobexTech (mobile-first)
│   ├── js/
│   │   ├── main.js             # JS bawaan template
│   │   └── custom.js           # ⭐ Filter proyek + visitor counter
│   ├── img/
│   │   ├── logo.png            # Logo CobexTech (baru)
│   │   └── portfolio/…         # Screenshot proyek
│   └── downloads/               # ⭐ File ZIP dummy untuk proyek pribadi
└── README.md
```

File yang ditandai ⭐ adalah tambahan baru dari revisi ini, dipisah dari
file bawaan template supaya update template di masa depan tidak menimpa
kustomisasi.

---

## 🚧 Status data: dummy

Sesuai arahan, halaman **publik** dikerjakan lebih dulu memakai data dummy:

- **Proyek & Unduhan** — 6 kartu contoh (3 project client "Live", 3 project
  pribadi dengan tombol Download & GitHub). Link `https://example.com` dan
  file `.zip` di `assets/downloads/` masih placeholder.
- **Visitor counter** — memakai layanan gratis [CountAPI](https://countapi.xyz)
  sehingga sudah menghitung kunjungan riil tanpa perlu backend. Kalau
  layanan tidak bisa diakses, otomatis fallback ke hitungan lokal per
  browser (sementara, bukan angka global).
- **Blog, testimoni, portfolio** — masih konten contoh dari template/isian
  sebelumnya.

Setelah halaman **admin** (CMS untuk blog & proyek) selesai dibangun,
bagian-bagian ini tinggal disambungkan ke data asli (API/database),
tanpa perlu mengubah struktur HTML/CSS yang sudah dibuat.

---

## 🎨 Prinsip desain

- **Mobile-first**: seluruh CSS tambahan (`custom.css`) ditulis dari layar
  kecil dulu, baru diperluas dengan `@media (min-width: 768px)` dan
  `@media (min-width: 1200px)`.
- **Modern, elegan, simple**: warna diselaraskan dengan logo (navy + teal),
  tombol pill/rounded, card dengan shadow lembut, tanpa mengubah struktur
  dasar template FlexStart (supaya mudah dirawat & tetap kompatibel).
- Tetap memakai template **FlexStart** (BootstrapMade) sebagai basis,
  sesuai arahan.

---

## 🛠️ Tech stack

- HTML5 + Bootstrap 5.3
- Vanilla JS (filter proyek, visitor counter) + library bawaan template
  (AOS, GLightbox, Isotope, Swiper, PureCounter)
- PHP untuk handler form kontak (`forms/contact.php`)
- CountAPI (visitor counter, client-side, tanpa backend)

## 📋 To-do berikutnya

- [ ] Bangun halaman admin (CMS) untuk kelola Blog & Proyek
- [ ] Sambungkan section "Proyek & Unduhan" ke data asli (ganti dummy)
- [ ] Sambungkan form kontak ke email/notifikasi WhatsApp
- [ ] Ganti visitor counter ke sistem sendiri (opsional, saat backend siap)
- [ ] SEO lanjutan (structured data, sitemap, OpenGraph image)

---

© CobexTech — Web Development × AI Solutions
