---
outline: deep
---

# Detail Article

Sekarang kita akan melihat detail artikel yang telah kita buat.

## Routing

Kita akan menambahkan route dengan endpoint `/articles/{article}` dengan method `show`.
`{article}` akan mengembalikan artikel sesuai `id`

**routes/web.php**

```php
<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/article',[ArticleController::class,'index']);
Route::get('/article/create',[ArticleController::class,'create']);
Route::post('/article/create',[ArticleController::class,'store']);
Route::get('/article/{article}',[ArticleController::class,'show']);  // [!code ++]


```

## Controller

Sekarang kita akan mengatur method `show` untuk menampilkan halaman detail artikel.

**app/Http/Controller/ArticleController.php**

```php
<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    //...

    public function show(Article $article)
    {
        return view('article.show', compact('article')); // [!code ++]
    }

    //...
}

```

## Article Detail

Selanjutnya kita membuat halaman dari detail artikel.

`resources/views/article/show.blade.php`

**resources/views/article/show.blade.php**

```blade
@extends('layout.app')

@section('title', $article->title)

@section('content')
<div class="mt-2 border rounded shadow-sm p-4">
    <div class="w-100 mb-3 pb-3 border-bottom d-flex justify-content-between align-items-center ">
        <div>
            <h1>{{ $article->title }}</h1>
            <p class="text-secondary">Dibuat pada {{ $article->created_at }}</p>
        </div>
    </div>
    <p class="text-secondary">{{ $article->content }}</p>
</div>
@endsection

```

### Update Article Index

Pada `index.blade.php`, tambahkan kode seperti di bawah. Untuk merubah link target sesuai dengan route detail artikel berdasarkan id yang kita buat sebelumnya.

**resources/views/article/index.blade.php**

```blade
{{-- Kode Sebelumnya --}}

{{-- Article Card --}}
    @foreach ($articles as $article)
        <div class="w-100 border rounded-3 py-3 px-4 mb-3">
            <div class="d-flex justify-content-between align-items-center">
                <h2>{{ $article->title }}</h2>
                <p class="text-secondary ">{{ $article->created_at }}</p>
            </div>
            <p class="text-secondary ">{{ substr($article->content, 0, 25) }}{{ strlen($article->content) > 25 ? "..." : "" }}</p>
            <a href="#" class="text-decoration-none text-primary">Lihat Selengkapnya</a>  // [!code --]
            <a href="/article/{{ $article->id }}" class="text-decoration-none text-primary">Lihat Selengkapnya</a> // [!code ++]
        </div>
    @endforeach
{{-- Kode Sesudahnya --}}

```

## Test

Saat kita klik `Lihat selengkapnya` makan halaman akan pindah seperti tampilan di bawah ini.

![An image](/detail-artikel.png)
