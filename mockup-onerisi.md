# Temel Ekranlar için Mockup Önerisi

> **Tüm ekranlar modern, kullanıcı dostu, mobil uygulama benzeri ve tamamen responsive/mobil-first olarak Tailwind CSS ile tasarlanacaktır. UI/UX önceliklidir.**
> **Tüm görev, not ve listelerde kategori etiketi ve seçimi zorunludur. Kartlarda kategori etiketi renkli olarak gösterilir.**

```
[ Giriş / Kayıt ]
+-----------------------------+
| Takip Asistanı              |
| [Kullanıcı Adı] [Şifre]     |
| [Giriş Yap] [Kayıt Ol]      |
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
| +-----------------------+   |
| [Görev Ekle]                |
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
| [AI Özeti]                  |
| Etiketler: [etiket1][etiket2]|
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