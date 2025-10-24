# 🔥 Mute Restaurant - Kullanım Kılavuzu

## ✅ Kurulum Tamamlandı!

Projeniz başarıyla Next.js + Tailwind CSS ile yapılandırıldı ve **Mute Restaurant** branding'i ile özelleştirildi.

## 🚀 Hızlı Başlangıç

### 1. Development Server'ı Başlatın

```bash
npm run dev
```

Uygulama **http://localhost:3000** adresinde açılacaktır.

### 2. Production Build

```bash
npm run build
npm start
```

## 📊 Google Sheets Yapılandırması

### Mevcut Ayar
Şu anda proje, örnek Google Sheets ID'si kullanıyor:
```
SHEET_ID = '1pAPp07inuiGuUBF4Xalz2uUQwFTYVP86SHennrlD_l8'
```

### Kendi Menünüzü Bağlamak İçin:

1. **Google Sheets Oluşturun**
   - Google Drive'da yeni bir spreadsheet açın
   - Sütunları şu sırayla oluşturun:
     - A: Ürün Adı
     - B: Ürün Açıklaması
     - C: Ürün Fiyatı
     - D: Ürün Resmi (URL)
     - E: Kategori

2. **Örnek Veri:**
   ```
   Adana Kebap | Adana'nın eşsiz uyumu... | 180 | /products/kebap.jpg | Ana Yemekler
   Künefe | Kadayıfın çıtırlığı... | 120 | /products/kunefe.jpg | Tatlılar
   ```

3. **Paylaşım Ayarları**
   - Share > Anyone with the link (Viewer)
   - URL'den ID'yi kopyalayın

4. **ID'yi Güncelleyin**
   `lib/googleSheets.ts` dosyasını açın:
   ```typescript
   const SHEET_ID = 'BURAYA_KENDI_SHEET_ID_NIZ'
   ```

## 📂 Proje Yapısı

```
mute-restaurant-menu/
├── app/
│   ├── layout.tsx       # Ana layout (font'lar, metadata)
│   ├── page.tsx         # Ana sayfa (menü kategorileri)
│   └── globals.css      # Global CSS (Tailwind utilities)
│
├── components/
│   ├── Header.tsx       # Logo ve başlık
│   ├── Footer.tsx       # Alt bilgi
│   ├── MenuSection.tsx  # Kategori bölümü wrapper
│   └── MenuItem.tsx     # Ürün kartı (resim, ad, fiyat)
│
├── lib/
│   └── googleSheets.ts  # Google Sheets API entegrasyonu
│
└── public/
    └── products/        # Ürün resimleri
```

## 🎨 Tasarım Özellikleri

### Renk Paleti
- **Ana Arka Plan**: `#1a1a1a` → `#2a2a2a` (gradient)
- **Vurgu Rengi**: Copper (Bakır tonları)
  - `copper-300`: `#e0cec7`
  - `copper-600`: `#a18072`
  - `copper-900`: `#43302b`

### Tipografi
- **Başlıklar**: `Playfair Display` (serif) - Zarif, klasik
- **Açıklamalar**: `Manrope` (sans-serif) - Modern, okunabilir

### Hover Efektleri
- Scale animasyonu (1.02x büyüme)
- Copper glow efekti
- Border renk geçişi
- Resim zoom efekti

## 🖼️ Resim Yönetimi

### Lokal Resimler
Resimleri `/public/products/` klasörüne ekleyin:
```
/public/products/adana-kebap.jpg
/public/products/kunefe.jpg
```

Google Sheets'te:
```
/products/adana-kebap.jpg
```

### Harici Resimler
Doğrudan URL kullanabilirsiniz:
```
https://example.com/images/product.jpg
```

## 🎯 AI Açıklama Sistemi

`lib/googleSheets.ts` içinde `generateMenuDescription()` fonksiyonu var:

```typescript
generateMenuDescription("Adana Kebap")
// → "Adana'nın eşsiz uyumu, közün kalbinden gelen lezzet."
```

### Kendi Açıklamalarınızı Ekleyin:

```typescript
const descriptions: Record<string, string> = {
  'Adana Kebap': 'Özel açıklama...',
  'Yeni Yemek': 'Başka bir açıklama...',
}
```

### ChatGPT Entegrasyonu (Opsiyonel):
Production'da OpenAI API kullanarak otomatik açıklamalar üretebilirsiniz.

## 📱 Kategoriler

Şu kategoriler desteklenmektedir:
- **Başlangıçlar** - Mezeler, atıştırmalıklar
- **Ana Yemekler** - Kebaplar, et yemekleri
- **Tatlılar** - Geleneksel tatlılar
- **Kokteyller** - Özel içecekler
- **Şaraplar** - Şarap menüsü

Kategori eklemek için Google Sheets'te yeni bir kategori adı yazın, otomatik görünecektir.

## 🛠️ Özelleştirme

### Logo Değiştirme
`components/Header.tsx`:
```tsx
<h1>Mute.</h1>  // Burası değiştirilebilir
```

### Renk Teması Değiştirme
`tailwind.config.js`:
```js
colors: {
  copper: {
    // Renkleri buradan düzenleyin
  }
}
```

### Slogan Değiştirme
`components/Header.tsx`:
```tsx
<p>Yeni Nesil Ocakbaşı & Meyhane</p>
```

## 🚢 Deployment (Yayınlama)

### Vercel (Önerilen - Ücretsiz)
```bash
npm install -g vercel
vercel
```

### Netlify
1. GitHub'a push yapın
2. Netlify.com'da "New site from Git"
3. Repository seçin, deploy edin

### Diğer Platformlar
- Railway
- Render
- Fly.io

## 🔍 Sorun Giderme

### Resimler Görünmüyor
- Dosya yolunu kontrol edin (`/products/resim.jpg`)
- `next.config.js`'de `unoptimized: true` var mı?
- Harici URL kullanıyorsanız HTTPS olmalı

### Google Sheets Verisi Gelmiyor
- Sheet ID'yi kontrol edin
- Paylaşım ayarları: "Anyone with the link"
- Browser console'da hata var mı kontrol edin

### Build Hatası
```bash
# Temiz kurulum
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 📞 Destek

Herhangi bir sorunla karşılaşırsanız:
1. Console loglarını kontrol edin (F12)
2. `npm run lint` çalıştırın
3. README.md'yi tekrar okuyun

---

**Afiyet olsun! 🍽️**

*Közün sıcaklığı, lezzetin zarafeti - Mute Restaurant*

