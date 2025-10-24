# 📊 Google Sheets Kurulum Talimatları

## Adım 1: Google Sheets Oluşturma

1. [Google Drive](https://drive.google.com/) > **Yeni (+)** > **Google E-Tablolar** > **Boş e-tablo**
2. Dosya adını **"Mute Restaurant Menu"** olarak değiştirin

## Adım 2: Sütun Başlıklarını Ekleyin

İlk satıra şu başlıkları yazın:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| **Ürün Adı** | **Ürün Açıklaması** | **Ürün Fiyatı** | **Ürün Resmi** | **Kategori** | **Alt Kategori** |

## Adım 3: Örnek Verileri İçe Aktarın

### Yöntem 1: CSV'den İçe Aktarma (Kolay)

1. `ORNEK-MENU-DATA.csv` dosyasını açın
2. Google Sheets'te: **Dosya** > **İçe Aktar** > **Yükle**
3. CSV dosyasını sürükleyip bırakın
4. **İçe aktarma konumu**: "Mevcut sayfayı değiştir" seçin
5. **Ayırıcı türü**: "Virgül" seçin
6. **İçe Aktar** butonuna tıklayın

### Yöntem 2: Manuel Kopyala-Yapıştır

1. `ORNEK-MENU-DATA.csv` dosyasını Excel veya metin editöründe açın
2. Tüm verileri kopyalayın (Ctrl+A, Ctrl+C)
3. Google Sheets'te A1 hücresine yapıştırın (Ctrl+V)

## Adım 4: Örnek Veriler

İşte hazır örnek veriler (kopyalayıp yapıştırabilirsiniz):

```
Ürün Adı	Ürün Açıklaması	Ürün Fiyatı	Ürün Resmi	Kategori	Alt Kategori
Adana Kebap	Adana'nın eşsiz uyumu, közün kalbinden gelen lezzet	185	/products/no-image.jpg	Ana Yemekler	
Urfa Kebap	Urfa'nın sırrını taşıyan, baharat armonisinin şiiri	195	/products/no-image.jpg	Ana Yemekler	
Yeni Rakı 70cl	Türkiye'nin klasiği, sofranın baş tacı	850	/products/no-image.jpg	Alkoller	Rakı
Künefe	Kadayıfın çıtırlığı, peynirin sıcaklığı	125	/products/no-image.jpg	Tatlılar	
Humus	Nohutun yumuşaklığı, tahinle buluşan Akdeniz esintisi	75	/products/no-image.jpg	Mezeler	
```

## Adım 5: Paylaşım Ayarları

1. Sağ üstteki **Paylaş** butonuna tıklayın
2. **Genel Erişim** bölümünde:
   - "Kısıtlı" yerine **"Bağlantıya sahip olan herkes"** seçin
   - Erişim: **Görüntüleyici** olarak bırakın
3. **Bağlantıyı kopyala** butonuna tıklayın
4. **Bitti** deyin

## Adım 6: Sheet ID'yi Alın

Kopyaladığınız bağlantı şu formatta olacak:
```
https://docs.google.com/spreadsheets/d/BURASI_SHEET_ID/edit
```

**Örnek:**
```
https://docs.google.com/spreadsheets/d/1pAPp07inuiGuUBF4Xalz2uUQwFTYVP86SHennrlD_l8/edit
```

`1pAPp07inuiGuUBF4Xalz2uUQwFTYVP86SHennrlD_l8` → Bu sizin Sheet ID'niz

## Adım 7: Projeye Bağlayın

1. Projede `lib/googleSheets.ts` dosyasını açın
2. 31. satırı bulun:
   ```typescript
   const SHEET_ID = '1pAPp07inuiGuUBF4Xalz2uUQwFTYVP86SHennrlD_l8'
   ```
3. Kendi Sheet ID'nizi yapıştırın:
   ```typescript
   const SHEET_ID = 'KENDI_SHEET_ID_NIZ'
   ```
4. Dosyayı kaydedin (Ctrl+S)

## ✅ Test Edin

1. Projeyi çalıştırın: `npm run dev`
2. Tarayıcıda http://localhost:3000 açın
3. Menü verilerinizi göreceksiniz!

## 📝 Kategoriler ve Alt Kategoriler

### Ana Kategoriler (Kategori sütunu):
- **Başlangıçlar** - Çorbalar
- **Mezeler** - Soğuk mezeler
- **Ara Sıcaklar** - Sıcak atıştırmalıklar
- **Salatalar** - Salata ve soğuşlar
- **Ana Yemekler** - Kebaplar, et yemekleri
- **Spesyaller** - Özel tarifler
- **Tatlılar** - Tatlılar
- **İçecekler** - Alkolsüz içecekler
- **Alkoller** - Alkollü içecekler (alt kategorili)
- **Aperatifler** - Kuruyemişler
- **Meyveler** - Mevsim meyveleri

### Alt Kategoriler (Alt Kategori sütunu):
**Sadece "Alkoller" kategorisi için:**
- **Rakı** - Yeni Rakı, Tekirdağ, Efe vb.
- **Şarap** - Kırmızı, Beyaz, Rosé
- **Bira** - Efes, Bomonti, Corona vb.
- **Cin** - Bombay, Tanqueray vb.
- **Vodka** - Absolut, Grey Goose vb.

Diğer kategorilerde **Alt Kategori sütununu boş bırakın**.

## 💡 İpuçları

### Fiyat Formatlama
- Sadece rakam yazın: `185` (₺ sembolü otomatik eklenir)
- Ondalıklı: `125.50` veya `125`

### Resim Linkleri
- Lokal resimler: `/products/adana-kebap.jpg`
- Harici linkler: `https://example.com/resim.jpg`
- Varsayılan: `/products/no-image.jpg`

### Açıklama Yazımı
- Kısa ve şiirsel tutun (max 100 karakter)
- Boş bırakırsanız otomatik açıklama oluşturulur
- Örnek: "Közün kalbinden gelen lezzet, Adana'nın tutkusu"

### Hızlı Güncelleme
1. Google Sheets'te fiyatı değiştirin
2. Sayfayı yenileyin (F5)
3. Değişiklik anında yansır! (cache temizleme gerekebilir)

## 🎨 Tam Menü Örneği

### Mezeler Kategorisi
```
Humus		75	/products/no-image.jpg	Mezeler	
Haydari		65	/products/no-image.jpg	Mezeler	
Atom		70	/products/no-image.jpg	Mezeler	
```

### Alkoller Kategorisi (Alt Kategori ile)
```
Yeni Rakı 35cl		450	/products/no-image.jpg	Alkoller	Rakı
Yeni Rakı 70cl		850	/products/no-image.jpg	Alkoller	Rakı
Efes Pilsen 50cl	65	/products/no-image.jpg	Alkoller	Bira
```

## 🔄 Güncellemeler

Menünüzü güncellemek çok kolay:

1. Google Sheets'i açın
2. İstediğiniz hücreyi değiştirin (fiyat, açıklama vb.)
3. Web sitesini yenileyin - değişiklik anında görünür!

**Not:** Tarayıcı cache'i temizlemeniz gerekebilir (Ctrl+Shift+R)

## ❓ Sık Sorulan Sorular

**S: Yeni kategori ekleyebilir miyim?**  
C: Evet! Kategori sütununa yeni bir kategori adı yazın, otomatik görünecek.

**S: Alt kategori zorunlu mu?**  
C: Hayır, sadece "Alkoller" kategorisi için önerilir. Diğerlerinde boş bırakın.

**S: Kaç ürün ekleyebilirim?**  
C: Google Sheets limiti: 5 milyon hücre. Pratikte binlerce ürün ekleyebilirsiniz.

**S: Resim nasıl eklerim?**  
C: Resmi `/public/products/` klasörüne koyun ve Ürün Resmi sütununa `/products/dosyaadi.jpg` yazın.

---

**Başarılar! 🍽️**

Sorularınız için: [GitHub Issues](https://github.com/username/repo/issues)

