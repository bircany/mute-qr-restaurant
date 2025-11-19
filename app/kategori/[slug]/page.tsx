'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MenuSection from '@/components/MenuSection'
import { fetchMenuData, MenuItem } from '@/lib/googleSheets'

// Kategori bilgileri - Google Sheets'teki kategorilere göre güncellendi
const categoryInfo: Record<string, { title: string; description: string; icon: string }> = {
  'sicak-mezeler': { title: 'Sıcak Mezeler', description: 'Sıcak mezeler ve lezzetler', icon: 'flame' },
  'soguk-mezeler': { title: 'Soğuk Mezeler', description: 'Soğuk mezeler ve lezzetler', icon: 'dish' },
  'ana-yemekler': { title: 'Ana Yemekler', description: 'Közden gelen lezzetler', icon: 'meat' },
  'salatalar': { title: 'Salatalar', description: 'Taze ve sağlıklı', icon: 'salad' },
}

// Slug'dan kategori başlığına dönüştürme fonksiyonu
function getCategoryTitleFromSlug(slug: string, menuItems: MenuItem[]): string | null {
  // Önce sabit listede ara
  if (categoryInfo[slug]) {
    return categoryInfo[slug].title
  }
  
  // Eğer bulunamazsa, menuItems'tan kategori başlığını bul
  const allCategories = Array.from(new Set(menuItems.map(item => item.category).filter(Boolean)))
  const category = allCategories.find(cat => {
    const categorySlug = cat
      .toLowerCase()
      .replace(/ş/g, 's')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ö/g, 'o')
      .replace(/ı/g, 'i')
      .replace(/ç/g, 'c')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
    return categorySlug === slug
  })
  
  return category || null
}

export default function CategoryPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string
  const highlight = searchParams.get('highlight')
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [allMenuItems, setAllMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryTitle, setCategoryTitle] = useState<string | null>(null)

  useEffect(() => {
    async function loadMenu() {
      try {
        const data = await fetchMenuData()
        setAllMenuItems(data)
        
        // Önce categoryInfo'dan kontrol et (daha hızlı)
        let title: string | null = null
        if (categoryInfo[slug]) {
          title = categoryInfo[slug].title
        } else {
          // Eğer categoryInfo'da yoksa, menuItems'tan bul
          title = getCategoryTitleFromSlug(slug, data)
        }
        
        setCategoryTitle(title)
        
        if (title) {
          setMenuItems(data.filter(item => item.category === title))
        }
      } catch (error) {
        console.error('Error loading menu:', error)
      } finally {
        setLoading(false)
      }
    }
    loadMenu()
  }, [slug])

  // Kategori bilgisini oluştur
  const category = categoryTitle ? (categoryInfo[slug] || {
    title: categoryTitle,
    description: `${categoryTitle} kategorisindeki lezzetler`,
    icon: 'dish'
  }) : null

  // Highlight özelliği varsa scroll et
  useEffect(() => {
    if (highlight && !loading) {
      setTimeout(() => {
        const itemId = `item-${highlight.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`
        const element = document.getElementById(itemId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          element.classList.add('ring-4', 'ring-copper-500/50')
          setTimeout(() => {
            element.classList.remove('ring-4', 'ring-copper-500/50')
          }, 2000)
        }
      }, 500)
    }
  }, [highlight, loading])

  // Önce loading kontrolü yap - yükleme sırasında kategori kontrolü yapma
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-copper-500 border-r-transparent mb-4"></div>
          <p className="text-copper-300 font-playfair text-xl">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  // Yükleme tamamlandıktan sonra kategori kontrolü yap
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-playfair text-copper-300 mb-4">Kategori Bulunamadı</h1>
          <Link href="/" className="text-copper-400 hover:text-copper-300 underline">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-copper-400 hover:text-copper-300 transition-colors mb-8 group"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Kategorilere Dön</span>
        </Link>

        {/* Category Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-copper-glow opacity-50 blur-3xl"></div>
          <div className="w-20 h-20 mx-auto mb-4 relative brightness-200 invert opacity-90">
            <Image
              src={`/products/icons/${category.icon}.png`}
              alt={category.title}
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-playfair text-copper-300 mb-4 relative z-10 glow-copper">
            {category.title}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto relative z-10">
            {category.description}
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-copper-600"></div>
            <div className="w-2 h-2 rounded-full bg-copper-500"></div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-copper-600"></div>
          </div>
        </div>

        {/* Menu Items */}
        {menuItems.length > 0 ? (
          <MenuSection title="" items={menuItems} />
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400">Bu kategoride henüz ürün bulunmamaktadır.</p>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}

