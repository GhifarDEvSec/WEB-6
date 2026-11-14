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
  public/
    favicon.svg
  src/
    main.ts
    vite-env.d.ts
    types.ts
    config.ts
    components/
      taskForm.ts
      taskList.ts
      taskItem.ts
      emptyState.ts
    services/
      storageService.ts
      taskService.ts
    styles/
      tokens.css
      base.css
      components.css
    utils/
      collection.ts
      date.ts
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
- public/favicon.svg: ikon centang di dalam kotak untuk favicon.
- src/main.ts: memuat font dan CSS, lalu merender form serta daftar tugas.
- src/vite-env.d.ts: deklarasi tipe untuk variabel VITE_ pada ImportMetaEnv.
- src/types.ts: tipe Task, TaskId, TaskStatus, TaskFilter, TaskInput, AppConfig, dan DueDateParts.
- src/config.ts: membaca variabel lingkungan menjadi objek appConfig.
- src/components/taskForm.ts: form tambah tugas beserta validasi dan label terhubung.
- src/components/taskList.ts: merender daftar tugas terurut atau empty state.
- src/components/taskItem.ts: kartu tugas dengan blok tanggal, chip mata kuliah, dan badge status.
- src/components/emptyState.ts: kartu kosong dengan ilustrasi SVG buku dan centang.
- src/services/storageService.ts: memuat dan menyimpan data ke localStorage.
- src/services/taskService.ts: memuat dan menambah tugas pada localStorage.
- src/styles/tokens.css: token warna, jarak, tipografi, bayangan, dan animasi.
- src/styles/base.css: reset, latar paper berpola titik, header, footer, dan fokus.
- src/styles/components.css: gaya form, tombol, kartu tugas, badge, dan empty state.
- src/utils/collection.ts: pencarian, penghapusan, dan pembaruan item pada array.
- src/utils/date.ts: format tenggat, bagian tanggal, dan pengecekan keterlambatan.
