'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { localStore } from '@/lib/localStore';
import { seedDemoData, Profile, Order } from '@/lib/demoSeed';
import { formatDate } from '@/lib/utils';
import { euro0 } from '@/lib/pricing';
import { toast } from 'sonner';
import { Footer } from '@/components/layout/Footer';

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    county: '',
    eircode: '',
    marketing: false
  });
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    seedDemoData();
    const defaultProfile: Profile = {
      name: 'Guest',
      email: 'guest@example.com',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      county: '',
      eircode: '',
      marketing: false
    };
    const savedProfile = localStore.get<Profile>('profile', defaultProfile);
    setProfile(savedProfile);
    setOrder(localStore.get<Order | null>('lastOrder', null));
  }, []);

  const handleSave = () => {
    localStore.set('profile', profile);
    toast.success('Profile saved successfully!');
  };

  const handleReset = () => {
    const defaultProfile: Profile = {
      name: 'Guest',
      email: 'guest@example.com',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      county: '',
      eircode: '',
      marketing: false
    };
    const savedProfile = localStore.get<Profile>('profile', defaultProfile);
    setProfile(savedProfile);
    toast.info('Profile reset to saved values');
  };

  const updateField = (field: keyof Profile, value: string | boolean) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          {/* Profile Form */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full name
                  </label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone number
                </label>
                <Input
                  id="phone"
                  value={profile.phone || ''}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+353..."
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Address</h3>
                <div>
                  <label htmlFor="address1" className="block text-sm font-medium mb-1">
                    Address line 1
                  </label>
                  <Input
                    id="address1"
                    value={profile.address1 || ''}
                    onChange={(e) => updateField('address1', e.target.value)}
                    placeholder="Street address"
                  />
                </div>
                <div>
                  <label htmlFor="address2" className="block text-sm font-medium mb-1">
                    Address line 2 (optional)
                  </label>
                  <Input
                    id="address2"
                    value={profile.address2 || ''}
                    onChange={(e) => updateField('address2', e.target.value)}
                    placeholder="Apartment, suite, etc."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">
                      City
                    </label>
                    <Input
                      id="city"
                      value={profile.city || ''}
                      onChange={(e) => updateField('city', e.target.value)}
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label htmlFor="county" className="block text-sm font-medium mb-1">
                      County
                    </label>
                    <Input
                      id="county"
                      value={profile.county || ''}
                      onChange={(e) => updateField('county', e.target.value)}
                      placeholder="County"
                    />
                  </div>
                  <div>
                    <label htmlFor="eircode" className="block text-sm font-medium mb-1">
                      Eircode
                    </label>
                    <Input
                      id="eircode"
                      value={profile.eircode || ''}
                      onChange={(e) => updateField('eircode', e.target.value)}
                      placeholder="Eircode"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketing"
                  checked={profile.marketing || false}
                  onCheckedChange={(checked) => updateField('marketing', checked === true)}
                />
                <label htmlFor="marketing" className="text-sm">
                  I&apos;d like to receive marketing emails about special offers and new products
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} className="flex-1">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Rental History */}
          <Card>
            <CardHeader>
              <CardTitle>Rental History</CardTitle>
            </CardHeader>
            <CardContent>
              {order ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{order.id}</div>
                    <Badge variant="outline">{order.status}</Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(order.delivery)} → {formatDate(order.collection)}
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-gray-500">Qty: {item.qty}</div>
                        </div>
                        <div className="font-medium">
                          {euro0(item.weeklyPrice * item.qty)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>
                      {euro0(order.items.reduce((sum, item) => sum + item.weeklyPrice * item.qty, 0))}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-sm">No rental history yet</div>
                  <div className="text-xs mt-1">Your bookings will appear here</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}