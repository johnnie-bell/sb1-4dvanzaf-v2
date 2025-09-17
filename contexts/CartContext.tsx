'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type CartItem = {
  id: string; name: string; imageUrl: string; category: string;
  pricePerDay: number; weeklyPrice: number; qty: number;
  deliveryDate: string; collectionDate: string;
}
type CartCtx = {
  items: CartItem[];
  add: (i: Omit<CartItem,'weeklyPrice'|'qty'> & Partial<Pick<CartItem,'weeklyPrice'|'qty'>>) => void;
  addItem: (i: Omit<CartItem,'weeklyPrice'|'qty'> & Partial<Pick<CartItem,'weeklyPrice'|'qty'>>) => void;
  remove: (id: string) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
}
const Ctx = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  useEffect(() => { try { const s = localStorage.getItem('cart'); if (s) setItems(JSON.parse(s)) } catch {} }, [])
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(items)) }, [items])

  const subtotal = useMemo(() => items.reduce((a, i) => a + i.weeklyPrice * i.qty, 0), [items])

  const add: CartCtx['add'] = (i) => setItems(prev => {
    const weekly = i.weeklyPrice ?? i.pricePerDay * 7
    const key = `${i.id}-${i.deliveryDate}-${i.collectionDate}`
    const found = prev.find(p => `${p.id}-${p.deliveryDate}-${p.collectionDate}` === key)
    if (found) return prev.map(p => p === found ? { ...p, qty: (p.qty || 1) + (i.qty || 1) } : p)
    return [...prev, { ...i, weeklyPrice: weekly, qty: i.qty || 1 } as CartItem]
  })
  const remove = (id: string) => setItems(prev => prev.filter(p => p.id !== id))
  const setQty = (id: string, qty: number) => setItems(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, qty) } : p))
  const clear = () => setItems([])

  return (
    <Ctx.Provider
      value={{
        items,
        add,
        addItem: add,
        remove,
        removeItem: remove,
        setQty,
        updateQty: setQty,
        clear,
        subtotal
      }}
    >
      {children}
    </Ctx.Provider>
  )
}

export function useCart() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useCart must be used within a CartProvider')
  return v
}