'use client'

import { useCart } from '@/contexts/CartContext'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { euro0 } from '@/lib/pricing'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Header } from '@/components/layout/Header'

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart()
  const router = useRouter()
  const [agreed, setAgreed] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) return
    clear()
    router.push('/confirmation')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="mx-auto max-w-4xl px-4 md:px-6 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some items to your cart before checking out.</p>
          <Button onClick={() => router.push('/')}>Continue browsing</Button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-4xl px-4 md:px-6 py-8">
        <form onSubmit={handleSubmit} className="grid gap-8 md:grid-cols-[2fr_1fr]">
          <section className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Checkout</h1>
              <p className="text-sm text-muted-foreground">Demo only — no real payment will be taken.</p>
            </div>

            <div className="space-y-4 bg-white p-6 rounded-lg border">
              <h2 className="text-lg font-semibold">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Full name</label>
                  <Input id="name" placeholder="Alex Holiday" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <Input id="email" type="email" placeholder="alex@example.com" required />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                    <Input id="phone" placeholder="+353..." required />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-white p-6 rounded-lg border">
              <h2 className="text-lg font-semibold">Delivery Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Delivery method</label>
                  <Select defaultValue="delivery">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delivery">Delivery (Free)</SelectItem>
                      <SelectItem value="pickup">Pickup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium mb-1">Delivery address</label>
                  <Input placeholder="Address line 1" />
                  <Input placeholder="Address line 2 (optional)" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Input placeholder="City" />
                    <Input placeholder="County" />
                    <Input placeholder="Eircode" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked === true)}
                />
                <label htmlFor="terms" className="text-sm leading-relaxed">
                  I agree to the demo terms and conditions. This is a demonstration checkout - no real payment will be processed.
                </label>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="bg-white rounded-lg border p-6 sticky top-24">
              <h2 className="font-semibold mb-4">Order summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.deliveryDate}-${item.collectionDate}`} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-muted-foreground text-xs">
                        Qty: {item.qty} • {item.deliveryDate} → {item.collectionDate}
                      </div>
                    </div>
                    <div className="font-medium">{euro0(item.weeklyPrice * item.qty)}</div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-semibold text-lg">{euro0(subtotal)}</span>
                </div>
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={!agreed}>
                Complete demo booking
              </Button>
            </div>
          </aside>
        </form>
      </main>
      <Footer />
    </div>
  )
}