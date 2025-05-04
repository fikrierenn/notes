# Temel Ekranlar için Mockup Önerisi

> **Tüm ekranlar modern, kullanıcı dostu, mobil uygulama benzeri ve tamamen responsive/mobil-first olarak Tailwind CSS ile tasarlanacaktır. UI/UX önceliklidir.**
> **Tüm görev, not ve listelerde kategori etiketi ve seçimi zorunludur. Kartlarda kategori etiketi renkli olarak gösterilir.**
> **Uygulama hem mobilde hem de masaüstünde (PC) tam fonksiyonlu ve kullanıcı dostu olarak çalışır. Menü ve formlar ekran boyutuna göre otomatik olarak uyum sağlar.**

```
[ Giriş / Kayıt ]
+-----------------------------+
| Takip Asistanı              |
| [Kullanıcı Adı] [Şifre]     |
| [Giriş Yap] [Kayıt Ol]      |
| (Supabase Auth ile gerçek kullanıcı yönetimi) |
+-----------------------------+

[ Ana Sayfa / Görev Listesi ]
+-----------------------------+
| [Kullanıcı Menüsü]          |
| Görevlerim                  |
| [Durum: ● Offline] [⟳ Eşitle]|
| +-----------------------+   |
| | [Kategori: İş]        |   |
| | Görev Başlığı         |   |
| | [Durum] [Atanan Kişi] |   |
| | Son: [Son Tarih]      |   |
| | Erteleme: 2 kez       |   |
| +-----------------------+   |
| [Yeni Görev]                |
+-----------------------------+

[ Masaüstü için Geniş Görünüm ]
+-------------------------------------------------------------+
| [Sidebar Menü]      Görevlerim                              |
| [Kullanıcı]         +-------------------------------+       |
|                     | [Kategori: İş]                |       |
|                     | Görev Başlığı                 |       |
|                     | [Durum] [Atanan Kişi]         |       |
|                     | Son: [Son Tarih]              |       |
|                     | Erteleme: 2 kez               |       |
|                     +-------------------------------+       |
|                     ... (grid veya iki sütunlu görünüm)     |
+-------------------------------------------------------------+

[ Yeni Görev Modalı ]
+-----------------------------+
| Yeni Görev                  |
| Başlık: [             ]     |
| Açıklama: [CKEditor]        |
| Kategori:  [dropdown]       |
| Son Tarih: [date picker]    |
| Kullanıcı Ata: [dropdown]   |
|  - Dummy kullanıcı listesi veya gerçek kullanıcılar (Supabase Auth) |
| [Kaydet] [İptal]            |
+-----------------------------+

[ Görev Detay ]
+-----------------------------+
| [Kategori: Kişisel]         |
| Görev Başlığı               |
| Oluşturulma: [Tarih]        |
| Durum: [Açık/Tamamlandı]    |
| Atanan: [Kullanıcı]         |
| Açıklama:                   |
| [Görev metni]               |
| Son Tarih: [Tarih]          |
| Tamamlanma: [Tarih]         |
| Toplam Gün: [X]             |
| Erteleme: 2 kez             |
| Erteleme Geçmişi:           |
|  - 10.06.2024 → 15.06.2024  |
|  - 15.06.2024 → 20.06.2024  |
| [Düzenle] [Tamamla]         |
| [Durum: ● Online] [⟳ Eşitlendi]|
+-----------------------------+

[ Notlar ]
+-----------------------------+
| Notlarım                    |
| [Durum: ● Offline] [⟳ Eşitle]|
| +-----------------------+   |
| | [Kategori: Alışveriş] |   |
| | Not Başlığı           |   |
| | [AI Özeti]            |   |
| +-----------------------+   |
| [Not Ekle]                  |
+-----------------------------+

[ Liste Yönetimi ]
+-----------------------------+
| Listelerim                  |
| +-----------------------+   |
| | [Kategori: Proje]     |   |
| | Liste Adı             |   |
| +-----------------------+   |
| [Liste Ekle]                |
+-----------------------------+
```

> Not: Ekranların üst kısmında bağlantı durumu (Online/Offline) ve eşitleme (senkronizasyon) ikonları yer alır. Kullanıcı offline ise localde çalışır, online olunca Supabase ile otomatik eşitlenir.