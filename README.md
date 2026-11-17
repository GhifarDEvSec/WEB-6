# Daftar Tugas Kuliah

Aplikasi web sederhana untuk mengelola daftar tugas kuliah dalam satu tempat. Data tugas disimpan di localStorage sehingga tetap ada setelah halaman dimuat ulang.

## Fitur

- Menambah tugas dengan judul, mata kuliah, tenggat, dan catatan.
- Mengubah dan menghapus tugas.
- Menandai tugas selesai atau belum selesai.
- Filter daftar berdasarkan status: Semua, Belum Selesai, dan Selesai.
- Ringkasan jumlah total, belum selesai, dan selesai.
- Penanda tugas terlambat serta format tanggal Bahasa Indonesia.
- Tampilan responsif dengan desain buku catatan kampus.
- Bagian Tentang Proyek yang menjelaskan teknologi dan alur kerja.

## Teknologi

- TypeScript 7 dengan mode strict
- Vite 8
- npm
- dayjs
- Font Bricolage Grotesque dan DM Sans dari paket Fontsource
- CSS ditulis sendiri tanpa framework

## Cara Menjalankan

```bash
npm install
cp .env.example .env
npm run dev
```

Buka alamat yang ditampilkan Vite, biasanya `http://localhost:5173`.

Jika memakai Windows tanpa perintah `cp`, salin berkas `.env.example` menjadi `.env` secara manual.

## npm Scripts

| Script | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan server pengembangan Vite dengan hot reload. |
| `npm run build` | Memeriksa tipe dengan `tsc --noEmit` lalu membangun aplikasi ke folder `dist`. |
| `npm run preview` | Menampilkan hasil build dari folder `dist` secara lokal. |
| `npm run typecheck` | Memeriksa tipe TypeScript tanpa menghasilkan berkas. |

## Environment Variables

Konfigurasi aplikasi dibaca dari berkas `.env`. Berkas ini tidak masuk Git. Contoh yang aman diunggah tersedia di `.env.example`.

```env
VITE_APP_NAME=Daftar Tugas Kuliah
VITE_APP_VERSION=1.0.0
VITE_BASE_PATH=/
```

- Hanya variabel berawalan `VITE_` yang terbaca di sisi klien.
- Variabel `VITE_` ikut tertanam di hasil build dan terlihat publik, jadi jangan menaruh password, token, atau API key di sana.
- `VITE_BASE_PATH` dipakai sebagai nilai `base` pada Vite.

## Build dan Pemasangan ke Subfolder

```bash
npm run build
```

Hasil build ada di folder `dist`. Jika aplikasi dipasang di subfolder website pribadi, misalnya `https://contoh.com/tugas/`, atur nilai berikut di `.env` sebelum build:

```env
VITE_BASE_PATH=/tugas/
```

Setelah itu jalankan `npm run build` kembali dan unggah isi folder `dist` ke subfolder tersebut.

## Alur Git yang Dipakai

- Pekerjaan utama berada di branch `main`.
- Setiap fitur dikerjakan di branch terpisah, misalnya `feature/edit-hapus` dan `feature/tentang-proyek`.
- Perubahan di branch fitur digabungkan ke `main` melalui Pull Request agar bisa ditinjau lebih dulu.
- Merge conflict terjadi bila dua branch mengubah baris yang sama. Penyelesaiannya: buka berkas yang berkonflik, pilih versi yang dipakai, hapus penanda konflik, jalankan `git add`, lalu `git commit`
