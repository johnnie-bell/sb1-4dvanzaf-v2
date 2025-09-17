'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { DayPicker } from 'react-day-picker';
import { euro0 } from '@/lib/pricing';
import { addDays, format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';

const sod = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const today = sod(new Date());
const minDelivery = addDays(today, 1);
const disablePast = (d: Date): boolean => sod(d) < minDelivery;

interface FilterBarProps {
  deliveryDate: Date | null;
  weeks: number;
  collectionDate: Date | null;
  onDeliveryChange: (d: Date | null) => void;
  onWeeksChange: (w: number) => void;
  priceMin: number;
  priceMax: number;
  globalMin: number;
  globalMax: number;
  onPriceChange: (min: number, max: number) => void;
}

export function FilterBar({
  deliveryDate,
  weeks,
  collectionDate,
  onDeliveryChange,
  onWeeksChange,
  priceMin,
  priceMax,
  globalMin,
  globalMax,
  onPriceChange,
}: FilterBarProps) {
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-3">
        <div className="grid items-center gap-4 grid-cols-1 md:grid-cols-[auto_1fr]">
          {/* LEFT: delivery date + weeks + collection */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Delivery Date */}
            <Popover open={isDeliveryOpen} onOpenChange={setIsDeliveryOpen}>
              <PopoverTrigger asChild>
                <button className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 shadow-sm bg-white hover:bg-gray-50 transition-colors">
                  <Calendar className="h-4 w-4" />
                  {deliveryDate 
                    ? format(deliveryDate, 'dd MMM yyyy')
                    : t('deliveryDate')
                  }
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className="z-[90] pointer-events-auto p-3 rounded-xl shadow-lg border bg-white w-auto">
                <DayPicker
                  mode="single"
                  selected={deliveryDate ?? undefined}
                  onSelect={(d) => {
                    onDeliveryChange(d ?? null);
                    if (d) setIsDeliveryOpen(false);
                  }}
                  numberOfMonths={1}
                  disabled={disablePast}
                  showOutsideDays
                  weekStartsOn={1}
                  captionLayout="buttons"
                />
              </PopoverContent>
            </Popover>

            {/* Weeks Selection */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{t('weeks')}:</span>
              <ToggleGroup
                type="single"
                value={weeks.toString()}
                onValueChange={(value) => {
                  if (value) onWeeksChange(parseInt(value));
                }}
                className="gap-1"
              >
                {[1, 2, 3, 4].map((w) => (
                  <ToggleGroupItem
                    key={w}
                    value={w.toString()}
                    className="h-8 w-8 text-sm"
                  >
                    {w}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            {/* Collection Date (Read-only) */}
            <div className="text-sm text-muted-foreground">
              {t('collection')}: {collectionDate ? format(collectionDate, 'dd MMM yyyy') : '—'}
            </div>
          </div>

          {/* RIGHT: Price / week slider */}
          <div className="justify-self-start md:justify-self-end w-full md:w-auto">
            <div className="w-full md:w-[560px]">
              <label className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>{t('pricePerWeek')}</span>
                <span>{euro0(priceMin)} — {euro0(priceMax)}</span>
              </label>
              <Slider
                value={[priceMin, priceMax]}
                min={globalMin}
                max={globalMax}
                step={100}
                onValueChange={([min, max]) => onPriceChange(min, max)}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}