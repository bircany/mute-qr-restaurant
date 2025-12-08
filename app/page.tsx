'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SearchBar from '@/components/SearchBar'
import CategoryCard from '@/components/CategoryCard'
import { fetchMenuData, MenuItem } from '@/lib/googleSheets'
import { useRouter } from 'next/navigation'

// Kategori bilgileri - Google Sheets'teki kategorilere göre güncellendi
const categoryInfo = [
  { title: 'Sıcak Mezeler', slug: 'sicak-mezeler', description: 'Sıcak mezeler ve lezzetler', icon: 'flame' },
  { title: 'Soğuk Mezeler', slug: 'soguk-mezeler', description: 'Soğuk mezeler ve lezzetler', icon: 'dish' },
  { title: 'Ana Yemekler', slug: 'ana-yemekler', description: 'Közden gelen lezzetler', icon: 'meat' },
  { title: 'Salatalar', slug: 'salatalar', description: 'Taze ve sağlıklı', icon: 'salad' },
]

// Kategori başlığından slug oluşturma fonksiyonu
function getCategorySlug(categoryTitle: string): string {
  const category = categoryInfo.find(c => c.title === categoryTitle)
  if (category) return category.slug
  
  // Eğer kategori listede yoksa, otomatik slug oluştur
  return categoryTitle
    .toLowerCase()
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ı/g, 'i')
    .replace(/ç/g, 'c')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadMenu() {
      try {
        const data = await fetchMenuData()
        setMenuItems(data)
      } catch (error) {
        console.error('Error loading menu:', error)
      } finally {
        setLoading(false)
      }
    }
    loadMenu()
  }, [])

  const getItemsByCategory = (category: string) => {
    return menuItems.filter(item => item.category === category)
  }

  // Arama sonucu seçildiğinde kategori sayfasına git
  const handleSelectItem = (item: MenuItem) => {
    const categorySlug = getCategorySlug(item.category)
    if (categorySlug) {
      router.push(`/kategori/${categorySlug}?highlight=${encodeURIComponent(item.productName)}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-copper-500 border-r-transparent mb-4"></div>
          <p className="text-copper-300 font-playfair text-xl">Menümüz hazırlanıyor...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-copper-glow opacity-50 blur-3xl"></div>
          <h2 className="text-2xl md:text-3xl font-playfair text-copper-300 mb-4 relative z-10">
            Ateşin Sıcaklığı, Lezzetin Zarafeti
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto relative z-10">
            Közün kalbinden gelen lezzetler, modern dokunuşlarla buluşuyor. 
            Her tabak, bir hikaye anlatır.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar items={menuItems} onSelectItem={handleSelectItem} />

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {(() => {
            // Google Sheets'ten gelen kategorileri dinamik olarak göster
            const categoriesFromData = Array.from(new Set(menuItems.map(item => item.category).filter(Boolean)))
            
            return categoriesFromData.map(categoryTitle => {
              const items = getItemsByCategory(categoryTitle)
              if (items.length === 0) return null
              
              // Kategori bilgisini bul veya varsayılan değerler kullan
              const category = categoryInfo.find(c => c.title === categoryTitle) || {
                title: categoryTitle,
                slug: getCategorySlug(categoryTitle),
                description: `${categoryTitle} kategorisindeki lezzetler`,
                icon: 'dish' // Varsayılan icon
              }
              
              return (
                <CategoryCard
                  key={category.slug}
                  title={category.title}
                  description={category.description}
                  itemCount={items.length}
                  slug={category.slug}
                  icon={category.icon}
                />
              )
            })
          })()}
        </div>
      </main>

      <Footer />
      
      {/* Fixed Reservation Button - Mobile Friendly */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-50 bg-gradient-to-t from-black via-black/90 to-transparent pb-6 pt-10 pointer-events-none">
        <a 
          href="https://wa.me/905347665616" 
          target="_blank" 
          rel="noopener noreferrer"
          className="pointer-events-auto block w-full max-w-md mx-auto bg-copper-900 border border-copper-500/30 text-copper-100 rounded-xl px-6 py-4 shadow-xl shadow-black/50 backdrop-blur-md transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-green-900/30 animate-pulse">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs text-copper-400 font-sans tracking-wider uppercase">Özel Günler İçin</span>
              <span className="text-lg font-playfair font-semibold tracking-wide">İleri Tarihli Rezervasyon</span>
            </div>
            <div className="ml-auto">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-copper-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </div>
        </a>
      </div>
    </>
  )
}

