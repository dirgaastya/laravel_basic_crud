---
outline: deep
---

# Delete Article

Sekarang kita akan hapus artikel yang telah kita buat.

## Routing

Kita akan menambahkan route dengan endpoint `/articles/{article}` dengan method `destroy`. `{article}` akan mengembalikan artikel sesuai `id`

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
Route::get('/article/{article}',[ArticleController::class,'show']);
Route::get('/article/{article}/edit',[ArticleController::class,'edit']);
Route::put('/article/{article}/edit',[ArticleController::class,'update']);
Route::delete('/article/{article}',[ArticleController::class,'destroy']); // [!code ++]




```

## Controller

Sekarang kita akan mengatur method `destroy` untuk menghapus artikel.

**app/Http/Controller/ArticleController.php**

```php
<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    //...

    public function destroy(Article $article)
    {
        $article->delete(); // [!code ++]
        return redirect('/article')->with('success', 'Artikel berhasil dihapus!'); // [!code ++]
    }

    //...
}

```

### Delete Button Article

Setelah membuat method `edit`, selanjutnya kita membuat `button` untuk menghapus artikel.

`resources/views/article/show.blade.php`

Pada `show.blade.php`, tambahkan kode seperti di bawah.

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
        <div>
            <a href="/article/{{ $article->id }}/edit" class="btn btn-warning">Edit Artikel</a>
             <form action="/article/{{ $article->id }}" method="POST" style="display: inline;"> // [!code ++]
                @csrf // [!code ++]
                @method('DELETE') // [!code ++]
                <button type="submit" class="btn btn-danger" onclick="return confirm('Apakah Anda yakin ingin menghapus artikel ini?')">Hapus Artikel</button> // [!code ++]
            </form> // [!code ++]
        </div>
    </div>
    <p class="text-secondary">{{ $article->content }}</p>
</div>
@endsection

```

Tampilan detail akan berubah menjadi seperti dibawah ini.

![An image](/detail-artikel-2.png)

## Test

Sekarang kita sudah bisa menghapus artikel yang sudah kita buat.

![An image](/detail-artikel-3.png)
