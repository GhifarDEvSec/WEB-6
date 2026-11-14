# STRUCTURE

```
.
  index.html
  package.json
  package-lock.json
  tsconfig.json
  vite.config.ts
  .env
  .env.example
  .gitignore
  PROGRESS.md
  STRUCTURE.md
  Fase 1.md
  public/
    favicon.svg
  src/
    main.ts
    vite-env.d.ts
```

- index.html: kerangka halaman berbahasa Indonesia dengan judul, subjudul, kontainer bagian, dan pemuat modul.
- package.json: metadata proyek dan scripts dev, build, preview, serta typecheck.
- package-lock.json: pengunci versi dependensi sesuai npm install.
- tsconfig.json: konfigurasi TypeScript strict untuk folder src.
- vite.config.ts: konfigurasi Vite yang memakai base dari VITE_BASE_PATH.
- .env: variabel lingkungan lokal yang tidak masuk Git.
- .env.example: contoh variabel lingkungan yang wajib masuk Git.
- .gitignore: daftar berkas dan folder yang diabaikan Git.
- PROGRESS.md: catatan status pengerjaan tiap tahap.
- STRUCTURE.md: dokumentasi pohon direktori dan fungsi berkas.
- Fase 1.md: instruksi pengerjaan Main 1.
- public/favicon.svg: ikon centang di dalam kotak untuk favicon.
- src/main.ts: menampilkan VITE_APP_NAME pada elemen judul.
- src/vite-env.d.ts: deklarasi tipe untuk variabel VITE_ pada ImportMetaEnv.
