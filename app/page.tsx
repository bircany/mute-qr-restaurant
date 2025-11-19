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
    </>
  )
}

