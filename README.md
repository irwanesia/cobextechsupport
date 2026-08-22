# CobexTech — Digital Studio Portfolio

Portfolio website untuk **CobexTech**, digital studio yang membantu bisnis, UMKM, sekolah, organisasi, dan instansi mengembangkan kehadiran digital mereka.

🌐 **Live:** https://cobextech.netlify.app/

## Halaman

| Halaman | Deskripsi |
| --- | --- |
| `index.html` | Landing page / beranda |
| `about.html` | Tentang studio & cara kerja |
| `service.html` | Layanan yang ditawarkan |
| `portfolio.html` | Kumpulan proyek |
| `blog.html` & `blog-1..5.html` | Artikel & berita |
| `shop.html` | Produk software & digital |
| `contact.html` | Kontak & formulir proyek |

## Teknologi

- HTML5 & CSS3 (native, tanpa framework)
- JavaScript vanilla (`assets/main.js`, `assets/shop.js`, `assets/contact.js`)
- Google Fonts (Montserrat, Lora, JetBrains Mono)
- Google Apps Script + Google Sheets (backend formulir kontak)

## Fitur

- **Semantic HTML & SEO**: struktur `<main>`, `<article>`, `<ul>/<li>`, meta description, Open Graph, dan canonical URL di setiap halaman.
- **Bilingual**: Indonesia/Inggris, tersimpan di `localStorage`.
- **Tema gelap/terang**: toggle tema dengan persistensi.
- **Formulir kontak**: kirim pesan ke Google Sheets via Apps Script web app, dengan notifikasi toast sukses/gagal.

## Struktur

```
├── assets/
│   ├── style.css    # Global stylesheet
│   ├── main.js      # Script utama (tema, bahasa, navigasi)
│   ├── shop.js      # Script halaman shop (modal produk & WhatsApp)
│   └── contact.js   # Script formulir kontak → Google Sheets
├── apps-script/
│   └── Code.gs      # Backend Apps Script (doPost → appendRow ke sheet)
├── *.html           # Halaman statis
```

## Setup Formulir Kontak (Google Sheets)

1. Buat Google Sheet dengan header di baris 1: `Timestamp | Nama | Email | Pesan`.
2. Buka **Extensions → Apps Script**, tempel isi `apps-script/Code.gs`.
3. Ganti `SHEET_ID` dengan ID spreadsheet (dari URL) dan `SHEET_NAME` dengan nama tab sheet (mis. `contact`).
4. **Deploy → New deployment → Web app**: *Execute as* = **Me**, *Who has access* = **Anyone**, lalu salin URL `…/exec`.
5. Tempel URL tersebut di `assets/contact.js` pada konstanta `GAS_URL`.
6. Setiap kali mengubah `Code.gs`, buat **New version** lalu redeploy agar perubahan aktif.

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