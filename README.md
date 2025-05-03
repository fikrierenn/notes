# Takip Asistanı

Kişisel görev, not ve liste yönetimini kolaylaştıran, yapay zeka destekli, mobil öncelikli ve offline çalışabilen bir uygulamadır. Kullanıcılar görevlerini yönetebilir, not alabilir, görev atayabilir ve tüm içeriklerini Supabase üzerinde güvenli şekilde saklayabilirler. Yapay zeka ile görev ve notlar özetlenip otomatik olarak etiketlenebilir.

## Özellikler

- Görev ekleme, listeleme, tamamlama ve silme
- Görev atama (kendine veya başka kullanıcıya)
- Esnek yapılacaklar ve takip listeleri oluşturma
- Not alma ve düzenleme
- **Tüm görev, not ve listelerde kategori desteği (kategori seçimi ve gösterimi zorunlu)**
- AI destekli metin analizi (özet çıkarma, etiket önerisi)
- **Offline çalışma: Tüm veriler localde SQLite ile saklanır, uygulama internetsiz de tam fonksiyonlu çalışır.**
- **Online olduğunda Supabase ile otomatik senkronizasyon yapılır.**
- Supabase tabanlı veri saklama (PostgreSQL, Auth, Realtime API)
- PWA desteği: Ana ekrana eklenebilir, offline çalışabilir
- **Modern, kullanıcı dostu ve mobil uygulama benzeri arayüz (UI/UX) – Tüm ekranlar Tailwind CSS ile responsive ve mobil-first olarak tasarlanır.**
- Kullanıcı bazlı veri erişimi (Row Level Security)
- Modern Vue 3 mimarisi (Composition API, Pinia, Vue Router)
- Workbox ile offline cache

## Mimari

- **Localde SQLite:** Tüm görev ve notlar tarayıcıda SQLite (sql.js) ile saklanır.
- **Senkronizasyon:** Online olunduğunda localdeki değişiklikler Supabase ile çift yönlü eşitlenir.
- **Çakışma Yönetimi:** En son güncellenen veri esas alınır veya kullanıcıya sorulur.

## Kullanılan Teknolojiler

- Vue 3 (Composition API)
- Vite
- Pinia
- Vue Router
- Tailwind CSS (modern, mobil öncelikli ve kullanıcı dostu arayüz için)
- Supabase (PostgreSQL, Auth, Realtime API)
- OpenAI API veya Gemini API
- Workbox (PWA ve offline cache)
- **sql.js (tarayıcıda SQLite desteği için)**

## Kurulum

1. **Depoyu klonlayın:**
   ```bash
   git clone https://github.com/kullanici/takip-asistani.git
   cd takip-asistani
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Çevresel değişkenleri ayarlayın:**
   - `.env` dosyasını oluşturun ve Supabase ile AI API anahtarlarınızı girin.

4. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev
   ```

5. **PWA olarak derleyin:**
   ```bash
   npm run build
   ```

## Proje Yapısı

```
src/
  components/         // Vue bileşenleri
  pages/              // Sayfa bileşenleri (Vue Router ile)
  stores/             // Pinia store dosyaları
  services/           // Supabase, SQLite ve AI servisleri
  utils/              // Yardımcı fonksiyonlar
  assets/             // Statik dosyalar
  styles/             // Tailwind veya SCSS dosyaları
public/
  manifest.json       // PWA manifesti
  service-worker.js   // Workbox ile offline desteği
```

## Temel Kullanım

- Kayıt olan kullanıcı, görev ve notlarını ekleyebilir.
- Görevler başka kullanıcılara atanabilir.
- Not ve görevler, AI ile özetlenip etiketlenebilir.
- **Tüm görev, not ve listelerde kategori seçimi ve gösterimi zorunludur.**
- **Uygulama offline modda da çalışır, bağlantı sağlandığında local SQLite ile Supabase arasında otomatik veri senkronizasyonu yapılır.**
- **Tüm ekranlar mobil uygulama benzeri, modern ve kullanıcı dostu olarak tasarlanmıştır.**

## Katkı ve Lisans

Katkıda bulunmak için lütfen `CONTRIBUTING.md` dosyasını inceleyin.  
Bu proje MIT lisansı ile lisanslanmıştır. 