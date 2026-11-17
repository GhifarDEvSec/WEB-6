# STRUCTURE

```
.
  README.md
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
      aboutSection.ts
      confirmDialog.ts
      taskForm.ts
      taskFilter.ts
      summaryPanel.ts
      taskList.ts
      taskItem.ts
      emptyState.ts
    data/
      aboutContent.ts
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

- README.md: dokumentasi proyek, fitur, teknologi, cara menjalankan, env, dan alur Git.
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
- src/main.ts: mengatur state tugas, filter, dan mode form, lalu merender semua bagian termasuk tentang proyek.
- src/vite-env.d.ts: deklarasi tipe untuk variabel VITE_ pada ImportMetaEnv.
- src/types.ts: tipe Task, TaskId, TaskStatus, TaskFilter, TaskInput, AppConfig, DueDateParts, TaskSummary, FormMode, AboutItem, dan PipelineStep.
- src/config.ts: membaca variabel lingkungan menjadi objek appConfig.
- src/components/aboutSection.ts: merender judul Tentang Proyek, accordion topik, dan pipeline.
- src/components/confirmDialog.ts: dialog konfirmasi hapus dengan Promise<boolean>.
- src/components/taskForm.ts: form tambah dan ubah tugas dengan validasi, prefilling, dan tombol batal.
- src/components/taskFilter.ts: tombol filter Semua, Belum Selesai, dan Selesai dengan aria-pressed.
- src/components/summaryPanel.ts: panel tiga angka Total, Belum Selesai, dan Selesai.
- src/components/taskList.ts: merender daftar terfilter atau empty state sesuai filter.
- src/components/taskItem.ts: kartu tugas dengan tanggal, chip, badge, pengubah status, serta tombol ubah dan hapus.
- src/components/emptyState.ts: kartu kosong dengan ilustrasi dan teks yang dapat disesuaikan.
- src/data/aboutContent.ts: konstanta konten enam topik dan enam langkah pipeline.
- src/services/storageService.ts: memuat dan menyimpan data ke localStorage.
- src/services/taskService.ts: memuat, menambah, mengubah, menghapus, memfilter, dan meringkas tugas.
- src/styles/tokens.css: token warna, jarak, tipografi, bayangan, dan animasi.
- src/styles/base.css: reset, latar paper berpola titik, header, footer, dan fokus.
- src/styles/components.css: gaya form, tombol, filter, ringkasan, kartu tugas, badge, dialog, tentang proyek, pipeline, dan empty state.
- src/utils/collection.ts: pencarian, penghapusan, dan pembaruan item pada array.
- src/utils/date.ts: format tenggat, bagian tanggal, dan pengecekan keterlambatan.
