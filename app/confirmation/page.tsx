import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/Header'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { Footer } from '@/components/layout/Footer'

export default function Confirmation() {
  const orderNumber = `HH-${Math.floor(Math.random() * 9e5).toString().padStart(6, '0')}`

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-3xl px-4 md:px-6 py-16 text-center">
        <div className="bg-white rounded-2xl border p-8 md:p-12">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Booking confirmed! 🎉</h1>
          <p className="text-muted-foreground mb-8">
            This is a demo confirmation. No payment was taken and no real booking was made.
          </p>
          
          <div className="inline-block bg-gray-50 rounded-xl p-6 mb-8">
            <div className="text-sm text-muted-foreground mb-1">Order number</div>
            <div className="text-2xl font-semibold">{orderNumber}</div>
          </div>
          
          <div className="space-y-4 text-sm text-muted-foreground mb-8">
            <p>In a real booking, you would receive:</p>
            <ul className="space-y-1">
              <li>• Email confirmation with booking details</li>
              <li>• SMS updates on delivery status</li>
              <li>• Contact information for support</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#browse">
              <Button variant="outline" size="lg">
                Continue browsing
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg">
                Back to home
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}