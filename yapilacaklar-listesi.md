# Takip Asistanı - Yapılacaklar Listesi

> Bu dosya, projenin tüm gereksinimlerini ve geliştirme adımlarını sıralı ve kontrol edilebilir şekilde içerir. Her adım tamamlandıkça işaretlenebilir.

## Genel Kurallar
- [ ] Tüm iletişim ve kodlama dili Türkçe olacak, değişkenler İngilizce, açıklamalar Türkçe.
- [ ] Tüm ekranlar ve bileşenler responsive, mobil-first ve modern olacak (Tailwind CSS).
- [ ] Tüm veriler önce local SQLite (sql.js), sonra Supabase ile senkronize olacak.
- [ ] Kategori seçimi ve gösterimi tüm görev, not ve listelerde zorunlu.
- [ ] Kodda magic number kullanılmayacak, açıklama ve dokümantasyon olacak.

## 1. Navigasyon ve Ana Sayfa
- [x] Sidebar (masaüstü) ve alt hamburger menü (mobil) tam uyumlu ve Türkçe.
- [x] Dashboard (Ana Sayfa) başlığı ve içeriği Türkçe.

## 2. Görevler Modülü
- [x] Görevler sayfası: Görevlerin listelenmesi (kategori etiketi, başlık, durum, atanan, son tarih, erteleme sayısı)
- [x] Responsive kart/grid görünümü, kategori etiketi renkli ve zorunlu
- [ ] "Yeni Görev" butonu ve modalı
  - [ ] Tüm alanlar: başlık, açıklama (CKEditor), kategori, son tarih, kullanıcı ata
  - [ ] Zorunlu alan validasyonları
  - [ ] Dummy veriyle tam uyumlu ekleme
- [ ] Online/Offline durumu ve eşitleme ikonu üstte
  - [ ] Gerçek zamanlı bağlantı durumu
  - [ ] Eşitleme simgesi ve işlevi
- [ ] Görev düzenleme modalı
  - [ ] Tüm alanlar ve validasyonlar
  - [ ] Dummy veriyle tam uyumlu güncelleme
- [ ] Görev detay sayfası
  - [ ] Tüm alanların gösterimi (başlangıç, son, tamamlanma tarihi, toplam gün, erteleme geçmişi, kategori, atanan, açıklama)
  - [ ] Erteleme geçmişi ve sayısı
  - [ ] Düzenle, Tamamla, Ertele butonları

## 3. Notlar ve Listeler
- [ ] Notlar ve listeler sayfası: Kartlarda kategori etiketi, başlık, özet, tarih
- [ ] "Yeni Not" ve "Yeni Liste" butonları

## 4. Kategori Yönetimi
- [ ] Kategori ekle/düzenle/sil
- [ ] Kategori rengi seçimi ve gösterimi

## 5. Kullanıcı Yönetimi
- [ ] Dummy kullanıcı listesi ile prototipleme
- [ ] Supabase Auth ile gerçek kullanıcı yönetimi

## 6. Senkronizasyon ve Offline Desteği
- [ ] Local SQLite ile Supabase arasında otomatik veri eşitleme
- [ ] Bağlantı durumu göstergesi (online/offline)

## 7. AI Özellikleri
- [ ] Not ve görev özetleme, etiket önerisi (OpenAI/Gemini API)

## 8. Test, Temizlik ve Son Kontroller
- [ ] Tüm fonksiyonların manuel ve otomatik testleri
- [ ] Dummy verilerin temizlenmesi
- [ ] Kodun ve dokümantasyonun son kontrolü 