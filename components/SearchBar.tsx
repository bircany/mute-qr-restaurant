'use client'

import { useState } from 'react'
import { MenuItem } from '@/lib/googleSheets'

interface SearchBarProps {
  items: MenuItem[]
  onSelectItem: (item: MenuItem) => void
}

export default function SearchBar({ items, onSelectItem }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)

  const filteredItems = searchQuery.length >= 2
    ? items.filter(item =>
        item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.subCategory && item.subCategory.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 8) // Max 8 sonuç göster
    : []

  const handleSelect = (item: MenuItem) => {
    onSelectItem(item)
    setSearchQuery('')
    setShowResults(false)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-12">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-copper-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setShowResults(true)
          }}
          onFocus={() => setShowResults(true)}
          placeholder="Menüde ara... (Örn: Yeni Rakı, Adana Kebap)"
          className="w-full pl-12 pr-4 py-4 bg-zinc-900/50 border-2 border-copper-900/30 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-copper-600/50 transition-colors"
        />

        {/* Clear Button */}
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('')
              setShowResults(false)
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-copper-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && filteredItems.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border-2 border-copper-900/30 rounded-2xl shadow-2xl shadow-copper-900/20 max-h-96 overflow-y-auto z-50">
          {filteredItems.map((item, index) => (
            <button
              key={`${item.productName}-${index}`}
              onClick={() => handleSelect(item)}
              className="w-full px-6 py-4 text-left hover:bg-copper-900/20 transition-colors border-b border-copper-900/20 last:border-b-0 group"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="text-copper-200 font-semibold group-hover:text-copper-100 transition-colors">
                    {item.productName}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {item.category}
                    {item.subCategory && ` • ${item.subCategory}`}
                  </p>
                </div>
                <span className="text-copper-400 font-bold whitespace-nowrap">
                  {item.productPrice}₺
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {showResults && searchQuery.length >= 2 && filteredItems.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border-2 border-copper-900/30 rounded-2xl shadow-2xl shadow-copper-900/20 p-6 text-center z-50">
          <p className="text-gray-400">
            &ldquo;{searchQuery}&rdquo; için sonuç bulunamadı
          </p>
        </div>
      )}

      {/* Click outside to close */}
      {showResults && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  )
}

