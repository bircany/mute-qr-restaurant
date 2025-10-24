'use client'

import Link from 'next/link'
import Image from 'next/image'

interface CategoryCardProps {
  title: string
  description: string
  itemCount: number
  slug: string
  icon: string
}

export default function CategoryCard({ 
  title, 
  description, 
  itemCount, 
  slug,
  icon
}: CategoryCardProps) {
  return (
    <Link href={`/kategori/${slug}`}>
      <div className="group relative h-72 rounded-3xl overflow-hidden border-2 border-copper-900/30 hover:border-copper-600/60 transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-copper-900/40">
        {/* Background - Sabit Copper Renk */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/90 to-zinc-800/90"></div>
        
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-copper-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-8">
          {/* Icon & Title */}
          <div>
            <div className="w-16 h-16 mb-4 relative opacity-80 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300 brightness-200 invert">
              <Image
                src={`/products/icons/${icon}.png`}
                alt={title}
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-3xl font-playfair font-bold text-white mb-2 group-hover:text-copper-200 transition-colors">
              {title}
            </h3>
            <p className="text-copper-200 text-sm font-light">
              {description}
            </p>
          </div>

          {/* Item Count & Arrow */}
          <div className="flex items-center justify-between">
            <span className="text-copper-300 font-semibold">
              {itemCount} Ürün
            </span>
            <div className="w-10 h-10 rounded-full bg-copper-600/30 flex items-center justify-center group-hover:bg-copper-500 transition-colors">
              <svg className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-copper-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </Link>
  )
}

