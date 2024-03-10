---
outline: deep
---

# Setup .env

Tahap selanjutnya kita harus mengatur file _.env_ agar sesuai dengan keperluan yang kita butuhkan.

## ENV

### Application Name

Pada bootcamp ini kita akan mengubah nama aplikasi dan nama database seperti berikut

**.env**

```env
APP_NAME="ARS NEWS"
```

### Database

Berikut konfigurasi untuk database.

```env{}
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ars_news
DB_USERNAME=root
DB_PASSWORD=
```
