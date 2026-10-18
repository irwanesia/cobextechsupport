# CobexTech — Digital Studio Portfolio

Portfolio website untuk **CobexTech**, digital studio yang membantu bisnis, UMKM, sekolah, organisasi, dan instansi mengembangkan kehadiran digital mereka.

🌐 **Live:** https://cobextech.netlify.app/

## Halaman

| Halaman | Deskripsi |
| --- | --- |
| `index.html` | Landing page / beranda |
| `about.html` | Tentang studio & cara kerja |
| `service.html` | Layanan + **Pricing** (Starter/Business/Custom) & FAQ |
| `portfolio.html` | Kumpulan proyek + section **Demo Website** |
| `demo/bengkel.html` | Contoh website bengkel (`/demo/bengkel`) |
| `demo/lpk.html` | Contoh website LPK/kursus (`/demo/lpk`) |
| `demo/kontraktor.html` | Contoh website kontraktor (`/demo/kontraktor`) |
| `demo/klinik.html` | Contoh website klinik (`/demo/klinik`) |
| `demo/distributor.html` | Contoh website distributor (`/demo/distributor`) |
| `blog.html`, `blog-post.html`, `blog-1..5.html` | Daftar artikel dan halaman artikel |
| `blog-admin.html` | Editor artikel (URL internal, dilindungi kunci Apps Script) |
| `shop.html` | Produk software & digital |
| `contact.html` | Kontak & formulir proyek |

## Teknologi

- HTML5 & CSS3 (native, tanpa framework)
- JavaScript vanilla (`assets/main.js`, `assets/shop.js`, `assets/contact.js`)
- Google Fonts (Montserrat, Lora, JetBrains Mono)
- Google Apps Script + Google Sheets (backend formulir kontak dan penyimpanan artikel)
- Google Analytics 4 (event tracking pricing, demo, WhatsApp, email, contact)

## Fitur

- **Semantic HTML & SEO**: struktur `<main>`, `<article>`, `<ul>/<li>`, meta description, Open Graph, dan canonical URL di setiap halaman.
- **Bilingual**: Indonesia/Inggris, tersimpan di `localStorage`.
- **Tema gelap/terang**: toggle tema dengan persistensi.
- **Formulir kontak**: kirim pesan ke Google Sheets via Apps Script web app, dengan notifikasi toast sukses/gagal.
- **Blog**: artikel baru/diperbarui disimpan di tab `articles`; artikel berstatus terbit muncul di daftar blog dalam bahasa yang dipilih.
- **Pricing**: paket Starter/Business/Custom dengan "Mulai dari" dan FAQ di `/service`.
- **Demo Website**: 5 "Contoh Website" hidup di `/demo/*` (bengkel, lpk, kontraktor, klinik, distributor) untuk mendukung sales/prospecting.
- **Analytics**: GA4 mengirim event kategori (pricing, demo, WhatsApp, email, contact) via `dataLayer`.

## Struktur

```
├── assets/
│   ├── style.css    # Global stylesheet
│   ├── demo.css     # Gaya bersama halaman demo
│   ├── main.js      # Script utama (tema, bahasa, navigasi, GA4 events)
│   ├── shop.js      # Script halaman shop (modal produk & WhatsApp)
│   ├── contact.js   # Script formulir kontak → Google Sheets
│   ├── blog-config.js # URL Apps Script untuk fitur blog
│   ├── blog.js      # Memuat artikel terbit ke daftar blog
│   ├── blog-post.js # Memuat halaman artikel dari Apps Script
│   └── blog-admin.js # Editor artikel
├── apps-script/
│   └── Code.gs      # Backend Apps Script (doPost → appendRow ke sheet)
├── demo/            # Halaman "Contoh Website": bengkel, lpk, kontraktor, klinik, distributor
├── *.html           # Halaman statis
```

## Setup Google Apps Script (Kontak dan Blog)

1. Buat Google Sheet. Tab kontak memakai header `Timestamp | Nama | Email | Pesan`; tab artikel dibuat otomatis dengan kolom ID dan EN.
2. Buka **Extensions → Apps Script**, tempel isi `apps-script/Code.gs`, lalu isi `SHEET_ID`.
3. Di **Project Settings → Script Properties**, tambahkan `BLOG_ADMIN_KEY` dengan kunci acak yang panjang. Jangan simpan kunci di file website atau bagikan.
4. **Deploy → Manage deployments → Edit** deployment Web App yang dipakai kontak: *Execute as* = **Me**, *Who has access* = **Anyone**. Deploy versi baru.
5. Pastikan URL deployment `/exec` di `assets/contact.js` dan `assets/blog-config.js` sama dengan URL deployment aktif.
6. Buka `blog-admin.html`, masukkan `BLOG_ADMIN_KEY`, lalu buat artikel. Isi Indonesia wajib; terjemahan Inggris opsional dan setiap kolom Inggris yang kosong akan memakai teks Indonesia. Slug yang sama akan memperbarui artikel; matikan **Terbitkan artikel** untuk menyimpannya sebagai draft.
7. Setelah setiap perubahan `Code.gs`, deploy versi baru agar endpoint aktif memakai perubahan terbaru.

Form kontak tetap memakai endpoint yang sama. Artikel publik hanya mengembalikan baris berstatus `published`; operasi tulis dan daftar draft memerlukan kunci admin. Kunci dikirim ke Apps Script saat editor meminta daftar artikel; gunakan kunci acak yang panjang dan rotasi di Script Properties bila pernah terekspos. Jika tab `articles` sudah memakai format lama, Apps Script akan memindahkan data lama ke kolom Indonesia dan mempertahankan artikelnya saat endpoint berikutnya dipanggil.

URL artikel baru menyertakan `lang=id` atau `lang=en` agar pilihan bahasa dapat dibagikan. Halaman admin tidak memiliki pengalih bahasa dan seluruh kontrolnya berbahasa Indonesia.

## Google Sheets dan SEO

Google Sheets sendiri bukan halaman artikel yang dapat dioptimalkan untuk SEO. Website ini memakai Sheet sebagai penyimpanan; konten artikel baru dimuat oleh JavaScript setelah halaman dibuka. Mesin pencari dapat merender JavaScript, tetapi pengindeksan dan preview media sosial biasanya lebih andal jika setiap artikel diterbitkan sebagai HTML statis dengan URL permanen, metadata di HTML awal, dan sitemap. Artikel lama (`blog-1.html` hingga `blog-5.html`) tetap berupa HTML statis; untuk SEO terbaik, artikel baru juga perlu diprerender/dibuat menjadi halaman HTML saat dipublikasikan.

## Menjalankan

Buka `index.html` langsung di browser, atau jalankan server lokal:

```bash
python3 -m http.server 8000
```

Lalu akses `http://localhost:8000`.

## Deploy

Site otomatis di-deploy ke Netlify dari branch `main`. Push ke `main` untuk memperbarui produksi.

## Branch

- `main` — situs portfolio saat ini (terhubung ke Netlify)
- `legacy` — versi situs lama Cobex Tech Support
- `master` — arsip lama