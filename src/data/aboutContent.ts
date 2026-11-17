import { appConfig } from '../config'
import type { AboutItem, PipelineStep } from '../types'

export const aboutItems: AboutItem[] = [
  {
    title: 'Git dan GitHub',
    body: 'Git adalah version control yang mencatat riwayat perubahan kode. GitHub menyimpan repositori Git secara online dan menjadi tempat kolaborasi.',
    points: [
      'Perintah dasar yang dipakai: `git init` atau `git clone`, `git add`, `git commit`, `git branch`, `git switch`, `git merge`, `git push`, dan `git pull`.',
      'Branch dipakai untuk memisahkan pekerjaan fitur dari `main` sehingga perubahan bisa diuji sebelum digabung.',
      'Pull Request adalah permintaan di GitHub untuk menggabungkan branch ke `main`, memungkinkan tinjauan sebelum merge.',
      'Merge conflict terjadi saat dua branch mengubah baris yang sama. Cara menyelesaikan: buka berkas, pilih versi yang dipakai, hapus penanda konflik, jalankan `git add`, lalu `git commit`.',
      '`.gitignore` berisi berkas yang tidak dilacak. Di proyek ini isinya `node_modules`, `dist`, dan `.env`.',
    ],
  },
  {
    title: 'npm',
    body: 'npm adalah package manager untuk memasang dan mengelola pustaka JavaScript yang dipakai proyek.',
    points: [
      '`package.json` berisi nama proyek, scripts, dan daftar dependensi. `package-lock.json` mengunci versi persis agar hasil pemasangan konsisten.',
      'Scripts proyek: `dev` menjalankan server pengembangan Vite, `build` memeriksa tipe lalu membangun ke `dist`, `preview` menampilkan hasil build secara lokal, dan `typecheck` memeriksa tipe saja.',
      'Dependencies adalah pustaka yang dipakai aplikasi saat berjalan: `@fontsource-variable/bricolage-grotesque` 5.3.0, `@fontsource-variable/dm-sans` 5.3.0, dan `dayjs` 1.11.23.',
      'devDependencies hanya dipakai saat pengembangan dan build: `typescript` 7.0.2 dan `vite` 8.3.8.',
      'Semantic versioning berformat `MAJOR.MINOR.PATCH`. `MAJOR` untuk perubahan yang tidak kompatibel, `MINOR` untuk fitur baru yang kompatibel, dan `PATCH` untuk perbaikan bug. Tanda `^` mengizinkan pembaruan MINOR dan PATCH, sedangkan `~` hanya PATCH.',
    ],
  },
  {
    title: 'TypeScript',
    body: 'TypeScript adalah JavaScript dengan tipe statis yang diperiksa sebelum aplikasi berjalan.',
    points: [
      'Primitive types ada pada `Task` di `src/types.ts` dengan field `string` dan `number`, serta pada `isOverdue` di `src/utils/date.ts` yang mengembalikan `boolean`.',
      'Array `Task[]` dipakai di `src/services/taskService.ts` dan `src/components/taskList.ts`, dengan `map` di `src/utils/collection.ts`, `filter` di `filterTasks`, dan `reduce` di `summarizeTasks`.',
      'Interface `Task`, `AppConfig`, dan `TaskSummary` didefinisikan di `src/types.ts`.',
      'Type alias `TaskId` dan `TaskInput` didefinisikan di `src/types.ts`.',
      'Union type `TaskStatus` dan `TaskFilter` didefinisikan di `src/types.ts`.',
      'Generics dipakai oleh `loadFromStorage` dan `saveToStorage` di `src/services/storageService.ts`, serta `findById`, `removeById`, dan `updateById` di `src/utils/collection.ts`.',
    ],
  },
  {
    title: 'Vite',
    body: 'Vite adalah build tool: dev server cepat untuk pengembangan dan proses build untuk produksi.',
    points: [
      '`npm run dev` menjalankan server pengembangan, `npm run build` menghasilkan folder `dist`, dan `npm run preview` menampilkan hasil build secara lokal.',
      'Opsi `base` diambil dari `VITE_BASE_PATH` pada `vite.config.ts` agar aplikasi bisa dipasang di subfolder website pribadi.',
    ],
  },
  {
    title: 'Environment Variables',
    body: 'File `.env` menyimpan konfigurasi aplikasi. `.env.example` adalah contoh yang aman diunggah ke GitHub, sedangkan `.env` masuk `.gitignore`.',
    points: [
      'Hanya variabel berawalan `VITE_` yang terbaca di sisi klien.',
      'Variabel `VITE_` ikut tertanam di hasil build dan terlihat publik, karena itu password dan API key tidak boleh ditaruh di sana.',
      'Variabel proyek ini: `VITE_APP_NAME`, `VITE_APP_VERSION`, dan `VITE_BASE_PATH`, semuanya non-rahasia.',
      `Saat ini appConfig membaca: ${appConfig.appName} versi ${appConfig.appVersion}.`,
    ],
  },
  {
    title: 'Compiler, Transpiler, dan Bundler',
    body: 'Ketiganya punya peran berbeda dalam perjalanan kode menuju browser.',
    points: [
      'Compiler: `tsc` di proyek ini dipakai lewat `tsc --noEmit` untuk memeriksa tipe sehingga kesalahan tertangkap sebelum aplikasi berjalan.',
      'Transpiler: mengubah kode TypeScript menjadi JavaScript yang bisa dijalankan browser. Vite 8.3.8 memakai Oxc sebagai transpiler melalui Rolldown.',
      'Bundler: menggabungkan banyak modul dan aset menjadi sedikit berkas teroptimasi di folder `dist`. Vite 8.3.8 memakai Rolldown 1.2.19 sebagai bundler.',
      'Browser hanya menjalankan HTML, CSS, dan JavaScript. TypeScript tidak menggantikan HTML, melainkan menggantikan JavaScript.',
      '`index.html` adalah titik masuk Vite yang berisi kerangka halaman dan satu tag script pemuat `src/main.ts`, sedangkan logika dan pembuatan isi halaman dikerjakan oleh TypeScript.',
    ],
  },
]

export const pipelineSteps: PipelineStep[] = [
  {
    label: 'Kode TypeScript',
    description: 'Komponen, tipe, dan logika ditulis dalam berkas .ts.',
  },
  {
    label: 'Pemeriksaan tipe',
    description: 'tsc --noEmit memeriksa kesalahan tipe.',
  },
  {
    label: 'Transpile ke JavaScript',
    description: 'Oxc melalui Rolldown mengubah TypeScript menjadi JavaScript.',
  },
  {
    label: 'Bundle',
    description: 'Rolldown menyatukan modul dan aset.',
  },
  {
    label: 'Folder dist',
    description: 'Hasil build siap dipasang.',
  },
  {
    label: 'Website pribadi',
    description: 'Berkas dist diunggah ke subfolder sesuai VITE_BASE_PATH.',
  },
]
