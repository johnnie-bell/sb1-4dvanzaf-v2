'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, Inbox, User, HelpCircle, LogOut, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCart } from '@/contexts/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';
import { useLanguage } from '@/contexts/LanguageContext';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export function Header() {
  const { items } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const cartCount = items.length;

  const languageOptions = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'nl', label: 'Nederlands' },
  ];

  const currentLanguage = languageOptions.find(lang => lang.code === language);
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b">
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* LEFT: brand */}
          <Link href="/" className="font-bold text-lg md:text-xl text-primary">
            Hire4Holidays
          </Link>

          {/* ABSOLUTE-CENTERED NAV */}
          <nav className="absolute left-1/2 -translate-x-1/2 hidden md:block">
            <ul className="flex items-center gap-6 text-sm md:text-base">
              <li>
                <Link 
                  href="/#browse" 
                  className="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {t('browse')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/how-it-works" 
                  className="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {t('howItWorks')}
                </Link>
              </li>
            </ul>
          </nav>

          {/* RIGHT: bigger icons */}
          <div className="flex items-center gap-3">
            {/* Desktop Language Dropdown */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 h-10 px-3">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm font-medium">{currentLanguage?.code.toUpperCase()}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  {languageOptions.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as any)}
                      className={language === lang.code ? 'bg-gray-100' : ''}
                    >
                      {lang.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <CartDrawer
              trigger={
                <Button variant="ghost" size="sm" className="relative h-10 w-10 rounded-full">
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              }
            />

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="h-10 w-10 rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{t('menu')}</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <Link 
                    href="/#browse" 
                    className="flex items-center space-x-3 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                  >
                    <span>{t('browse')}</span>
                  </Link>
                  <Link 
                    href="/how-it-works" 
                    className="flex items-center space-x-3 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                  >
                    <span>{t('howItWorks')}</span>
                  </Link>
                  <div className="pb-4 border-b">
                    <div className="flex items-center space-x-2 mb-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Language</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {languageOptions.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setLanguage(lang.code as any)}
                          className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                            language === lang.code
                              ? 'bg-primary text-white border-primary'
                              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Link 
                    href="/inbox" 
                    className="flex items-center space-x-3 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                  >
                    <Inbox className="h-4 w-4" />
                    <span>{t('inbox')}</span>
                  </Link>
                  <Link 
                    href="/profile" 
                    className="flex items-center space-x-3 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>{t('myProfile')}</span>
                  </Link>
                  <Link 
                    href="/help" 
                    className="flex items-center space-x-3 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span>{t('help')}</span>
                  </Link>
                  <button className="flex items-center space-x-3 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                    <LogOut className="h-4 w-4" />
                    <span>{t('signOut')}</span>
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
      </div>
    </div>
    </header>
  );
}