# Mute Restaurant - QR Menu

**Yeni Nesil Ocakbaşı & Meyhane** için tasarlanmış zarif, modern bir dijital menü uygulaması.

## 🌟 Özellikler

- ✨ **Zarif Tasarım**: Karanlık temalar, bakır tonları ve modern tipografi
- 🔥 **Google Sheets Entegrasyonu**: Menü güncellemeleri Google Sheets üzerinden gerçek zamanlı
- ⚡ **Next.js + TypeScript**: Modern, performanslı ve tip güvenli
- 🎨 **Tailwind CSS**: Responsive ve özelleştirilebilir tasarım
- 📱 **Mobil Uyumlu**: Tüm cihazlarda mükemmel görünüm
- 🎭 **Hover Animasyonları**: Zarif geçiş efektleri ve glow efektleri
- 🧩 **Modüler Komponentler**: Kolay güncelleme ve bakım

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Development server'ı başlat
npm run dev

# Production build
npm run build

# Production preview
npm start
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 🔍 Arama Özelliği

Menüde arama yapabilirsiniz! Arama çubuğuna ürün adı, kategori veya alt kategori yazın:

**Örnekler:**
- "Yeni Rakı 70cl" → Direkt ürüne gider
- "Rakı" → Tüm rakı çeşitlerini gösterir
- "Adana" → Adana Kebap'ı bulur
- "Kebap" → Tüm kebap çeşitlerini listeler

Arama sonucuna tıklayınca sayfa otomatik olarak o ürüne scroll eder ve ürün vurgulanır! ✨

## 📊 Google Sheets Yapılandırması

### 1. Google Sheets Oluşturma

Google Drive'da yeni bir spreadsheet oluşturun ve aşağıdaki sütunları ekleyin:

| Ürün Adı | Ürün Açıklaması | Ürün Fiyatı | Ürün Resmi | Kategori | Alt Kategori |
|----------|-----------------|-------------|------------|----------|--------------|
| Adana Kebap | Adana'nın eşsiz uyumu... | 185 | /products/no-image.jpg | Ana Yemekler | |
| Yeni Rakı 70cl | Türkiye'nin klasiği... | 850 | /products/no-image.jpg | Alkoller | Rakı |
| Künefe | Kadayıfın çıtırlığı... | 125 | /products/no-image.jpg | Tatlılar | |

**💡 Hazır veriler için:** `ORNEK-MENU-DATA.csv` dosyasını Google Sheets'e import edin!
**📖 Detaylı talimat:** `GOOGLE-SHEETS-KURULUM.md` dosyasına bakın.

### 2. Paylaşım Ayarları

1. **Share** > **Anyone with the link** (Viewer)
2. Link'i kopyalayın
3. URL'den `id` değerini alın:
   ```
   https://docs.google.com/spreadsheets/d/{ID_BURAYA}/
   ```

### 3. ID'yi Güncelleme

`lib/googleSheets.ts` dosyasında `SHEET_ID` değişkenini güncelleyin:

```typescript
const SHEET_ID = 'BURAYA_KENDI_SHEET_ID_NIZ'
```

## 🎨 Kategoriler

Menü aşağıdaki kategorilere ayrılmıştır:

### Ana Kategoriler
- **Başlangıçlar**: Çorbalar (Mercimek, İşkembe, Ezogelin)
- **Mezeler**: Soğuk mezeler (Humus, Haydari, Atom, Ezme vb.)
- **Ara Sıcaklar**: Sıcak atıştırmalıklar (Sigara Böreği, Arnavut Ciğeri vb.)
- **Salatalar**: Salata ve soğuşlar (Çoban, Gavurdağı, Roka vb.)
- **Ana Yemekler**: Kebaplar ve et yemekleri (Adana, Urfa, Beyti vb.)
- **Spesyaller**: Özel tarifler (Mute Özel Kebap, Şef Önerisi vb.)
- **Tatlılar**: Geleneksel tatlılar (Künefe, Baklava, Sütlaç vb.)
- **İçecekler**: Alkolsüz içecekler (Çay, Ayran, Limonata vb.)
- **Alkoller**: Alkollü içecekler (Alt kategorili - Rakı, Şarap, Bira vb.)
- **Aperatifler**: Kuruyemişler (Fıstık, Badem, Ceviz vb.)
- **Meyveler**: Mevsim meyveleri

### Alt Kategoriler (Sadece Alkoller için)
- **Rakı**: Yeni Rakı, Tekirdağ, Efe, Kulüp vb.
- **Şarap**: Kırmızı, Beyaz, Rosé
- **Bira**: Efes, Bomonti, Tuborg, Corona vb.
- **Cin**: Bombay Sapphire, Tanqueray
- **Vodka**: Absolut, Grey Goose

## 🖼️ Resim Ekleme

Ürün resimlerini `/public/products/` klasörüne ekleyin veya Google Sheets'te dış bağlantı kullanın.

## 🎯 AI Destekli Açıklamalar

`lib/googleSheets.ts` içindeki `generateMenuDescription()` fonksiyonu, otomatik olarak şiirsel menü açıklamaları üretir. Production ortamında ChatGPT API entegrasyonu eklenebilir.

```typescript
generateMenuDescription("Adana Kebap") 
// → "Adana'nın eşsiz uyumu, közün kalbinden gelen lezzet."
```

## 🚢 Deployment

### Vercel (Önerilen)

```bash
npm install -g vercel
vercel
```

### Netlify

1. GitHub'a push yapın
2. Netlify'da "New site from Git" seçin
3. Repository'yi seçin ve deploy edin

### GitHub Pages

Not: Next.js için static export gerekir:
```bash
npm run build
```

## 📁 Proje Yapısı

```
mute-restaurant-menu/
├── app/
│   ├── layout.tsx       # Ana layout
│   ├── page.tsx         # Ana sayfa
│   └── globals.css      # Global stiller
├── components/
│   ├── Header.tsx       # Header komponenti
│   ├── Footer.tsx       # Footer komponenti
│   ├── MenuSection.tsx  # Menü bölümü
│   └── MenuItem.tsx     # Menü öğesi kartı
├── lib/
│   └── googleSheets.ts  # Google Sheets API
├── public/
│   └── products/        # Ürün resimleri
└── README.md
```

## 🎨 Tasarım Sistemi

### Renk Paleti
- **Ana**: Karanlık gradient (#1a1a1a → #2a2a2a)
- **Vurgu**: Bakır tonları (#bfa094, #a18072)
- **Metin**: Beyaz, gri tonları

### Tipografi
- **Başlıklar**: Playfair Display (serif)
- **Açıklamalar**: Manrope (sans-serif)

## 📝 Lisans

MIT License

---

**Közün sıcaklığı, lezzetin zarafeti** 🔥

*Mute Restaurant © 2024*
