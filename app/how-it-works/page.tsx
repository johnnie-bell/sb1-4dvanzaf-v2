/* eslint-disable react/no-unescaped-entities */
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, Calendar, Package } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h1>
            <p className="text-xl text-gray-600">
              Rent holiday equipment in three simple steps
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>1. Browse & Select</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Browse our extensive collection of holiday equipment. Filter by category, dates, and price to find exactly what you need.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>2. Choose Dates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Select your rental dates and add items to your cart. Our pricing is transparent with weekly rates clearly displayed.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>3. Relax & Enjoy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Complete your booking. We'll have everything ready for your perfect holiday by delivering and collecting the order.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* FAQs */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How far in advance can I book?</AccordionTrigger>
                <AccordionContent>
                  You can book items up to 48 hours in advance. We recommend booking early, especially during peak holiday seasons, to ensure availability.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What if I need to cancel my booking?</AccordionTrigger>
                <AccordionContent>
                  You can cancel your booking up to 24 hours before your rental start date for a full refund.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Do you deliver equipment?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer delivery services within a 50km radius of our location. Delivery fees vary based on distance and order size.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>What happens if equipment gets damaged?</AccordionTrigger>
                <AccordionContent>
                  Normal wear and tear is expected and covered. For significant damage, we have a damage protection policy. We recommend reviewing the terms when you book.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Are your items cleaned between rentals?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. All equipment is thoroughly cleaned and sanitized between rentals. We follow strict hygiene protocols to ensure your safety and comfort.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>Can I extend my rental period?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can extend your rental period subject to availability. Contact us as soon as possible to arrange an extension. Additional charges will apply.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}