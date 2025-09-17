import { localStore } from './localStore';

export interface Profile {
  name: string;
  email: string;
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  county?: string;
  eircode?: string;
  marketing?: boolean;
}

export interface OrderItem {
  name: string;
  qty: number;
  weeklyPrice: number;
}

export interface Order {
  id: string;
  delivery: string;
  collection: string;
  items: OrderItem[];
  status: 'Order received' | 'Preparing' | 'Out for delivery' | 'Delivered' | 'Collected';
}

export interface Message {
  id: string;
  from: 'user' | 'support';
  text: string;
  ts: number;
}

export interface Thread {
  id: string;
  messages: Message[];
}

export const seedDemoData = () => {
  // Seed profile if not exists
  const existingProfile = localStore.get<Profile | null>('profile', null);
  if (!existingProfile) {
    const defaultProfile: Profile = {
      name: 'Guest',
      email: 'guest@example.com'
    };
    localStore.set('profile', defaultProfile);
  }

  // Seed last order if not exists
  const existingOrder = localStore.get<Order | null>('lastOrder', null);
  if (!existingOrder) {
    const defaultOrder: Order = {
      id: 'HH-100123',
      delivery: '2025-09-01',
      collection: '2025-09-08',
      items: [
        {
          name: 'Beach Trolley',
          qty: 1,
          weeklyPrice: 1400
        }
      ],
      status: 'Out for delivery'
    };
    localStore.set('lastOrder', defaultOrder);
  }

  // Seed support chat if not exists
  const existingThread = localStore.get<Thread | null>('supportThread', null);
  if (!existingThread) {
    const defaultThread: Thread = {
      id: 'support',
      messages: [
        {
          id: 'msg-1',
          from: 'support',
          text: 'Hi, how can we help with your delivery/collection?',
          ts: Date.now() - 3600000 // 1 hour ago
        }
      ]
    };
    localStore.set('supportThread', defaultThread);
  }
};