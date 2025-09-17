'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MessageCircle, Mail, Phone } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

const helpArticles = [
  {
    id: 'delivery',
    title: 'Delivery Information',
    content: 'We deliver within a 20km radius of our location. Delivery fees vary based on distance and order size. Standard delivery slots are 9AM-12PM or 2PM-5PM. You\'ll receive SMS updates on the day of delivery.'
  },
  {
    id: 'collection',
    title: 'Collection Process',
    content: 'Items can be collected from our store or we can arrange pickup from your location. Please ensure all items are clean and in the same condition as delivered. Late returns may incur additional charges.'
  },
  {
    id: 'pricing',
    title: 'Pricing & Payment',
    content: 'All prices are shown per week. Longer rentals may qualify for discounts. Payment is taken at the time of booking. We accept all major credit cards and PayPal.'
  },
  {
    id: 'cancellations',
    title: 'Cancellations & Changes',
    content: 'You can cancel your booking up to 48 hours before your rental start date for a full refund. Changes to dates are subject to availability. Contact us as soon as possible for any modifications.'
  },
  {
    id: 'damage',
    title: 'Damage & Insurance',
    content: 'Normal wear and tear is expected and covered. For significant damage, we have a damage protection policy. Please report any issues immediately. Optional damage waiver available at checkout.'
  },
  {
    id: 'contact',
    title: 'Contact & Support',
    content: 'Our support team is available Monday-Friday 9AM-6PM, Saturday 9AM-4PM. For urgent delivery issues, use our chat support. Email responses typically within 2 hours during business hours.'
  }
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const filteredArticles = helpArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Help Center</h1>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search help articles..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Help Articles */}
        <div className="grid gap-4 mb-8">
          {filteredArticles.map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <CardTitle className="text-lg">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {article.content}
                </p>
              </CardContent>
            </Card>
          ))}
          
          {filteredArticles.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-sm">No articles found matching &ldquo;{searchTerm}&rdquo;</div>
              <div className="text-xs mt-1">Try a different search term</div>
            </div>
          )}
        </div>

        {/* Still Need Help Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900">Still need help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 text-sm mb-4">
              Can&apos;t find what you&apos;re looking for? Get in touch with our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => router.push('/inbox')}
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Start chat
              </Button>
              <Button
                variant="outline"
                asChild
                className="flex items-center gap-2"
              >
                <a href="mailto:support@hire4holidays.com">
                  <Mail className="w-4 h-4" />
                  Email us
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="flex items-center gap-2"
              >
                <a href="tel:+353000000">
                  <Phone className="w-4 h-4" />
                  Call us
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}