import { MenuItem as MenuItemType } from '@/lib/googleSheets'
import MenuItem from './MenuItem'

interface MenuSectionProps {
  title: string
  items: MenuItemType[]
}

export default function MenuSection({ title, items }: MenuSectionProps) {
  // Alt kategorilere göre grupla (varsa)
  const subCategories = Array.from(new Set(items.map(item => item.subCategory).filter(Boolean))) as string[]
  const hasSubCategories = subCategories.length > 0

  // Alt kategorisi olmayanları grupla
  const itemsWithoutSubCategory = items.filter(item => !item.subCategory)

  return (
    <section className="menu-section" id={title.toLowerCase().replace(/\s+/g, '-')}>
      {/* Section Title */}
      {title && (
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair text-copper-300 mb-3 glow-copper">
            {title}
          </h2>
          
          {/* Decorative underline */}
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-copper-600"></div>
            <div className="w-2 h-2 rounded-full bg-copper-500"></div>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-copper-600"></div>
          </div>
        </div>
      )}

      {/* Items without subcategory */}
      {itemsWithoutSubCategory.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {itemsWithoutSubCategory.map((item, index) => (
            <MenuItem key={`${item.productName}-${index}`} item={item} />
          ))}
        </div>
      )}

      {/* Items grouped by subcategory */}
      {hasSubCategories && (
        <div className="space-y-12">
          {subCategories.map(subCategory => {
            const subCategoryItems = items.filter(item => item.subCategory === subCategory)
            
            return (
              <div key={subCategory}>
                {/* Subcategory Title */}
                <h3 className="text-2xl md:text-3xl font-playfair text-copper-400 mb-6 text-center">
                  {subCategory}
                </h3>
                
                {/* Subcategory Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {subCategoryItems.map((item, index) => (
                    <MenuItem key={`${item.productName}-${index}`} item={item} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

