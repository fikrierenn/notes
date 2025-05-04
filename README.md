# Takip Asistanı

Kişisel görev, not ve liste yönetimini kolaylaştıran, yapay zeka destekli, mobil öncelikli ve offline çalışabilen bir uygulamadır. Kullanıcılar görevlerini yönetebilir, not alabilir, görev atayabilir ve tüm içeriklerini Supabase üzerinde güvenli şekilde saklayabilirler. Yapay zeka ile görev ve notlar özetlenip otomatik olarak etiketlenebilir.

## Kodlama Standartları ve Yazılım Kuralları

- **Vue 3 (Composition API), Vite, Pinia, Vue Router** kullanılır.
- **Single File Component (SFC)** yapısı zorunludur (`.vue` dosyaları).
- **Tailwind CSS** ile modern, mobil öncelikli ve responsive/adaptif tasarım uygulanır.
- **Dosya adlandırmaları:** `kebab-case` formatında olmalıdır.
- **Componentler:** Tekil, parçalanmış, yeniden kullanılabilir ve tek sorumluluklu olmalıdır.
- **Kod okunabilirliği ve sürdürülebilirliği** ön planda tutulur.
- **Magic number** kullanılmaz, sabitler ve açıklamalar eklenir.
- **Kodlarda açıklama ve component dokümantasyonu** bulunur.
- **Fonksiyon ve değişken adları** anlamlı ve İngilizce olmalı (gerekirse Türkçe açıklama eklenebilir).
- **Pinia** ile state yönetimi yapılır.
- **Tüm veriler öncelikle localde SQLite (sql.js) ile saklanır.**
- **Supabase ile online senkronizasyon** (kullanıcı online olduğunda).
- **Row Level Security (RLS):** Kullanıcılar sadece kendi verilerini görebilir.
- **Model alanları:** Görev, not ve liste objelerinde şu alanlar zorunludur:  
  `id`, `title`, `created_at`, `status`, `assigned_to_user_id`, `created_by_user_id`, `summary`, `tags`, `category`, `due_date`, `completed_at`, `postponed_count`, `postponed_dates`
- **Kategori seçimi ve gösterimi zorunludur.**
- **Erteleme geçmişi ve postponed_count otomatik takip edilir.**
- **Responsive ve adaptif tasarım:** Tüm ekranlar, menüler ve formlar hem mobil hem masaüstü için optimize edilmiştir. Menü ve formlar ekran boyutuna göre otomatik olarak uyum sağlar.
- **Modern ve kullanıcı dostu arayüz:** Tooltip, hover, grid/list/kart görünümü, vs.
- **Her yeni özellik için ayrı bir branch açılır.**
- **Kodlar PR (Pull Request) ile ana dala alınır.**
- **PR'larda kod incelemesi yapılır.**
- **Testler ve manuel kontroller yapılmadan deploy edilmez.**
- **Dummy veriler geliştirme ortamında kullanılabilir, canlıya çıkışta temizlenir.**
- **Tüm iletişim ve kodlama dili Türkçe olmalıdır. Açıklamalar, değişken adları ve dokümantasyon Türkçe yazılacaktır.**

## Özellikler

- Görev ekleme, listeleme, tamamlama ve silme
- Görev atama (kendine veya başka kullanıcıya)
- **Dashboard (Ana Sayfa):**
  - Genel istatistikler (toplam görev, tamamlanan, ertelenen, not, liste, kategori)
  - Yaklaşan son tarihli görevler
  - Hızlı erişim butonları (yeni görev, not, liste)
  - Kısa raporlar (en çok ertelenen görevler, son eklenen notlar, vs.)
  - Hem mobil hem masaüstü için optimize edilmiş modern tasarım
- **Kullanıcı yönetimi:**
  - Dummy (sabit) kullanıcı listesi ile hızlı prototipleme
  - Supabase Auth ile gerçek kullanıcı kaydı, giriş ve kalıcı kullanıcı yönetimi
- **Görevlerde başlangıç tarihi, son tarih, tamamlanma tarihi, toplam gün, kaç kere ertelendi ve erteleme geçmişi otomatik olarak takip edilir.**
- Görev erteleme geçmişi ve raporlama desteği
- Esnek yapılacaklar ve takip listeleri oluşturma
- Not alma ve düzenleme
- **Tüm görev, not ve listelerde kategori desteği (kategori seçimi ve gösterimi zorunlu)**
- AI destekli metin analizi (özet çıkarma, etiket önerisi)
- **Offline çalışma: Tüm veriler localde SQLite ile saklanır, uygulama internetsiz de tam fonksiyonlu çalışır.**
- **Online olduğunda Supabase ile otomatik senkronizasyon yapılır.**
- Supabase tabanlı veri saklama (PostgreSQL, Auth, Realtime API)
- PWA desteği: Ana ekrana eklenebilir, offline çalışabilir
- **Modern, kullanıcı dostu ve mobil uygulama benzeri arayüz (UI/UX) – Tüm ekranlar Tailwind CSS ile responsive ve mobil-first olarak tasarlanır.**
- **Uygulama hem mobilde hem de masaüstünde (PC) tam fonksiyonlu ve kullanıcı dostu olarak çalışır. Navigasyon, menü ve formlar ekran boyutuna göre otomatik olarak uyum sağlar.**
- Kullanıcı bazlı veri erişimi (Row Level Security)
- Modern Vue 3 mimarisi (Composition API, Pinia, Vue Router)
- Workbox ile offline cache

## Mimari

- **Localde SQLite:** Tüm görev ve notlar tarayıcıda SQLite (sql.js) ile saklanır. Görev modelinde şu alanlar bulunur: `id`, `title`, `created_at`, `status`, `assigned_to_user_id`, `created_by_user_id`, `summary`, `tags`, `category`, `due_date`, `completed_at`, `postponed_count`, `postponed_dates`
- **Kullanıcı yönetimi:**
  - Dummy kullanıcı listesi ile offline prototipleme mümkündür.
  - Gerçek uygulamada Supabase Auth ile kullanıcılar kalıcı olarak saklanır ve her girişte verileri korunur.
- **Responsive ve Adaptif Tasarım:**
  - Tüm ekranlar, menüler ve formlar hem mobil hem masaüstü için optimize edilmiştir. Büyük ekranlarda daha ferah ve erişilebilir bir deneyim sunar.
  - Navigasyon ve menüler ekran boyutuna göre otomatik olarak değişir (mobilde alt tab bar, masaüstünde üst bar veya sidebar).
  - **Dashboard ekranı da dahil olmak üzere tüm sayfalarda Tailwind CSS ile modern ve kullanıcı dostu tasarım uygulanır.**
- **Senkronizasyon:** Online olunduğunda localdeki değişiklikler Supabase ile çift yönlü eşitlenir.
- **Çakışma Yönetimi:** En son güncellenen veri esas alınır veya kullanıcıya sorulur.
- **Erteleme Takibi:** Her son tarih değişikliğinde eski ve yeni tarih ile değişiklik zamanı kaydedilir, raporlanabilir.

## Temel Kullanım

- Kayıt olan kullanıcı, görev ve notlarını ekleyebilir.
- Görevler başka kullanıcılara atanabilir.
- Görev eklerken veya düzenlerken son tarih ve atanacak kullanıcı seçilebilir.
- Görev detayında başlangıç tarihi, son tarih, tamamlanma tarihi, toplam gün, kaç kere ertelendiği ve erteleme geçmişi görüntülenir.
- Not ve görevler, AI ile özetlenip etiketlenebilir.
- **Kullanıcılar dummy listeden veya Supabase Auth ile gerçek kullanıcı olarak atanabilir.**
- **Supabase Auth ile kayıt olan kullanıcıların verileri kalıcıdır, uygulama yeniden başlatılsa da kaybolmaz.**
- **Tüm görev, not ve listelerde kategori seçimi ve gösterimi zorunludur.**
- **Uygulama offline modda da çalışır, bağlantı sağlandığında local SQLite ile Supabase arasında otomatik veri senkronizasyonu yapılır.**
- **Tüm ekranlar mobil ve masaüstü için optimize edilmiş, modern ve kullanıcı dostu olarak tasarlanmıştır.**

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

## Katkı ve Lisans

Katkıda bulunmak için lütfen `CONTRIBUTING.md` dosyasını inceleyin.  
Bu proje MIT lisansı ile lisanslanmıştır. 