'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MenuSection from '@/components/MenuSection'
import { fetchMenuData, MenuItem } from '@/lib/googleSheets'

// Kategori bilgileri
const categoryInfo: Record<string, { title: string; description: string; icon: string }> = {
  'baslangiclar': { title: 'Başlangıçlar', description: 'Sıcak çorbalar ile başlayın', icon: 'soup' },
  'mezeler': { title: 'Mezeler', description: 'Soğuk mezeler ve lezzetler', icon: 'dish' },
  'ara-sicaklar': { title: 'Ara Sıcaklar', description: 'Sıcak atıştırmalıklar', icon: 'flame' },
  'salatalar': { title: 'Salatalar', description: 'Taze ve sağlıklı', icon: 'salad' },
  'ana-yemekler': { title: 'Ana Yemekler', description: 'Közden gelen lezzetler', icon: 'meat' },
  'spesyaller': { title: 'Spesyaller', description: 'Özel tariflerimiz', icon: 'star' },
  'tatlilar': { title: 'Tatlılar', description: 'Geleneksel tatlılar', icon: 'cake' },
  'icecekler': { title: 'İçecekler', description: 'Sıcak ve soğuk içecekler', icon: 'coffee' },
  'alkoller': { title: 'Alkoller', description: 'Rakı, şarap, bira ve daha fazlası', icon: 'wine' },
  'aperatifler': { title: 'Aperatifler', description: 'Kuruyemiş çeşitleri', icon: 'nuts' },
  'meyveler': { title: 'Meyveler', description: 'Taze mevsim meyveleri', icon: 'fruit' },
}

export default function CategoryPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string
  const highlight = searchParams.get('highlight')
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  const category = categoryInfo[slug]

  useEffect(() => {
    async function loadMenu() {
      try {
        const data = await fetchMenuData()
        setMenuItems(data.filter(item => item.category === category?.title))
      } catch (error) {
        console.error('Error loading menu:', error)
      } finally {
        setLoading(false)
      }
    }
    if (category) {
      loadMenu()
    }
  }, [category])

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

