# 🧹 Vue 3 Drawer Route Sistemi

Bu proje, **Vue 3** ve **Vue Router** kullanılarak geliştirilen, kullanıcı detaylarını route üzerinden drawer içerisinde gösteren bir yapıyı örneklemektedir. Sayfa geçişi olmadan detaylara ulaşmak için route tabanlı bir çekmece sistemi sunar.

## ✨ Özellikler

* ✅ Vue 3 Composition API kullanımı
* ✅ Vue Router ile route-tabanlı drawer yönetimi
* ✅ Kullanıcı listesi ve detay görüntüleme
* ✅ Drawer UI üzerinden kullanıcı güncelleme
* ✅ Modern, responsive ve sade tasarım

## 📸 Ekran Görüntüleri

### Kullanıcı Listesi

![Kullanıcı Listesi](https://raw.githubusercontent.com/ahmtcn34/vue-drawwer-route/main/screenshots/user-list.png)

### Drawer Üzerinden Kullanıcı Detayı

![Drawer Detay](https://raw.githubusercontent.com/ahmtcn34/vue-drawwer-route/main/screenshots/user-drawer.png)

## 🛠️ Kurulum

Projeyi çalıştırmak için aşağıdaki adımları izleyin:

```bash
# Repoyu klonla
git clone https://github.com/ahmtcn34/vue-drawwer-route.git
cd vue-drawwer-route

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

## 🧱 Kullanım

* `/` → Kullanıcı listesi görünür.
* `/user/:id` → Seçilen kullanıcı bilgisi drawer (sağdan gelen panel) içinde gösterilir.
* Drawer URL ile entegre çalışır, bu sayede geri tuşu ile drawer kapanabilir.


## 🧱 Kullanılan Teknolojiler

* [Vue 3](https://vuejs.org/)
* [Vue Router](https://router.vuejs.org/)
* [Vite](https://vitejs.dev/)
* Özel yazılmış CSS

## 📄 Lisans

MIT © [ahmtcn34](https://github.com/ahmtcn34)
