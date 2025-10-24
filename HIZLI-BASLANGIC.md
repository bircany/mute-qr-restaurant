# ⚡ Hızlı Başlangıç - Mute Restaurant

## 1️⃣ Projeyi Çalıştırın

```bash
npm run dev
```

✅ Tarayıcınızda http://localhost:3000 açılacak

---

## 2️⃣ Kendi Menünüzü Ekleyin

### Google Sheets Hazırlayın:

| Ürün Adı | Ürün Açıklaması | Ürün Fiyatı | Ürün Resmi | Kategori |
|----------|-----------------|-------------|------------|----------|
| Adana Kebap | Közün sıcaklığıyla... | 180 | /products/adana.jpg | Ana Yemekler |
| Künefe | Kadayıfın çıtırlığı... | 120 | /products/kunefe.jpg | Tatlılar |
| Rakı | Sofranın baş tacı | 450 | /products/raki.jpg | Şaraplar |

### Sheet'i Paylaşın:
1. **Share** > **Anyone with the link** > **Viewer**
2. URL'den ID'yi kopyalayın:
   ```
   https://docs.google.com/spreadsheets/d/BURASI_ID/edit
   ```

### ID'yi Güncelleyin:
📁 `lib/googleSheets.ts` dosyasını açın:

```typescript
const SHEET_ID = 'BURAYA_KENDI_ID_NIZ'
```

Kaydedin ve sayfa otomatik yenilenecek! ✨

---

## 3️⃣ Ürün Resimlerini Ekleyin

Resimlerinizi `/public/products/` klasörüne koyun:

```
public/
  products/
    adana-kebap.jpg
    kunefe.jpg
    raki.jpg
```

Google Sheets'te kullanın:
```
/products/adana-kebap.jpg
```

---

## 4️⃣ Branding'i Özelleştirin

### Logo Değiştir
📁 `components/Header.tsx`:
```tsx
<h1>Sizin Restoranınız.</h1>
<p>Sizin Sloganınız</p>
```

### Renkleri Değiştir
📁 `tailwind.config.js`:
```js
colors: {
  copper: {
    500: '#BURAYA_RENK_KODU',
  }
}
```

---

## 5️⃣ Yayınlayın (Deploy)

### Vercel ile (En Kolay):
```bash
npm install -g vercel
vercel
```

### Veya:
- **Netlify** - GitHub push sonrası otomatik deploy
- **Railway** - Hızlı ve kolay
- **Render** - Ücretsiz plan

---

## ✅ Tamamdır!

Menünüz canlıda! 🎉

**Daha fazla bilgi için:** `USAGE.md` ve `README.md` dosyalarına bakın.

---

**Mute Restaurant © 2024**

