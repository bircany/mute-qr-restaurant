// Google Sheets Integration - maintaining original logic from index.html

export interface MenuItem {
  productName: string
  productDescription: string
  productPrice: string
  productImage: string
  category: string
  subCategory?: string // Alt kategori (opsiyonel) - örn: Rakı, Şarap, Bira
}

interface GoogleSheetsCell {
  v: string | null
}

interface GoogleSheetsRow {
  c: (GoogleSheetsCell | null)[]
}

interface GoogleSheetsTable {
  rows: GoogleSheetsRow[]
}

interface GoogleSheetsResponse {
  table: GoogleSheetsTable
}

// Your Google Sheets ID - update this with your own sheet ID
const SHEET_ID = '13TP_bZjg1rPBnlS8wJ9KV3eRIHioAqgOWRE8EaL8QzU'
const GID = '1127384471'

export async function fetchMenuData(): Promise<MenuItem[]> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&tq&gid=${GID}`
  
  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    })
    const data = await response.text()
    
    // Google Sheets returns JSONP, we need to extract the JSON
    const jsonString = data.substring(47).slice(0, -2)
    const json: GoogleSheetsResponse = JSON.parse(jsonString)
    
    // İlk satırı (başlık satırı) atla ve verileri doğru sütunlardan al
    // Google Sheets sütun sırası: A=Ürün Adı, B=Ürün Fiyatı, C=Kategori, D=Alt Kategori, E=Ürün Açıklaması, F=Ürün Resmi
    const menuItems: MenuItem[] = json.table.rows
      .slice(1) // İlk satırı (başlık) atla
      .map(row => ({
        productName: row.c[0]?.v || '', // A sütunu: Ürün Adı
        productPrice: row.c[1]?.v || '', // B sütunu: Ürün Fiyatı
        category: row.c[2]?.v || '', // C sütunu: Kategori
        subCategory: row.c[3]?.v || '', // D sütunu: Alt Kategori
        productDescription: row.c[4]?.v || generateMenuDescription(row.c[0]?.v || ''), // E sütunu: Ürün Açıklaması
        productImage: row.c[5]?.v || '/products/no-image.jpg', // F sütunu: Ürün Resmi
      }))
      .filter(item => item.productName && item.productName.trim() !== '') // Boş satırları filtrele
    
    return menuItems
  } catch (error) {
    console.error('Error fetching menu data:', error)
    return []
  }
}

/**
 * AI-inspired poetic menu descriptions generator
 * In production, this could call ChatGPT API for dynamic descriptions
 * For now, uses template-based poetic descriptions
 */
export function generateMenuDescription(dishName: string): string {
  const descriptions: Record<string, string> = {
    // BAŞLANGIÇLAR
    'Mercimek Çorbası': 'Anadolu\'nun sıcak kucağı, nane ve limon aromalarıyla.',
    'İşkembe Çorbası': 'Geleneksel lezzet, sarımsaklı sirkesiyle.',
    'Ezogelin Çorbası': 'Bulgur ve mercimeğin uyumu, nane yağının zarafeti.',
    
    // MEZELER
    'Humus': 'Nohutun yumuşaklığı, tahinle buluşan Akdeniz esintisi.',
    'Haydari': 'Süzme yoğurdun serinliği, taze otların esintisi.',
    'Atom': 'Közlenmiş patlıcanın dumanı, acı biberin coşkusu.',
    'Muhammara': 'Kırmızı biberin tutkusu, cevizin narinliği.',
    'Cacık': 'Yoğurt ve salatalığın serinliği, nane ve sarımsakla.',
    'Patlıcan Közleme': 'Ateşin kucağından gelen duman aroması.',
    'Ezme': 'Domates, biber, nar ekşisi - Akdeniz\'in canlı renklerı.',
    'Tarama': 'Taramadan gelen denizin tuzlu esintisi.',
    'Acılı Ezme': 'Ateş gibi acı, domates ve biberin dansı.',
    
    // ARA SICAKLAR
    'Sigara Böreği': 'Çıtır yufka, peynirin sıcak sarılımı.',
    'Kaşarlı Mantar': 'Mantarın toprak kokusu, kaşarın erimesi.',
    'Kalamar Tava': 'Denizin çıtır lezzeti, limon ve tarator eşliğinde.',
    'Arnavut Ciğeri': 'Kızarmış ciğerin yumuşaklığı, soğan ve sumakla.',
    'Midye Tava': 'Deniz nefesi, sarımsak ve fındık ezmesi.',
    'Falafel': 'Nohutun çıtırlığı, baharatların uyumu.',
    
    // ANA YEMEKLER
    'Adana Kebap': 'Adana\'nın eşsiz uyumu, közün kalbinden gelen lezzet.',
    'Urfa Kebap': 'Urfa\'nın sırrını taşıyan, baharat armonisinin şiiri.',
    'Beyti': 'Yoğurt ve tereyağının dansı, közlenmiş etin zarafeti.',
    'Kuzu Şiş': 'Marine kuzu but, ateşin kucağında olgunlaşmış.',
    'Tavuk Şiş': 'Tavuk göğsün narinliği, baharatların dokunuşu.',
    'Karışık Izgara': 'Közün senfonisi, her lokma farklı bir ahenk.',
    'Kuzu Pirzola': 'Dana pirzola, közün öpücüğüyle.',
    'İskender': 'Bursa\'nın efsanesi, yoğurt, domates, tereyağı.',
    'Patlıcan Kebap': 'Patlıcan ve etin mükemmel buluşması.',
    
    // SALATALAR
    'Çoban Salata': 'Bahçenin taze nefesi, zeytinyağı ve limonla.',
    'Mevsim Yeşillik': 'Taze yapraklar, nar ekşisi sosla.',
    'Gavurdağı Salatası': 'Ceviz, nar ekşisi, domates - Antep\'in hazinesi.',
    'Roka Salatası': 'Roka yaprakları, parmesan ve balzamik.',
    'Soğuş': 'Taze fasulye, havuç, patates - zeytinyağlı serinlik.',
    
    // TATLILAR
    'Künefe': 'Kadayıfın çıtırlığı, peynirin sıcaklığı, şerbetın tatlılığı.',
    'Baklava': 'Fıstığın cömertliği, yufkanın inceliği, geleneksel lezzet.',
    'Sütlaç': 'Sütün saflığı, pirincin yumuşaklığı, tarçının sıcaklığı.',
    'Kazandibi': 'Keşkül bulamacının zarif yanışı, vanilyalı.',
    'Şöbiyet': 'Kaymaklı baklava, fıstık dolgulu.',
    'Trileçe': 'Üç sütün uyumu, karamelize yumuşaklık.',
    'Magnolia': 'Bisküvi ve kremanın katmanları, nostaljik lezzet.',
    
    // İÇECEKLER
    'Çay': 'Bergamot kokulu, demli, sıcak bir kucaklama.',
    'Türk Kahvesi': 'Geleneksel pişirme, yoğun aroma, damakta iz bırakan.',
    'Limonata': 'Taze sıkılmış limon, nane yaprakları, yaz serinliği.',
    'Ayran': 'Yoğurdun tazeliği, tuzun dengesı, serinlik.',
    'Şalgam': 'Havuç suyunun keskinliği, fermente lezzet.',
    'Soda': 'Klasik serinlik, limon aromasıyla.',
    'Meyveli Soda': 'Meyve aromaları, gazlı serinlik.',
    
    // ALKOLLER - RAKI
    'Yeni Rakı': 'Türkiye\'nin klasiği, sofranın baş tacı.',
    'Tekirdağ Rakısı': 'Trakya\'nın incisi, üzüm aromasıyla.',
    'Efe Rakı': 'Ege\'nin esintisi, geleneksel damıtım.',
    'Kulüp Rakı': 'Premium lezzet, özel harman.',
    'Beylerbeyi Rakısı': 'İstanbul\'un zarafeti, klasik tat.',
    
    // ALKOLLER - ŞARAP
    'Kırmızı Şarap': 'Üzümün olgun aroması, kadehte zarafet.',
    'Beyaz Şarap': 'Serin ve ferah, balık yemekleriyle mükemmel.',
    'Rosé Şarap': 'Pembe tonlar, hafif ve zarif.',
    'Kavaklidere Yakut': 'Yerli üzümden, Anadolu\'nun lezzeti.',
    'Doluca Öküzgözü': 'Elazığ\'ın incisi, yoğun meyve aroması.',
    
    // ALKOLLER - BİRA
    'Efes Pilsen': 'Türkiye\'nin favorisi, soğuk ve ferah.',
    'Bomonti Filtresiz': 'İstanbul\'un efsanesi, buğday aromalı.',
    'Tuborg': 'Danimarka\'dan gelen serinlik.',
    'Corona': 'Meksika esintisi, misket limonu ile.',
    'Heineken': 'Hollanda\'nın klasiği, premium lezzet.',
    
    // ALKOLLER - CİN & VODKa
    'Bombay Sapphire': 'Botanik aromalar, dengeli ve zarif.',
    'Tanqueray': 'İngiliz zarafeti, ardıç aroması.',
    'Absolut Vodka': 'İsveç\'ten gelen saflık, yumuşak içim.',
    'Grey Goose': 'Fransız lüksü, kadife yumuşaklığı.',
    
    // APERATİFLER
    'Çıtır Leblebi': 'Nohutun çıtırlığı, tuzsuz ya da tuzlu.',
    'Badem': 'Kavrulmuş badem, doğal lezzet.',
    'Fıstık': 'Antep fıstığı, tuzlu ya da kavruk.',
    'Ceviz İçi': 'Taze ceviz, omega zenginliği.',
    'Çekirdek': 'Ay çekirdeği, sofranın vazgeçılmezi.',
    
    // MEYVELER
    'Mevsim Meyveleri': 'Taze kesilmiş mevsim meyveleri tabağı.',
    'Karpuz': 'Yazın serinliği, tatlı ve sulu.',
    'Kavun': 'Bal gibi tatlı, serinletici.',
    
    // SPESYALLER
    'Mute Özel Kebap': 'Ustamızın imzası, özel baharat harmanı.',
    'Şef Önerisi': 'Günün özel menüsü, şefin yaratıcılığı.',
    'Ocakbaşı Karışık': 'Közün bütün lezzetleri bir arada.',
  }

  // Return predefined description or generate a generic one
  return descriptions[dishName] || `${dishName} - Ustalarımızın özenle hazırladığı, damağınızda iz bırakacak bir lezzet.`
}

