'use client';

import Image from 'next/image';
import { CATEGORY_META, CategoryKey, getCategoryLabel } from '@/lib/categories';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryStripProps {
  selectedCategory: CategoryKey | null;
  onCategoryChange: (category: CategoryKey | null) => void;
}

export function CategoryStrip({ selectedCategory, onCategoryChange }: CategoryStripProps) {
  const { language } = useLanguage();

  return (
    <section className="w-full bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {Object.keys(CATEGORY_META).map((key) => {
            const categoryKey = key as CategoryKey;
            const meta = CATEGORY_META[categoryKey];
            const active = selectedCategory === key;
            return (
              <button
                key={categoryKey}
                onClick={() => onCategoryChange(active ? null : categoryKey)}
                aria-pressed={active}
                className={cn(
                  'relative h-[140px] md:h-[180px] w-full rounded-2xl shadow-sm ring-1 ring-gray-200 overflow-hidden transition-all hover:ring-gray-300',
                  active && 'ring-2 ring-primary shadow-lg'
                )}
              >
                <Image 
                  src={meta.image} 
                  alt={getCategoryLabel(categoryKey, language)} 
                  fill 
                  className="object-cover" 
                  unoptimized
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const fallbacks = {
                      beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
                      sports: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
                      baby: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                      mobility: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop'
                    };
                    target.src = fallbacks[key.toLowerCase() as keyof typeof fallbacks] || fallbacks.beach;
                  }}
                />
                <span className="absolute bottom-2 left-2 rounded-md bg-white/85 px-2 py-1 text-sm md:text-base font-semibold">
                  {getCategoryLabel(categoryKey, language)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}