---
outline: deep
---

# Edit Article

Sekarang kita akan edit artikel yang telah kita buat.

## Routing

Kita akan menambahkan route dengan endpoint `/articles/{article}/edit` dengan method `edit` & `update`. `{article}` akan mengembalikan artikel sesuai `id`

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
Route::get('/article/{article}/edit',[ArticleController::class,'edit']); // [!code ++]
Route::put('/article/{article}/edit',[ArticleController::class,'update']); // [!code ++]


```

## Controller

Sekarang kita akan mengatur method `edit` untuk menampilkan halaman edit artikel.

**app/Http/Controller/ArticleController.php**

```php
<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    //...

    public function edit(Article $article)
    {
        return view('article.edit', compact('article')); // [!code ++]
    }

    //...
}

```

### Form Edit Article

Setelah membuat method `edit`, selanjutnya kita membuat file untuk mengatur tampilan dari halaman edit.

`resources/views/article/edit.blade.php`

Pada `edit.blade.php`, tambahkan kode seperti di bawah.

**resources/views/article/edit.blade.php**

```blade
@extends('layout.app')

@section('title','Edit Artikel')

@section('content')
    <div class="mt-2 border rounded shadow-sm p-4">
        <h1 class="mb-3 pb-3 border-bottom ">Edit Artikel</h1>
        <form action="/article/{{ $article->id }}/edit" method="POST">
            @method('PUT')
            @csrf
            <div class="mb-3">
              <label for="title" class="form-label">Judul</label>
              <input type="text" class="form-control" id="title" name="title" placeholder="Masukan judul artikel" value="{{ $article->title }}">
              @error('title')
                <div class="text-danger">{{ $message }}</div>
              @enderror
            </div>
            <div class="mb-3">
                <label for="content" class="form-label">Konten</label>
                <textarea class="form-control" id="content" rows="5" name="content" placeholder="Masukan isi konten" >{{ $article->content }}</textarea>
                @error('content')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
    </div>
@endsection


```

Setelah itu kita buat `button` untuk mengakses halaman edit artikel pada halaman detail artikel.

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
        <div> // [!code ++]
            <a href="/article/{{ $article->id }}/edit" class="btn btn-warning">Edit Artikel</a> // [!code ++]
        </div> // [!code ++]
    </div>
    <p class="text-secondary">{{ $article->content }}</p>
</div>
@endsection

```

Tampilan detail akan berubah menjadi seperti dibawah ini.

![An image](/detail-artikel-1.png)

### Edit Article

Setelah membuat tampilan halaman dari form edit artikel, selanjutnya kita akan membuat method `update` yang berfungsi memproses semua input dari pengguna dan akan memperbaharui data kedalam database.

**app/Http/Controller/ArticleController.php**

```php
<?php
namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    //...

     public function update(Request $request, Article $article)
    {
        $validated = $request->validate([ // [!code ++]
            'title' => 'required|string|max:255', // [!code ++]
            'content' => 'required|string', // [!code ++]
        ]); // [!code ++]
    // [!code ++]
        $article->update($validated); // [!code ++]
        return redirect('/article')->with('success', 'Artikel berhasil diperbarui!'); // [!code ++]
    }

    //...

}
```

## Test

Sekarang kita sudah bisa perbaharui artikel yang sudah kita buat.

![An image](/edit-artikel.png)
