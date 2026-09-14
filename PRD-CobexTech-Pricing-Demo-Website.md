# PRD — CobexTech: Pricing & Demo Website

## 1. Tujuan

Menambahkan dua komponen pada website CobexTech:

1. **Pricing** pada `/service`
2. **Demo Website** pada `/portfolio`

Tujuannya adalah menjadikan website bukan hanya portfolio, tetapi juga alat bantu sales untuk prospecting.

Alur:

`Service → Pricing → Portfolio → Demo → WhatsApp/Contact → Proposal`

Halaman Service saat ini sudah menjelaskan Website Bisnis & UMKM, Aplikasi Web, Solusi Digital Kustom, serta Konsultasi & Pendampingan, tetapi belum menampilkan harga.

Halaman Portfolio saat ini berisi project nyata seperti company profile, lembaga sertifikasi/pelatihan, ecommerce, manufaktur, F&B, AI, sistem informasi, dan platform. Demo harus dipisahkan dari project nyata.

Demo terdiri dari **5 niche** dengan URL publik tetap:

```text
bengkel → /demo/bengkel
lpk/kursus/training → /demo/lpk
kontraktor/renovasi → /demo/kontraktor
klinik/dokter/dental → /demo/klinik
distributor/supplier → /demo/distributor
```

> **Lingkup repository:** PRD ini diimplementasikan di repository portfolio CobexTech (website statis: HTML/CSS/JS). Produk Cobex Service System (prospecting) berjalan sebagai **sistem terpisah** di luar repository ini — lihat Seksi 14 untuk batasan integrasi.

---

## 2. Pricing Strategy

AI memang membuat development lebih cepat, tetapi tidak berarti jasa harus dijual berdasarkan jumlah jam coding atau turun ke harga termurah.

Yang dijual tetap:

- discovery;
- struktur informasi;
- desain;
- responsive implementation;
- integrasi;
- testing;
- deployment;
- SEO dasar;
- revisi;
- support.

Gunakan AI sebagai **keunggulan produktivitas internal**, bukan alasan untuk perang harga.

Pasar Indonesia 2026 sangat lebar: landing page dapat ditemukan dari kisaran ratusan ribu sampai beberapa juta, company profile dari sekitar Rp1,5 juta hingga Rp20 juta, dan custom website/web application mulai belasan juta hingga jauh lebih tinggi tergantung kompleksitas.

### Rekomendasi harga CobexTech

| Paket | Harga publik | Target |
|---|---:|---|
| **Starter** | **Mulai Rp2.500.000** | UMKM / bisnis lokal |
| **Business** | **Mulai Rp5.500.000** | Bisnis yang sudah berjalan |
| **Custom** | **Mulai Rp15.000.000** | Web app / sistem / integrasi |

Ini positioning yang saya rekomendasikan: **terjangkau tetapi profesional**, bukan vendor termurah.

Beberapa penyedia 2026 menempatkan landing page sekitar Rp2 juta, company profile sekitar Rp3,5 juta, dan paket bisnis yang lebih lengkap sekitar Rp11 juta. Referensi lain menempatkan company profile sekitar Rp5–20 juta.

---

## 3. Paket Starter

### Mulai Rp2.500.000

Cocok untuk:

- UMKM;
- bisnis lokal;
- personal/business service;
- bisnis yang baru membangun digital presence.

Termasuk:

- 1 landing page;
- responsive/mobile friendly;
- branding sederhana;
- layanan;
- about;
- portfolio/gallery;
- contact;
- Google Maps;
- WhatsApp CTA;
- basic SEO;
- deployment;
- maksimal 2 putaran revisi.

Estimasi: **3–7 hari kerja** setelah materi tersedia.

Positioning:

> Website profesional untuk bisnis yang ingin mulai punya presence online tanpa biaya besar.

---

## 4. Paket Business

### Mulai Rp5.500.000

**Recommended / paket utama.**

Cocok untuk:

- perusahaan kecil-menengah;
- LPK;
- bengkel;
- kontraktor;
- klinik;
- distributor;
- jasa profesional.

Termasuk:

- 5–8 halaman;
- custom UI;
- responsive;
- Home;
- About/Company Profile;
- Services;
- Portfolio/Gallery;
- Contact;
- Google Maps;
- WhatsApp;
- basic SEO;
- contact form;
- deployment;
- maksimal 3 putaran revisi.

Estimasi: **1–3 minggu**, tergantung scope dan kesiapan konten.

Positioning:

> Website bisnis yang lebih lengkap untuk membangun kredibilitas dan mendapatkan inquiry.

---

## 5. Paket Custom

### Mulai Rp15.000.000

Cocok untuk:

- web application;
- dashboard;
- booking;
- membership;
- ecommerce kompleks;
- integrasi API;
- automation;
- sistem internal;
- kebutuhan khusus.

Harga final berdasarkan:

`scope + UI/UX + fitur + integrasi + database + authentication + deployment + maintenance`

Positioning:

> Solusi digital yang dirancang mengikuti proses bisnis Anda.

Referensi pasar 2026 menempatkan custom website/web application sekitar Rp15 juta hingga Rp100 juta+ tergantung kompleksitas.

---

## 6. Layout `/service`

Pertahankan section layanan existing.

Setelah:

```text
Apa yang Kami Kerjakan
├── Website Bisnis & UMKM
├── Aplikasi Web
├── Solusi Digital Kustom
└── Konsultasi & Pendampingan
```

tambahkan:

```text
PAKET WEBSITE

┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ STARTER      │ │ BUSINESS     │ │ CUSTOM       │
│              │ │ RECOMMENDED  │ │              │
│ Rp2,5 jt     │ │ Rp5,5 jt     │ │ Rp15 jt      │
│              │ │              │ │              │
│ 1 halaman    │ │ 5–8 halaman  │ │ Web App      │
│ WA           │ │ Custom UI    │ │ Dashboard    │
│ Maps         │ │ SEO dasar    │ │ Integrasi    │
│ SEO dasar    │ │ Portfolio    │ │ Automation   │
│              │ │              │ │              │
│ [Konsultasi] │ │ [Konsultasi] │ │ [Diskusikan] │
└──────────────┘ └──────────────┘ └──────────────┘
```

Gunakan **"Mulai dari"**, bukan harga mati.

---

## 7. Domain, Hosting, Maintenance

Jangan membuat scope ambigu.

Kebijakan tetap:

- **Starter & Business:** domain + hosting tahun pertama **sudah termasuk** dalam paket.
- **Custom:** domain + hosting dibahas per proyek — dapat termasuk atau terpisah sesuai kesepakatan scope.
- **Renewal:** perpanjangan domain + hosting tahun berikutnya terpisah dan mengikuti layanan yang dipilih.
- **Maintenance:** layanan tambahan/paket terpisah, tidak termasuk harga paket awal.

Contoh copy publik:

> Domain dan hosting tahun pertama termasuk sesuai detail paket. Perpanjangan berikutnya mengikuti layanan yang dipilih.

---

## 8. Pricing FAQ

Tambahkan setelah pricing:

**Apakah harga sudah termasuk domain dan hosting?**

> Ya. Untuk paket Starter dan Business, domain dan hosting tahun pertama sudah termasuk. Renewal tahun berikutnya adalah biaya terpisah sesuai layanan yang dipilih.

**Apakah bisa request desain sendiri?**

> Bisa. Referensi desain dapat digunakan sebagai acuan dan disesuaikan dengan kebutuhan bisnis.

**Apakah bisa menambah fitur?**

> Bisa. Fitur tambahan dihitung berdasarkan kebutuhan dan kompleksitas.

**Apakah harga bisa disesuaikan?**

> Bisa melalui penyesuaian scope. Jika budget terbatas, fitur dapat disederhanakan atau dimulai dari paket yang lebih sesuai.

---

## 9. Demo Website

### Lokasi

Demo diletakkan **di bawah project nyata** pada `/portfolio`.

Struktur:

```text
PORTFOLIO
Project nyata yang pernah kami kerjakan
↓
[Project 01] [Project 02] [Project 03] ...
↓
DEMO WEBSITE
Contoh website yang dapat disesuaikan
dengan berbagai jenis bisnis.
↓
[Bengkel] [LPK] [Kontraktor]
[Klinik] [Distributor]
```

Project nyata tetap menjadi bukti pengalaman. Demo menjadi bukti seperti apa hasil yang dapat dibuat untuk niche tertentu.

---

## 10. Demo Harus Website Hidup

Jangan hanya screenshot.

Setiap card:

```text
┌──────────────────────────────┐
│        PREVIEW WEBSITE       │
├──────────────────────────────┤
│ Website Bengkel              │
│ Contoh website untuk bisnis  │
│ bengkel dengan fokus layanan │
│ dan WhatsApp.                │
│                              │
│ [Lihat Demo →]               │
└──────────────────────────────┘
```

URL:

```text
/demo/bengkel
/demo/lpk
/demo/kontraktor
/demo/klinik
/demo/distributor
```

Gunakan istilah **"Contoh Website"**, bukan "Template Website", agar positioning tetap sebagai website yang disesuaikan.

---

## 11. Lima Demo

### Bengkel

- Hero
- Services
- Why Choose Us
- Gallery
- Testimonials
- Location
- WhatsApp CTA

CTA: **Konsultasikan Servis Anda**

### LPK

- Hero
- Program
- Keunggulan
- Jadwal
- Persyaratan
- Dokumentasi
- Testimonial
- FAQ
- Contact

CTA: **Tanya Program**

### Kontraktor

- Hero
- Services
- Project Portfolio
- Process
- Why Us
- Testimonials
- Service Area
- Contact

CTA: **Konsultasikan Proyek**

### Klinik

- Hero
- Services
- Doctors/Team
- Facilities
- Testimonials
- Opening Hours
- Location
- Booking CTA

CTA: **Buat Janji**

Harus jelas bahwa ini demo, bukan website klinik nyata.

### Distributor

- Hero
- Company Profile
- Product Categories
- Brands
- Industries Served
- Advantages
- Clients
- Contact

CTA: **Minta Katalog**

---

## 12. Demo Detail CTA

Pada bagian bawah setiap demo:

```text
Ingin website seperti ini
untuk bisnis Anda?

CobexTech dapat menyesuaikan desain,
konten, dan fitur sesuai kebutuhan.

[ Diskusikan Website Anda ]
```

CTA menuju `/contact` atau WhatsApp.

---

## 13. Sales Flow

```text
Google Maps
    ↓
Prospect
    ↓
Qualification
    ↓
Outreach
    ↓
Prospect merespons
    ↓
Identifikasi niche
    ↓
Kirim demo relevan
    ↓
Prospect melihat demo
    ↓
Tertarik
    ↓
Prototype khusus
    ↓
Proposal
    ↓
Closing
```

**Jangan membuat prototype khusus sebelum prospect menunjukkan ketertarikan.**

---

## 14. Integrasi dengan Cobex Service System

Cobex Service System adalah **sistem terpisah** dari repository website ini. Batasan integrasi:

- Repository website ini hanya menyediakan **URL demo publik yang stabil** (`/demo/<niche>`).
- Cobex Service System menghubungkan `recommended_demo` pada prospect ke URL tersebut.
- Pemetaan sederhana cukup untuk MVP — tidak membutuhkan AI untuk menentukan demo.
- Tidak ada kode bersama maupun dependency antara kedua sistem.

Di sisi Cobex Service System, `recommended_demo` ditambahkan pada prospect.

Contoh:

```text
ABC Motor
Category: Bengkel
Score: 82 — HOT

Recommended Demo:
Website Bengkel

[ Lihat Demo ]
[ WhatsApp ]
[ Email ]
```

Mapping awal:

```text
bengkel → /demo/bengkel
lpk/kursus/training → /demo/lpk
kontraktor/renovasi → /demo/kontraktor
klinik/dokter/dental → /demo/klinik
distributor/supplier → /demo/distributor
```

---

## 15. SEO Demo

Keputusan: halaman demo **di-index** di mesin pencari, dengan konten unik per niche (bukan salin-tempel antar demo).

Setiap demo memiliki:

- title;
- meta description;
- Open Graph;
- canonical (konsisten dengan format URL `/demo/<niche>`);
- label demo/contoh.

Contoh:

```text
Title:
Contoh Website Bengkel | CobexTech

Description:
Contoh desain website profesional untuk bisnis bengkel
dengan layanan, portfolio, lokasi, dan WhatsApp.
```

---

## 16. Analytics

Implementasi: **Google Analytics 4 (GA4)**.

- Sematkan snippet GA4 di semua halaman (Measurement ID placeholder: `G-XXXXXXXXXX`).
- Event manual dikirim via `dataLayer.push` di `assets/main.js`, menggunakan atribut `data-event` pada elemen yang dilacak.

Track minimal:

```text
Pricing card clicked
Demo card clicked
Demo CTA clicked
WhatsApp clicked
Email clicked
Contact clicked
```

Tujuannya mengetahui:

- paket yang paling menarik;
- demo yang paling banyak dilihat;
- demo → contact conversion.

---

## 17. Technical Requirement

Ikuti stack website CobexTech existing. Tidak perlu menambahkan framework baru hanya untuk pricing/demo.

Gunakan:

- existing HTML/CSS/JS;
- existing design system;
- existing navbar/footer;
- responsive layout;
- language switch ID/EN.

Struktur file:

```text
service.html          # + section Pricing & FAQ
portfolio.html        # + section Demo Website
demo/
├── bengkel.html      # /demo/bengkel
├── lpk.html          # /demo/lpk
├── kontraktor.html   # /demo/kontraktor
├── klinik.html       # /demo/klinik
└── distributor.html  # /demo/distributor
assets/
├── style.css         # stylesheet global
└── demo.css          # gaya bersama halaman demo
```

URL publik memakai **clean URL Netlify**: file `demo/bengkel.html` diakses sebagai `/demo/bengkel`. Canonical mengikuti format ini.

Untuk lima demo awal, static data sudah cukup.

---

## 18. Acceptance Criteria — Pricing

- [ ] Pricing tampil di `/service`.
- [ ] Starter Rp2,5 juta.
- [ ] Business Rp5,5 juta.
- [ ] Custom mulai Rp15 juta.
- [ ] Menggunakan "Mulai dari".
- [ ] Business ditandai Recommended.
- [ ] Feature list jelas.
- [ ] CTA setiap paket.
- [ ] FAQ tersedia.
- [ ] Domain/hosting/renewal tidak ambigu.
- [ ] Event pricing card tercatat (GA4).
- [ ] Responsive.
- [ ] ID/EN tersedia.

---

## 19. Acceptance Criteria — Demo

- [ ] Demo berada setelah project nyata.
- [ ] Demo tidak bercampur dengan project nyata.
- [ ] Minimal 3 demo tahap awal.
- [ ] Target 5 demo.
- [ ] Demo berupa website hidup.
- [ ] URL konsisten (`/demo/<niche>`).
- [ ] Card memiliki preview, deskripsi, dan CTA.
- [ ] Demo memiliki CTA kembali ke CobexTech.
- [ ] Responsive.
- [ ] SEO metadata & canonical tersedia (demo di-index).
- [ ] Label demo jelas.

---

## 20. Definition of Done

### Service

- [ ] Pricing selesai.
- [ ] Starter Rp2,5 juta.
- [ ] Business Rp5,5 juta.
- [ ] Custom mulai Rp15 juta.
- [ ] FAQ selesai.
- [ ] CTA selesai.
- [ ] Responsive.
- [ ] ID/EN selesai.

### Portfolio

- [ ] Project nyata tetap di bagian atas.
- [ ] Demo section ditambahkan di bawahnya.
- [ ] Minimal 3 demo aktif.
- [ ] Target 5 demo.
- [ ] Demo card selesai.
- [ ] Landing page demo selesai.
- [ ] CTA selesai.
- [ ] Responsive.

### Analytics

- [ ] GA4 terpasang di semua halaman.
- [ ] Event kategori tercatat: pricing, demo, demo CTA, WhatsApp, email, contact.

### Sales Integration (Cobex Service System)

- [ ] Prospect dapat memiliki recommended demo.
- [ ] Prospect dapat membuka demo.
- [ ] Link demo dapat digunakan dalam WhatsApp.
- [ ] Link demo dapat digunakan dalam email.

---

## 21. Prioritas Implementasi

Jangan membuat lima demo sekaligus.

Urutan:

```text
1. Pricing Service (+ GA4, event pricing card)
2. Demo Bengkel
3. Demo LPK
4. Demo Kontraktor
5. Tracking demo & CTA (dataLayer events)
6. Mulai prospecting
7. Ukur response
8. Demo Klinik
9. Demo Distributor
```

Dengan demikian produksi demo mengikuti data nyata dari prospecting.

---

## 22. Keputusan Produk

**Pricing:** publik, tetapi menggunakan "Mulai dari".

**Portfolio:** project nyata tetap terpisah dari demo.

**Demo:** website hidup, bukan screenshot.

**Domain & hosting:** tahun pertama termasuk untuk Starter dan Business; renewal terpisah.

**SEO demo:** di-index dengan metadata lengkap dan konten unik per niche.

**Analytics:** GA4 + event manual untuk seluruh CTA.

**Prototype:** dibuat setelah prospect menunjukkan minat.

**AI:** digunakan untuk meningkatkan produktivitas internal, bukan dijadikan alasan untuk menjual sangat murah.

**Positioning CobexTech:**

> Studio digital yang terjangkau dan profesional untuk bisnis yang membutuhkan website dan solusi digital custom.

Bukan:

> Jasa pembuatan website termurah.

---

## 23. Ringkasan Harga Final

| Paket | Harga | Fungsi |
|---|---:|---|
| **Starter** | **Mulai Rp2.500.000** | 1 landing page |
| **Business** | **Mulai Rp5.500.000** | 5–8 halaman, custom business website |
| **Custom** | **Mulai Rp15.000.000** | Web app, sistem, integrasi |

Harga tersebut merupakan **positioning awal CobexTech**, bukan klaim bahwa seluruh pasar Indonesia menggunakan angka yang sama. Pasar 2026 sangat bervariasi berdasarkan scope, kualitas, teknologi, dan support.