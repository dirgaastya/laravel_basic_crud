---
outline: deep
---

# Installation

Pada bootcamp ini, kita akan membuat sebuah website artikel berita sederhana dengan nama project **ars-news**.

## Install Laravel

Tahap pertama, install Project Laravel dengan perintah berikut:

**Terminal / Bash**

```bash
composer create-project laravel/laravel nama_project
```

Ubah perintah **nama_project** dengan nama yang sudah kita tentukan yaitu, **ars-news**.

```bash
composer create-project laravel/laravel ars-news
```

Setelah proses instalasi selesai, buka project laravel dengan **VSCode.**

**Terminal / Bash**

```bash
cd nama_project
code .
```

Ubah perintah **nama_project** dengan nama yang sudah kita tentukan yaitu, **ars-news**.

```bash
cd ars-news
code .
```

::: info Catatan
Jika tidak bisa membuka via terminal, kita dapat membukanya melalui Aplikasi VSCode secara langsung.

Buka `VSCode > File > Open Folder > Pilih Folder Project > Open`

:::

## Running Project

Buka terminal baru di VSCode:

Pilih `Terminal > New Terminal`

**Terminal / Bash**

```bash
php artisan serve
```

Setelah Anda memulai server laravel, aplikasi akan dapat diakses di browser web di http://localhost:8000.

![An image](/home.png)
