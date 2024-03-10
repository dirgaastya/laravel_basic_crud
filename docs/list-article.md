---
outline: deep
---

# Show List Article

Sekarang kita akan mencoba menampilkan seluruh artikel yang telah kita buat.

## Routing

Kita akan menambahkan route dengan endpoint `/articles` dengan method `index`.

**routes/web.php**

```php
<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/article',[ArticleController::class,'index']); // [!code ++]
Route::get('/article/create',[ArticleController::class,'create']);
Route::post('/article/create',[ArticleController::class,'store']);

```

## Controller

Sekarang kita akan mengatur method `index` untuk menampilkan halaman daftar artikel.

**app/Http/Controller/ArticleController.php**

```php
<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index()
    {
        $data = Article::latest()->get(); // [!code ++]
        return view('article.index',[ // [!code ++]
            'articles' => $data // [!code ++]
        ]); // [!code ++]
    }

    //...
}

```

Setelah itu kita juga akan mengubah `redirect` setelah menambahkan data.

**app/Http/Controller/ArticleController.php**

```php
<?php
namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    //...

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        Article::create($validated);
        return redirect('/')->with('success', 'Artikel Berhasil Dibuat!'); // [!code --]
        return redirect('/article')->with('success', 'Artikel Berhasil Dibuat!'); // [!code ++]
    }

    //...

}
```

## Article Index

Selanjutnya kita membuat halaman dari index artikel.

`resources/views/article/index.blade.php`

Pada `index.blade.php`, tambahkan kode seperti di bawah.

**resources/views/article/create.blade.php**

```blade
@extends('layout.app')

@section('title', 'Daftar Artikel')

@section('content')
<div class="mt-2 border rounded shadow-sm p-4">
    {{-- Alert saat data berhasil ditambah / dihapus / dirubah --}}
    @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif
    {{-- Header --}}
    <div class="w-100 mb-3 pb-3 border-bottom d-flex justify-content-between align-items-center ">
        <h1>Daftar Artikel</h1>
        <a href="/article/create" class="btn btn-success ">Tambah Artikel</a>
    </div>
{{-- Article Card --}}
    @foreach ($articles as $article)
        <div class="w-100 border rounded-3 py-3 px-4 mb-3">
            <div class="d-flex justify-content-between align-items-center">
                <h2>{{ $article->title }}</h2>
                <p class="text-secondary ">{{ $article->created_at }}</p>
            </div>
            <p class="text-secondary ">{{ substr($article->content, 0, 25) }}{{ strlen($article->content) > 25 ? "..." : "" }}</p>
            <a href="#" class="text-decoration-none text-primary">Lihat Selengkapnya</a>
        </div>
    @endforeach

</div>
@endsection

```

### Update Layout

Disini kita akan mengubah layout menjadi seperti ini.

```blade
{{--...Kode Sebelumnya... --}}

<div class="container">
    <nav class="navbar border rounded mt-3 py-3 bg-body-tertiary">
        <ul class="d-flex me-auto mb-2 mb-lg-0 " style="list-style: none">
            <li class="nav-item me-3">
                <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item me-3">
                <a class="nav-link" href="/article/create">Tambah Artikel</a> // [!code --]
                <a class="nav-link" href="/article">Artikel</a> // [!code ++]
            </li>
            {{-- Tambahkan Navigasi Link Disini --}}
        </ul>
    </nav>
    <main class="pt-3 ">
        @yield('content')
    </main>
</div>

     {{--...Kode Setelahnya... --}}
```

Tampilan tambah artikel akan seperti ini.

![An image](/daftar-artikel.png)

## Test

Sekarang kita dapat melihat daftar dan membuat artikel.
