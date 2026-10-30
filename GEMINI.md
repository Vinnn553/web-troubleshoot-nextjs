# Knowledge Base & Struktur Proyek

Dokumen ini adalah basis data pengetahuan permanen untuk asisten AI (Antigravity). File ini dibaca secara otomatis pada setiap sesi sehingga asisten memahami peta file proyek secara langsung tanpa perlu melakukan pencarian/scanning berulang.

---

## 1. Ringkasan Proyek & Tech Stack
- **Nama Proyek**: testing
- **Framework**: Next.js 16.4.3 (App Router)
- **Library Inti**: React 19.3.0, React DOM 19.3.0
- **Styling**: Tailwind CSS v4 (`@tailwindcss/turbopack`)
- **Fitur Khusus**:
  - Turbopack aktif (`next.config.mjs`)
  - React Compiler aktif (`babel-plugin-react-compiler`)
  - Cache Components & Partial Prefetching aktif
  - Path alias: `@/*` memetakan langsung ke `./*` (`jsconfig.json`)
- **Tujuan Aplikasi**: Web portal panduan troubleshooting & tutorial penanganan gangguan komputer dan jaringan.

---

## 2. Peta Struktur Direktori & File

```text
testing/
├── AGENTS.md                  # Aturan & catatan sistem agen (termasuk Next.js rules)
├── GEMINI.md                  # Knowledge base utama struktur & arsitektur proyek ini
├── eslint.config.mjs          # Konfigurasi linter ESLint
├── jsconfig.json              # Konfigurasi alias path TypeScript/JavaScript (@/*)
├── next.config.mjs            # Konfigurasi Next.js (turbopack, experimental flags)
├── package.json               # Daftar dependency dan script npm
├── package-lock.json          # Lockfile dependensi
├── README.md                  # Dokumentasi umum proyek
│
├── data/                      # Direktori data statis/mock JSON
│   └── tutorial.json          # Basis data konten panduan tutorial troubleshooting
│
├── lib/                       # Direktori utilitas & koneksi backend
│   └── db.js                  # Helper koneksi database PostgreSQL (Singleton Pool)
│
├── public/                    # Aset statis publik (dapat diakses langsung via URL root)
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   ├── window.svg
│   └── img/
│       └── Illustration.svg   # Ilustrasi vektor perangkat laptop/komputer untuk HeroSection
│
└── app/                       # Direktori utama App Router Next.js
    ├── favicon.ico            # Favicon situs
    ├── globals.css            # Definisi style Tailwind v4 dan styling global
    ├── layout.js              # Root Layout (scroll-smooth, font utama)
    ├── page.js                # Root page (halaman beranda menggabungkan semua section)
    │
    ├── components/            # Komponen UI global & dapat dipakai ulang (reusable)
    │   ├── Header.jsx         # Navbar atas (sticky, logo Dekoruma, search bar)
    │   ├── Footer.jsx         # Footer bawah (copyright, tahun dinamis via 'use cache')
    │   └── Modal.jsx          # Modal dialog untuk menampilkan isi tutorial/solusi
    │
    └── home/                  # Komponen spesifik untuk tampilan halaman utama (Home)
        ├── HeroSection.jsx    # Hero banner utama dengan animasi teks SplitText & tombol CTA
        ├── CategorySection.jsx# Katalog troubleshooting (OS, Hardware, Jaringan, dll.)
        └── TutorialList.jsx   # Daftar kartu tutorial / pemecahan masalah
```

---

## 3. Detail & Tanggung Jawab Tiap Berkas

### A. Konfigurasi Root
- **`package.json`**:
  - Scripts: `dev` (`next dev`), `build` (`next build`), `start` (`next start`), `lint` (`eslint`).
  - Dependencies: `next@16.4.3`, `react@19.3.0`, `react-dom@19.3.0`.
  - DevDependencies: `tailwindcss@^4`, `@tailwindcss/turbopack@^4`, `babel-plugin-react-compiler@1.0.0`.
- **`next.config.mjs`**: Mengaktifkan `reactCompiler`, `cacheComponents`, `partialPrefetching`, serta loader turbopack untuk CSS Tailwind.
- **`jsconfig.json`**: Memungkinkan import ringkas menggunakan `@/app/...`, `@/public/...`, dll.

### B. Direktori Utilitas & Backend (`lib/`)
- **`lib/db.js`**: Instance Singleton Pool untuk koneksi database PostgreSQL menggunakan `pg`.

### C. Aset Statis (`public/`)
- **`public/img/Illustration.svg`**: Gambar SVG ilustrasi yang diimpor oleh `HeroSection.jsx`.
- **`public/*.svg`**: Ikon default bawaan template Next.js.

### C. Direktori Aplikasi (`app/`)
- **`app/globals.css`**: Konfigurasi Tailwind v4 serta kelas kustom (misal: font, utilitas).
- **`app/layout.js`**: Komponen `RootLayout` pembungkus seluruh halaman aplikasi.
- **`app/page.js`**: Halaman utama yang menyusun komponen:
  - `<Header />` dari `@/app/components/Header`
  - `<HeroSection />` dari `@/app/home/HeroSection`
  - `<CategorySection />` dari `@/app/home/CategorySection`
  - `<Footer />` dari `@/app/components/Footer`

### D. Komponen Global (`app/components/`)
- **`Header.jsx`**: Header navigasi tetap di bagian atas dengan warna latar `#8dccff`, logo "Dekoruma.com", dan input pencarian.
- **`Footer.jsx`**: Footer asynchronous dengan fungsi cache `getYear()` (`'use cache'`) untuk menampilkan tahun hak cipta secara otomatis.
- **`Modal.jsx`**: Komponen popup modal interaktif untuk membaca panduan/solusi langkah demi langkah secara mendalam.

### E. Bagian Beranda (`app/home/`)
- **`HeroSection.jsx`**:
  - Menampilkan judul utama "Tutorial Penanganan Masalah Komputer & Jaringan".
  - Tombol CTA "Mulai Belajar" yang melompat ke `#kategori`.
  - Animasi teks berbasis `useEffect` (SplitText & Timeline).
  - Menampilkan gambar `Illustration.svg`.
- **`CategorySection.jsx`**:
  - Menampilkan grid kartu kategori kendala komputer (Operating System, Hardware Komputer, dll.).
  - Navigasi solusi dengan ikon Remix Icon / Lucide styling.
- **`TutorialList.jsx`**:
  - Menampilkan daftar kartu tutorial permasalahan teknis spesifik beserta level kesulitan dan tombol pemanggil modal solusi.

---

## 4. Konvensi & Aturan Pengembangan Masa Depan
1. **Komponen Global vs Parsial**:
   - Letakkan komponen yang dipakai di banyak halaman (Navbar, Modal, Alert, Button reusable) di `app/components/`.
   - Letakkan komponen spesifik fitur/halaman tertentu di folder fitur terkait (misalnya `app/home/`, `app/dashboard/`, dll.).
2. **Penyimpanan Aset**:
   - Seluruh gambar/ilustrasi statis disimpan di `public/img/` atau `public/icons/`.
3. **Pembaruan Basis Data Pengetahuan**:
   - Setiap kali membuat file baru, menghapus, atau merestrukturisasi direktori di masa depan, asisten AI **wajib memperbarui file `GEMINI.md` ini** agar peta struktur selalu sinkron dengan kondisi proyek terkini.

