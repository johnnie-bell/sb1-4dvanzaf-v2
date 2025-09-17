'use client'

import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useState } from 'react'
import { Calendar } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { addDays, format, formatISO } from 'date-fns'
import { useCart } from '@/contexts/CartContext'
import { euro0, perWeek } from '@/lib/pricing'
import { Badge } from '@/components/ui/badge'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { getCategoryLabel } from '@/lib/categories'
import { useLanguage } from '@/contexts/LanguageContext'

const sod = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const today = sod(new Date());
const minDelivery = addDays(today, 1);
const disablePast = (d: Date): boolean => sod(d) < minDelivery;

export default function ProductQuickView({
  item,
  deliveryDate,
  weeks,
  collectionDate,
  children,
}: {
  item: any
  deliveryDate: Date | null
  weeks: number
  collectionDate: Date | null
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [dLocal, setDLocal] = useState<Date | null>(deliveryDate ?? null);
  const [weeksLocal, setWeeksLocal] = useState<number>(weeks);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false)
  const { add } = useCart()
  const { language, t } = useLanguage()
  const weekly = perWeek(item.pricePerDay)
  
  // Auto-calculate collection date
  const cLocal = dLocal ? addDays(dLocal, weeksLocal * 7) : null;
  
  const dStr = dLocal ? formatISO(dLocal, { representation: 'date' }) : '';
  const cStr = cLocal ? formatISO(cLocal, { representation: 'date' }) : '';
  const canAdd = !!dStr && !!cStr;
  const categoryLabel = getCategoryLabel(item.category, language)

  const handleAdd = () => {
    if (!canAdd) return
    add({
      id: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
      category: item.category,
      pricePerDay: item.pricePerDay,
      weeklyPrice: weekly,
      qty: weeksLocal,
      deliveryDate: dStr,
      collectionDate: cStr,
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl z-[80]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{item.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-64 sm:h-72 md:h-auto md:aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
            <Image src={item.imageUrl} alt={item.name} fill className="object-cover" unoptimized />
          </div>
          <div className="space-y-4">
            <Badge variant="secondary" className="text-xs">
              {categoryLabel}
            </Badge>
            <div className="space-y-1">
              <div className="text-3xl font-semibold">{euro0(weekly * weeksLocal)}</div>
              
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">{t('rentalDates')}</h4>
              <div className="space-y-3">
                {/* Delivery Date */}
                <Popover open={isDeliveryOpen} onOpenChange={setIsDeliveryOpen}>
                  <PopoverTrigger asChild>
                    <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm bg-white hover:bg-gray-50 transition-colors">
                      <Calendar className="h-4 w-4" />
                      {dLocal 
                        ? format(dLocal, 'dd MMM yyyy')
                        : t('deliveryDate')
                      }
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="z-[90] pointer-events-auto p-3 rounded-xl shadow-lg border bg-white w-auto">
                    <DayPicker
                      mode="single"
                      selected={dLocal ?? undefined}
                      onSelect={(d) => {
                        setDLocal(d ?? null);
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
                  <span className="text-sm font-medium">{t('weeks')}:</span>
                  <ToggleGroup
                    type="single"
                    value={weeksLocal.toString()}
                    onValueChange={(value) => {
                      if (value) setWeeksLocal(parseInt(value));
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
                  {t('collection')}: {cLocal ? format(cLocal, 'dd MMM yyyy') : '—'}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">{t('perfectForHoliday')}</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>{t('highQuality')}</li>
                <li>{t('flexiblePricing')}</li>
                <li>{t('easyDelivery')}</li>
                <li>{t('fullyCleaned')}</li>
              </ul>
            </div>
            {!canAdd && (
              <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                {t('selectDeliveryDate')}
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t('cancel')}
          </Button>
          <Button disabled={!canAdd} onClick={handleAdd}>
            {t('addToCart')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}