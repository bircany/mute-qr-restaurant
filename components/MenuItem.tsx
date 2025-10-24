'use client'

import Image from 'next/image'
import { MenuItem as MenuItemType } from '@/lib/googleSheets'
import { useState } from 'react'

interface MenuItemProps {
  item: MenuItemType
}

export default function MenuItem({ item }: MenuItemProps) {
  const [imageError, setImageError] = useState(false)
  
  // Ürün adından benzersiz ID oluştur (arama için)
  const itemId = `item-${item.productName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`
  
  return (
    <div 
      id={itemId}
      className="group relative bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 rounded-2xl overflow-hidden border border-copper-900/30 hover:border-copper-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-copper-900/30 card-glow hover:scale-[1.02] scroll-mt-24"
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-copper-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative flex gap-4 p-5 md:p-6">
        {/* Product Image */}
        <div className="relative flex-shrink-0">
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden border-2 border-copper-900/40 group-hover:border-copper-600/60 transition-colors duration-300">
            {!imageError && item.productImage ? (
              <Image
                src={item.productImage}
                alt={item.productName}
                fill
                sizes="(max-width: 768px) 96px, 112px"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                onError={() => setImageError(true)}
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-copper-900/20 to-zinc-900/40 flex items-center justify-center">
                <svg className="w-12 h-12 text-copper-800/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Smoke/Steam effect decoration */}
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-copper-500/60 blur-sm animate-pulse"></div>
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          {/* Name and Price */}
          <div className="flex justify-between items-start gap-3 mb-2">
            <h3 className="text-lg md:text-xl font-playfair font-semibold text-copper-200 group-hover:text-copper-100 transition-colors flex-1">
              {item.productName}
            </h3>
            
            <span className="text-lg md:text-xl font-bold text-copper-400 whitespace-nowrap flex-shrink-0">
              {item.productPrice}₺
            </span>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-gray-400 leading-relaxed italic group-hover:text-gray-300 transition-colors line-clamp-3">
            {item.productDescription}
          </p>
        </div>
      </div>

      {/* Bottom gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-copper-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  )
}

