'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SearchBar from '@/components/SearchBar'
import CategoryCard from '@/components/CategoryCard'
import { fetchMenuData, MenuItem } from '@/lib/googleSheets'
import { useRouter } from 'next/navigation'

// Kategori bilgileri
const categoryInfo = [
  { title: 'Başlangıçlar', slug: 'baslangiclar', description: 'Sıcak çorbalar ile başlayın', icon: 'soup' },
  { title: 'Mezeler', slug: 'mezeler', description: 'Soğuk mezeler ve lezzetler', icon: 'dish' },
  { title: 'Ara Sıcaklar', slug: 'ara-sicaklar', description: 'Sıcak atıştırmalıklar', icon: 'flame' },
  { title: 'Salatalar', slug: 'salatalar', description: 'Taze ve sağlıklı', icon: 'salad' },
  { title: 'Ana Yemekler', slug: 'ana-yemekler', description: 'Közden gelen lezzetler', icon: 'meat' },
  { title: 'Spesyaller', slug: 'spesyaller', description: 'Özel tariflerimiz', icon: 'star' },
  { title: 'Tatlılar', slug: 'tatlilar', description: 'Geleneksel tatlılar', icon: 'cake' },
  { title: 'İçecekler', slug: 'icecekler', description: 'Sıcak ve soğuk içecekler', icon: 'coffee' },
  { title: 'Alkoller', slug: 'alkoller', description: 'Rakı, şarap, bira ve daha fazlası', icon: 'wine' },
  { title: 'Aperatifler', slug: 'aperatifler', description: 'Kuruyemiş çeşitleri', icon: 'nuts' },
  { title: 'Meyveler', slug: 'meyveler', description: 'Taze mevsim meyveleri', icon: 'fruit' },
]

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
    const categorySlug = categoryInfo.find(c => c.title === item.category)?.slug
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
          {categoryInfo.map(category => {
            const items = getItemsByCategory(category.title)
            if (items.length === 0) return null
            
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
          })}
        </div>
      </main>

      <Footer />
    </>
  )
}

