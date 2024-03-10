---
outline: deep
---

# Layouting

Tahap ini kita akan membuat layout dengan blade templating.

## Create folder Layout

Buat folder layout pada direktori

`resources/views/layout`

## Create Layout

Buat juga file baru dengan nama `app.blade.php`

Tambahkan kode dibawah untuk membuat template:

**resources/views/layout/app.blade.php**

```blade
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ARS NEWS || @yield('title')</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  </head>
  <body>
    <div class="container">
        <nav class="navbar border rounded mt-3 py-3 bg-body-tertiary">
            <ul class="d-flex me-auto mb-2 mb-lg-0 " style="list-style: none">
                <li class="nav-item me-3">
                    <a class="nav-link" href="/">Home</a>
                </li>
                {{-- Tambahkan Navigasi Link Disini --}}
            </ul>
        </nav>

        <main class="pt-3 ">
            @yield('content')
        </main>


    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
  </body>
</html>

```

## Example

Sekarang kita coba mengubah tampilan awal `welcome.blade.php` yang seperti dibawah

![An image](/home.png)

Lalu ubah kode pada tampilan `welcome.blade.php` dengan seperti dibawah:

**resources/views/welcome.blade.php**

```blade
@extends('layout.app')

@section('title','Beranda')

@section('content')
    <div class="">
        <h1>Ini adalah Home</h1>
    </div>
@endsection

``
```

Hasil:

![An image](/home-1.png)
