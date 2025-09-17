'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { euro0 } from '@/lib/pricing'
import { Trash2 } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CartDrawer({ trigger }: { trigger: React.ReactNode }) {
  const { items, setQty, remove, subtotal } = useCart()
  const { t } = useLanguage()

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="right" className="w-[380px] sm:w-[420px] flex flex-col">
        <SheetHeader>
          <SheetTitle>{t('cart')} ({items.length})</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 mt-4 space-y-4 overflow-auto pr-2">
          {items.length === 0 && (
            <div className="text-center py-8">
              <div className="text-muted-foreground">{t('cartEmpty')}</div>
              <div className="text-sm text-muted-foreground mt-1">{t('addItemsToStart')}</div>
            </div>
          )}
          
          {items.map((it) => (
            <div key={`${it.id}-${it.deliveryDate}-${it.collectionDate}`} className="flex gap-3 p-3 border rounded-lg">
              <div className="relative h-16 w-20 rounded overflow-hidden flex-shrink-0">
                <Image src={it.imageUrl} alt={it.name} fill className="object-cover" unoptimized />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm line-clamp-2">{it.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {it.deliveryDate} → {it.collectionDate}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <button
                      className="h-7 w-7 border rounded hover:bg-muted flex items-center justify-center"
                      onClick={() => setQty(it.id, it.qty - 1)}
                    >
                      −
                    </button>
                    <div className="w-8 text-center text-sm">{it.qty}</div>
                    <button
                      className="h-7 w-7 border rounded hover:bg-muted flex items-center justify-center"
                      onClick={() => setQty(it.id, it.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 p-1"
                    onClick={() => remove(it.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-semibold text-sm">{euro0(it.weeklyPrice * it.qty)}</div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <>
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="font-medium">{t('subtotal')}</div>
                <div className="text-xl font-semibold">{euro0(subtotal)}</div>
              </div>
            </div>
            <SheetFooter>
              <Link href="/checkout" className="w-full">
                <Button className="w-full" size="lg">
                  {t('checkout')}
                </Button>
              </Link>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}