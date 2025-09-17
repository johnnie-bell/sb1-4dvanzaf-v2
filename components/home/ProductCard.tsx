import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Item } from '@/lib/types';
import { getCategoryLabel } from '@/lib/categories';
import { euro0, perWeek } from '@/lib/pricing';
import ProductQuickView from '@/components/product/ProductQuickView';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductCardProps {
  item: Item;
  deliveryDate: Date | null;
  weeks: number;
  collectionDate: Date | null;
}

export function ProductCard({ item, deliveryDate, weeks, collectionDate }: ProductCardProps) {
  const { language, t } = useLanguage();
  const weeklyPrice = perWeek(item.pricePerDay);
  const categoryLabel = getCategoryLabel(item.category, language);

  return (
    <ProductQuickView item={item} deliveryDate={deliveryDate} weeks={weeks} collectionDate={collectionDate}>
      <div className="block text-left w-full bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative aspect-[4/3]">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="text-xs">
              {categoryLabel}
            </Badge>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {item.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-primary">
                {euro0(weeklyPrice)}
              </div>
              <div className="text-sm text-gray-500">{t('perWeek')}</div>
            </div>
          </div>
          
          <div className="mt-2 w-full inline-flex items-center justify-center rounded-lg bg-primary text-white px-3 py-2 text-sm font-medium hover:bg-primary/90 transition-colors">
            {t('addToCart')}
          </div>
        </div>
      </div>
    </ProductQuickView>
  );
}