# Exercise: Simple CRUD Operations in Laravel

### Studi Kasus: Manajemen Produk

Anda diminta untuk membuat aplikasi sederhana untuk manajemen produk menggunakan Laravel. Aplikasi ini harus memungkinkan pengguna untuk melakukan operasi CRUD (Create, Read, Update, Delete) pada produk.

### Instruksi

#### Langkah 1: Pembuatan Model, Migration dan Controller

1. Buatlah model `Product` menggunakan perintah `php artisan make:model Product -mcr`.
2. Desainlah struktur tabel produk dengan menentukan kolom-kolom yang diperlukan (misalnya: id, nama, deskripsi, harga, dll.) dalam file migrasi.
3. Jalankan migrasi untuk membuat tabel produk menggunakan perintah `php artisan migrate`.

#### Langkah 2: Implementasi CRUD

1. Implementasikan logika CRUD dalam controller `ProductController`:
   - Buat method untuk menampilkan semua produk.
   - Buat method untuk menampilkan formulir tambah produk.
   - Buat method untuk menambahkan produk baru.
   - Buat method untuk menampilkan detail produk.
   - Buat method untuk menampilkan formulir edit produk.
   - Buat method untuk menyimpan perubahan pada produk yang diedit.
   - Buat method untuk menghapus produk.

#### Langkah 3: Tampilan

1. Buatlah tampilan Blade untuk menampilkan daftar produk.
2. Buatlah tampilan Blade untuk menampilkan formulir tambah produk.
3. Buatlah tampilan Blade untuk menampilkan detail produk.
4. Buatlah tampilan Blade untuk menampilkan formulir edit produk.

#### Langkah 4: Routing

1. Tambahkan routing untuk setiap operasi CRUD dalam file `web.php`.
2. Pastikan setiap route terhubung dengan method yang sesuai dalam controller `ProductController`.

#### Langkah 5: Uji Coba

1. Ujilah setiap fitur CRUD untuk memastikan semuanya berfungsi seperti yang diharapkan.
2. Pastikan Anda dapat menambahkan, melihat, mengedit, dan menghapus produk dengan benar.

Selamat mengerjakan! 🚀
