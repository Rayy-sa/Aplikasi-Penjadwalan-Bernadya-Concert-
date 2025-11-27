# Bernadya Concert Scheduler

Aplikasi web Single Page Application (SPA) untuk menampilkan dan mengatur jadwal konser Bernadya dengan nuansa *cinematic*, *gloomy*, dan *minimalist*.

## Fitur Utama

### 1. Hero Section yang Interaktif
- **Video Background Parallax**: Latar belakang video yang bergerak halus mengikuti pergerakan mouse.
- **Efek Film Grain**: Overlay tekstur noise untuk memberikan kesan retro/analog.
- **Efek Teks Glitch**: Judul utama "BERNADYA CONCERT" memiliki efek glitch saat di-hover.
- **Generator Lirik**: Menampilkan kutipan lirik acak dari lagu-lagu Bernadya.
- **Countdown Timer**: Hitung mundur otomatis ke acara terdekat yang ditandai "Hadir".

### 2. Manajemen Jadwal (Scheduler)
- **Daftar Acara**: Menampilkan jadwal konser mendatang.
- **Tambah Acara**: Form modal untuk menambahkan acara baru (Judul, Lokasi, Tanggal, Waktu).
- **Hapus Acara**: Menghapus acara dari daftar.
- **Tandai Kehadiran**: Menandai acara yang akan dihadiri (mempengaruhi countdown).
- **Penyimpanan Lokal**: Data tersimpan otomatis di browser (LocalStorage), sehingga tidak hilang saat di-refresh.
- **Mode Tampilan**: Beralih antara tampilan Grid dan List.

## Teknologi yang Digunakan

- **HTML5**: Struktur halaman.
- **Tailwind CSS**: Framework CSS untuk styling yang cepat dan responsif.
- **Vanilla JavaScript**: Logika interaktivitas dan manajemen state.
- **Google Fonts**: Menggunakan font "Montserrat".

## Cara Menjalankan

1. Pastikan Anda memiliki file video `bernadya.mp4` di dalam folder proyek.
2. Buka file `index.html` menggunakan browser web modern (Chrome, Firefox, Edge, Safari).
3. Aplikasi siap digunakan!

## Struktur File

- `index.html`: File utama aplikasi.
- `style.css`: Styling tambahan untuk animasi dan efek khusus.
- `script.js`: Logika JavaScript untuk fitur-fitur aplikasi.
- `README.md`: Dokumentasi proyek ini.

src/assets/ bernadya.jpg