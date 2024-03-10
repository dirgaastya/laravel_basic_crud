---
outline: deep
---

# Creating Article

Sekarang persiapan aplikasi **ars-news** sudah siap, Mari kita coba untuk membuat artikel.

## Models, migrations, and controllers

Untuk membuat postingan artikel, kita membutuhkan _model, migration, dan controller_.

Mari buat _model, migration, dan controller_ untuk Aplikasi kita dengan perintah berikut:

**Terminal / Bash**

```bash
php artisan make:model -mrc Article
```

Perintah ini akan membuatkan 3 file:

- `app/Models/Article.php`
- `database/migrations/<timestamp>_create_articles_table.php`
- `app/Http/Controller/ArticleController.php`

## Routing

Kita perlu membuat URL untuk controller. Kita akan menambahkan `route` pada direktori `routes/web.php`.

Pada tahap ini kita akan membuat 2 route:

- `create` untuk menampilkan form artikel kita
- `store` untuk mengatur proses menyimpan artikel kita

**routes/web.php**

```php
<?php

use App\Http\Controllers\ArticleController; // [!code ++]
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/article/create',[ArticleController::class,'create']); // [!code ++]
Route::post('/article/create',[ArticleController::class,'store']); // [!code ++]

```

## Migration

Setelah menambahkan route, kita perlu membuat migration dengan skema tabel seperti ini
| id | title | content | created_at | updated_at|
| ------------- | :-----------: | ----: | :-----------: | :-----------: |
| 1| Ini Judul | Ini Isi Konten | 2024-03-09 13:00:53 | 2024-03-09 13:00:53 |
| 2| Ini Judul | Ini Isi Konten | 2024-03-09 13:00:53 | 2024-03-09 13:00:53 |

Maka kita akan membuatnya seperti dibawah ini:

**database/migrations/`<timestamp>`\_create_articles_table.php**

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // [!code ++]
            $table->text('content'); // [!code ++]
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};

```

Setelah membuat skema migration, jalankan perintah `artisan migrate`

**Terminal / Bash**

```bash
php artisan migrate
```

## Model

Setelah mengatur migration, langkah selanjutnya kita akan menetapkan kolom yang dapat ditambahkan oleh pengguna pada **Model**.

**app/Models/Article.php**

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [ // [!code ++]
        'title', // [!code ++]
        'content' // [!code ++]
    ]; // [!code ++]
}

```

## Controller

Sekarang kita akan mengatur method `create` untuk menampilkan halaman tambah artikel.

**app/Http/Controller/ArticleController.php**

```php
<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    //...

    public function create()
    {
        return view('article.create');  // [!code ++]
    }

    //...
}

```

### Form Create Article

Setelah membuat method `create`, selanjutnya kita membuat folder baru dan file untuk mengatur tampilan dari halaman create.

`resources/views/article/create.blade.php`

Pada `create.blade.php`, tambahkan kode seperti di bawah.

**resources/views/article/create.blade.php**

```blade
@extends('layout.app')

@section('title','Tambah Artikel')

@section('content')
    <div class="mt-2 border rounded shadow-sm p-4">
        <h1 class="mb-3 pb-3 border-bottom ">Tambah Artikel</h1>
        <form action="/article/create" method="POST">
            @method('POST')
            @csrf
            <div class="mb-3">
              <label for="title" class="form-label">Judul</label>
              <input type="text" class="form-control" id="title" name="title" placeholder="Masukan judul artikel">
              @error('title')
                <div class="text-danger">{{ $message }}</div>
              @enderror
            </div>
            <div class="mb-3">
                <label for="content" class="form-label">Konten</label>
                <textarea class="form-control" id="content" rows="5" name="content" placeholder="Masukan isi konten"></textarea>
                @error('content')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
    </div>
@endsection


```

### Create New Article

Setelah membuat tampilan halaman dari form artikel, selanjutnya kita akan membuat method `store` yang berfungsi memproses semua input dari pengguna dan disimpan kedalam database.

**app/Http/Controller/ArticleController.php**

```php
<?php
namespace App\Http\Controllers;

use App\Models\Article; // [!code ++]
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    //...

    public function store(Request $request)
    {
        $validated = $request->validate([  // [!code ++]
            'title' => 'required|string|max:255', // [!code ++]
            'content' => 'required|string', // [!code ++]
        ]); // [!code ++]

        Article::create($validated); // [!code ++]
        return redirect('/')->with('success', 'Artikel Berhasil Dibuat!'); // [!code ++]
    }

    //...

}
```

## Layout

Jangan lupa untuk menambahkan link pada navbar agar kita dapat dengan mudah mengakses route tambah artikel ini.

```blade
{{--...Kode Sebelumnya... --}}

<div class="container">
    <nav class="navbar border rounded mt-3 py-3 bg-body-tertiary">
        <ul class="d-flex me-auto mb-2 mb-lg-0 " style="list-style: none">
            <li class="nav-item me-3">
                <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item me-3">  // [!code ++]
                <a class="nav-link" href="/article/create">Tambah Artikel</a> // [!code ++]
            </li> // [!code ++]
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

![An image](/tambah-artikel.png)

## Test

Sekarang kita bisa membuat artikel baru melalui halaman ini, dan kita dapat cek data hasil dari yang kita buat di `Mysql / Phpmyadmin`.
