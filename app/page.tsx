'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { addDays, formatISO } from 'date-fns';
import { Hero } from '@/components/home/Hero';
import { CategoryStrip } from '@/components/home/CategoryStrip';
import { FilterBar } from '@/components/home/FilterBar';
import { ProductCard } from '@/components/home/ProductCard';
import { Header } from '@/components/layout/Header';
import { Badge } from '@/components/ui/badge';
import { Item } from '@/lib/types';
import { CategoryKey } from '@/lib/categories';
import { perWeek } from '@/lib/pricing';
import { useCart } from '@/components/cart/CartProvider';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const searchParams = useSearchParams();
  const { addItem } = useCart();
  const { t } = useLanguage();
  
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [weeks, setWeeks] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(50000);
  const [globalMin, setGlobalMin] = useState(0);
  const [globalMax, setGlobalMax] = useState(50000);

  // Auto-calculate collection date
  const collectionDate = useMemo(() => 
    deliveryDate ? addDays(deliveryDate, weeks * 7) : null, 
    [deliveryDate, weeks]
  );

  // Initialize from URL params
  useEffect(() => {
    const from = searchParams.get('from');
    const weeksParam = searchParams.get('weeks');
    const cat = searchParams.get('cat') as CategoryKey;
    
    if (from) {
      setDeliveryDate(new Date(from));
    }
    
    if (weeksParam) {
      const w = parseInt(weeksParam);
      if (w >= 1 && w <= 4) {
        setWeeks(w);
      }
    }
    
    if (cat && ['BEACH', 'SPORTS', 'BABY', 'MOBILITY'].includes(cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Load items
  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await fetch('/api/items');
        const data = await response.json();
        setItems(data);
        
        // Calculate price bounds
        const weeklyPrices = data.map((item: Item) => perWeek(item.pricePerDay));
        const min = Math.min(...weeklyPrices);
        const max = Math.max(...weeklyPrices);
        
        setGlobalMin(min);
        setGlobalMax(max);
        setPriceMin(min);
        setPriceMax(max);
      } catch (error) {
        console.error('Failed to load items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  // Filter items
  const visibleItems = items.filter(item => {
    const weeklyPrice = perWeek(item.pricePerDay);
    const okCategory = !selectedCategory || item.category === selectedCategory;
    const okPrice = weeklyPrice >= priceMin && weeklyPrice <= priceMax;
    return okCategory && okPrice;
  });

  const handleAddItem = (item: Item) => {
    const dStr = deliveryDate ? formatISO(deliveryDate, { representation: 'date' }) : '';
    const cStr = collectionDate ? formatISO(collectionDate, { representation: 'date' }) : '';
    if (!dStr || !cStr) return;

    addItem({
      id: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
      category: item.category,
      pricePerDay: item.pricePerDay,
      weeklyPrice: perWeek(item.pricePerDay),
      qty: weeks,
      deliveryDate: dStr,
      collectionDate: cStr,
    });
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceMin(min);
    setPriceMax(max);
  };

  // Check for agent referral
  const agentId = searchParams.get('agent');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      
      <CategoryStrip
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      {agentId && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Referred by Agent {agentId}
          </Badge>
        </div>
      )}
      
      <FilterBar
        deliveryDate={deliveryDate}
        weeks={weeks}
        collectionDate={collectionDate}
        onDeliveryChange={setDeliveryDate}
        onWeeksChange={setWeeks}
        priceMin={priceMin}
        priceMax={priceMax}
        globalMin={globalMin}
        globalMax={globalMax}
        onPriceChange={handlePriceChange}
      />

      <main className="mx-auto max-w-7xl px-4 md:px-6 py-8">
        <section id="browse">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {t('availableItems')}
            </h2>
            <span className="text-sm text-gray-500">
              {visibleItems.length} {t('itemsFound')}
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-gray-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {visibleItems.map(item => (
                <ProductCard
                  key={item.id}
                  item={item}
                  deliveryDate={deliveryDate}
                  weeks={weeks}
                  collectionDate={collectionDate}
                />
              ))}
            </div>
          )}

          {!loading && visibleItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{t('noItemsFound')}</p>
              <p className="text-gray-400 text-sm mt-2">{t('tryAdjustingFilters')}</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}