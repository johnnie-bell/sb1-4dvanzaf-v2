'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Send, Package, Truck, CheckCircle } from 'lucide-react';
import { localStore } from '@/lib/localStore';
import { seedDemoData, Order, Thread, Message } from '@/lib/demoSeed';
import { formatTime, formatDate } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { euro0 } from '@/lib/pricing';
import { Footer } from '@/components/layout/Footer';

export default function InboxPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [thread, setThread] = useState<Thread | null>(null);
  const [message, setMessage] = useState('');
  const { items } = useCart();

  useEffect(() => {
    seedDemoData();
    setOrder(localStore.get<Order | null>('lastOrder', null));
    setThread(localStore.get<Thread | null>('supportThread', null));
  }, []);

  const sendMessage = (text: string) => {
    if (!text.trim() || !thread) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      from: 'user',
      text: text.trim(),
      ts: Date.now()
    };

    const updatedThread = {
      ...thread,
      messages: [...thread.messages, newMessage]
    };

    setThread(updatedThread);
    localStore.set('supportThread', updatedThread);
    setMessage('');

    // Auto-reply after a short delay
    setTimeout(() => {
      const autoReply = getAutoReply(text, order);
      if (autoReply) {
        const replyMessage: Message = {
          id: `msg-${Date.now()}-reply`,
          from: 'support',
          text: autoReply,
          ts: Date.now()
        };

        const finalThread = {
          ...updatedThread,
          messages: [...updatedThread.messages, replyMessage]
        };

        setThread(finalThread);
        localStore.set('supportThread', finalThread);
      }
    }, 1000);
  };

  const getAutoReply = (userMessage: string, order: Order | null): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('where is my delivery') || msg.includes('delivery status')) {
      return order 
        ? `Your order ${order.id} is **${order.status}**, ETA between 09:00–12:00.`
        : 'Let me check your delivery status. Could you provide your order number?';
    }
    
    if (msg.includes('change delivery date')) {
      return 'Sure—reply with your preferred date. We\'ll confirm availability.';
    }
    
    if (msg.includes('change collection date')) {
      return 'No problem! Please let me know your preferred collection date and we\'ll check availability.';
    }
    
    return 'Thanks! A teammate will reply shortly.';
  };

  const quickReplies = [
    'Where is my delivery?',
    'Change delivery date', 
    'Change collection date',
    'General question'
  ];

  const statusSteps = [
    { label: 'Order received', icon: Package },
    { label: 'Preparing', icon: Package },
    { label: 'Out for delivery', icon: Truck },
    { label: 'Delivered', icon: CheckCircle },
    { label: 'Collected', icon: CheckCircle }
  ];

  const getCurrentStepIndex = (status: string) => {
    return statusSteps.findIndex(step => step.label === status);
  };

  const sendCartSummary = () => {
    if (items.length === 0) return;
    
    const summary = `Current cart:\n${items.map(item => 
      `• ${item.name} (${item.qty} week${item.qty > 1 ? 's' : ''}) - ${euro0(item.weeklyPrice * item.qty)}\n  ${item.deliveryDate} → ${item.collectionDate}`
    ).join('\n')}\n\nTotal: ${euro0(items.reduce((sum, item) => sum + item.weeklyPrice * item.qty, 0))}`;
    
    sendMessage(summary);
  };

  if (!thread) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Support</h1>
        </div>

        {/* Order Status Card */}
        {order && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order {order.id}</span>
                <Badge variant="outline">{order.status}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  Delivery: {formatDate(order.delivery)} • Collection: {formatDate(order.collection)}
                </div>
                
                {/* Status Timeline */}
                <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                  {statusSteps.map((step, index) => {
                    const Icon = step.icon;
                    const currentIndex = getCurrentStepIndex(order.status);
                    const isActive = index <= currentIndex;
                    const isCurrent = index === currentIndex;
                    
                    return (
                      <div key={step.label} className="flex items-center space-x-2 flex-shrink-0">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                          isActive 
                            ? isCurrent 
                              ? 'bg-primary border-primary text-white' 
                              : 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 text-gray-400'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={`text-xs ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                          {step.label}
                        </span>
                        {index < statusSteps.length - 1 && (
                          <div className={`w-8 h-0.5 ${isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="text-sm">
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.name} × {item.qty} - {euro0(item.weeklyPrice * item.qty)}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Replies */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {quickReplies.map((reply) => (
              <Button
                key={reply}
                variant="outline"
                size="sm"
                onClick={() => sendMessage(reply)}
                className="text-sm"
              >
                {reply}
              </Button>
            ))}
          </div>
          
          {items.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={sendCartSummary}
              className="text-sm bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
            >
              Send order details
            </Button>
          )}
        </div>

        {/* Chat Area */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {thread.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.from === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{msg.text}</div>
                    <div className={`text-xs mt-1 ${
                      msg.from === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatTime(msg.ts)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Composer */}
        <div className="flex gap-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(message);
              }
            }}
          />
          <Button
            onClick={() => sendMessage(message)}
            disabled={!message.trim()}
            size="lg"
            className="px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}