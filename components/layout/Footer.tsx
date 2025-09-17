'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-bold text-xl text-white mb-4 block">
              Hire4Holidays
            </Link>
            <p className="text-gray-300 text-sm mb-4">
              {t('footerDescription')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Browse Categories */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('browseCategories')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/?cat=BEACH" className="text-gray-300 hover:text-white transition-colors">
                  {t('beach')} Equipment
                </Link>
              </li>
              <li>
                <Link href="/?cat=SPORTS" className="text-gray-300 hover:text-white transition-colors">
                  {t('sports')} Gear
                </Link>
              </li>
              <li>
                <Link href="/?cat=BABY" className="text-gray-300 hover:text-white transition-colors">
                  {t('baby')} Items
                </Link>
              </li>
              <li>
                <Link href="/?cat=MOBILITY" className="text-gray-300 hover:text-white transition-colors">
                  {t('mobility')} Aids
                </Link>
              </li>
              <li>
                <Link href="/#browse" className="text-gray-300 hover:text-white transition-colors">
                  {t('availableItems')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Account */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('support')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
                  {t('howItWorks')}
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white transition-colors">
                  {t('helpCenter')}
                </Link>
              </li>
              <li>
                <Link href="/inbox" className="text-gray-300 hover:text-white transition-colors">
                  {t('contactSupport')}
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-300 hover:text-white transition-colors">
                  {t('myProfile')}
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="text-gray-300 hover:text-white transition-colors">
                  {t('checkout')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('contact')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <a href="tel:+353000000" className="text-gray-300 hover:text-white transition-colors">
                  +353 000 000
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <a href="mailto:support@hire4holidays.com" className="text-gray-300 hover:text-white transition-colors">
                  support@hire4holidays.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <div className="text-gray-300">
                  <div>123 Holiday Street</div>
                  <div>Dublin, Ireland</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 Hire4Holidays. {t('allRightsReserved')}
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              {t('privacyPolicy')}
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              {t('termsOfService')}
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              {t('cookiePolicy')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}